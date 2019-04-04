#!/usr/bin/env python
from chrome_native.app import ChromeNativeApp
from chrome_native.responce import Response
from crypto.reader import ChannelReader
from crypto.manager import ChannelManager
from crypto.channel import Channel

from crypto.data_pkg import EncryptedDataPackage
from proteinaceous.translator import Translator


class App(object):
    def __init__(self):

        # Set up communicator first to shutup stdout
        self.communicator = ChromeNativeApp()
        self.communicator.add_listener("ENCRYPT", self.request_encrypt)
        self.communicator.add_listener("DECRYPT", self.request_decrypt)
        self.communicator.add_listener("SETTINGS", self.request_settings)

        # inject translator
        self.translator = Translator()

        # Get a ChannelManager instance. For this version, Channel manager uses Singleton pattern
        self.manager = ChannelManager()
        self.channel = self.manager.create_new_channel()

        # Creating ChannelReader
        self.reader = ChannelReader()
        self.public_reader = self.reader.get_public_reader()
        self.public_reader_human = self.public_reader.to_human()

        # Grant access to specific ChannelReader for Channel
        self.manager.grant(self.public_reader, self.channel)


    def run(self):
        self.communicator.run()

    def request_encrypt(self, payload: dict) -> Response:
        """
        Encrypt message into human readable format
        :param payload:
        :return:
        """
        self.communicator.log("REQUEST: ENCRYPT")
        try:
            text_to_encrypt = bytes(payload['text'], "UTF-8")
            hashSent = payload['hash']

            encrypted_data_package = EncryptedDataPackage.from_channel(self.channel, text_to_encrypt)

            bytes_data = encrypted_data_package.to_bytes()
            self.communicator.log("Bytes length: " + str(len(bytes_data)))
            result = "TEST " + self.translator.to_proteinaceous(bytes_data)

            response_payload = {"result": result, "hash": hashSent}
            self.communicator.log(repr(response_payload))
            return Response(payload=response_payload, status=200)
        except ValueError:
            return Response(payload=None, status=400)

    def request_decrypt(self, payload: dict) -> Response:
        """
        Decrypt posts
        :param payload:
        :return:
        """
        self.communicator.log("REQUEST: DECRYPT")
        result = []

        try:
            posts = payload['content']
            for post in posts:
                decrypted_post = post[5:]
                self.communicator.log(decrypted_post)
                bytes_data = self.translator.to_bytes(decrypted_post)
                self.communicator.log(repr(bytes_data))
                received_data_package = EncryptedDataPackage.from_bytes(bytes_data)
                retrieved_plaintexts = received_data_package.decrypt(self.reader)

                decrypted_text = retrieved_plaintexts[0].decode("UTF-8")

                result.append(decrypted_text)

            response_payload = {"result": result}
            self.communicator.log(response_payload)
            return Response(payload=response_payload, status=200)
        except ValueError:
            return Response(payload=None, status=400)

    def request_settings(self, payload: dict) -> Response:
        response_payload = {"result": self.public_reader_human}
        self.communicator.log(response_payload)
        return Response(payload=response_payload, status=200)


if __name__ == '__main__':

    app = App()
    app.run()
