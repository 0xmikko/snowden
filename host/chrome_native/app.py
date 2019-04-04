import struct
import sys
import json
from typing import Callable
from .shutup import ShutUp


class ChromeNativeApp(object):

    def __init__(self):
        self.shutup = ShutUp()
        self.shutup.talk_to_google()
        self.routes = {}

    def add_listener(self, api: str, handler: Callable):
        self.routes[api] = handler

    def send_message(self, api: str, body: dict) -> None:
        '''
        Sends messages to background.js
        :param message: bytes to send
        :return: None
        '''
        # Write message size.
        json_message = json.dumps({"api": api, "body": body})
        message = bytes(json_message, "UTF-8")
        sys.stdout.buffer.write(struct.pack('I', len(message)))
        # Write the message itself.
        sys.stdout.buffer.write(message)
        sys.stdout.flush()

    def log(self, str):
        self.shutup.talk_to_term()
        print(str)
        self.shutup.talk_to_google()

    def run(self) -> None:
        '''
        Loop function which reads from stdin and run threads for all new requests
        :return:
        '''

        while True:
            # Read the message length (first 4 bytes).
            text_length_bytes = sys.stdin.buffer.read(4)

            if len(text_length_bytes) == 0:
                sys.exit(0)

            # Unpack message length as 4 byte integer.
            text_length = struct.unpack('i', text_length_bytes)[0]

            # Read the text (JSON object) of the message.
            text = sys.stdin.buffer.read(text_length).decode('utf-8')

            try:
                json_dict = json.loads(text)
                for key in json_dict:
                    sys.stderr.write(key)
                api = json_dict['api']
                payload = json_dict['payload']

                if api in self.routes:
                    response = self.routes[api](payload)
                    self.send_message(api, response.to_json())
                else:
                    raise ValueError("Incorrect api" + api)

                self.shutup.talk_to_term()
                print(json_dict)
                self.shutup.talk_to_google()

            except KeyError as e:
                sys.stderr.write("Invalid Request" + str(e))

            except ValueError as e:
                sys.stderr.write("IncorrectAPI" + str(e))