import sys
import pickle
import json

class Channel:

    def __init__(self,
                 alice_pubkey_bytes: bytes,
                 policy_pubkey_bytes: bytes,
                 label_bytes: bytes):

        self.alice_pubkey_bytes = alice_pubkey_bytes
        self.policy_pubkey_bytes = policy_pubkey_bytes
        self.label_bytes = label_bytes

    @classmethod
    def from_bytes(cls, seralized_object: bytes) -> object:
        '''
        Creates an Channel from serialization
        :param seralized_object:
        :return: EncryptedDataPackage instance
        '''
        json_data = pickle.loads(seralized_object)
        return cls.from_json(json_data)

    @classmethod
    def from_json(cls, json_data: str):
        '''
        Creates an EncryptedDataPackage from JSON
        :param json:
        :return:
        '''
        try:
            dict = json.loads(json_data)

            alice_pubkey_bytes = bytes.fromhex(dict['alice_pubkey'])
            label_bytes = bytes.fromhex(dict['label'])
            policy_pubkey_bytes = bytes.fromhex(dict['policy_pubkey'])

        except KeyError:
            sys.stderr.write("JSON was incorrect" + json_data)
            return None

        return Channel(alice_pubkey_bytes=alice_pubkey_bytes,
                       label_bytes=label_bytes,
                       policy_pubkey_bytes=policy_pubkey_bytes)

    def to_bytes(self) -> bytes:
        '''
        Serialize object into bytes
        :return:
        '''
        return pickle.dumps(self.to_json())

    def to_json(self) -> str:
        '''
        Serialize object into JSON
        :return:
        '''
        dict = {
            'alice_pubkey': self.alice_pubkey_bytes.hex(),
            'label': self.label_bytes.hex(),
            'policy_pubkey': self.policy_pubkey_bytes.hex(),
            }

        return json.dumps(dict)




