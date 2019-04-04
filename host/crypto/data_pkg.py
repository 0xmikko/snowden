import json
import pickle

from umbral.keys import UmbralPublicKey

from nucypher.characters.lawful import Enrico
from nucypher.crypto.kits import UmbralMessageKit
from .channel import Channel
from nucypher.crypto.powers import SigningPower


class EncryptedDataPackage:
    '''
    Encrypted data package which contains encrypted info and neccessary information for decrypting
    '''

    def __init__(self,
                 alice_pubkey_bytes: bytes,
                 data_source_pubkey_bytes: bytes,
                 kit_bytes: bytes,
                 label_bytes: bytes,
                 policy_pubkey_bytes: bytes):

        self.alice_pubkey_bytes = alice_pubkey_bytes
        self.data_source_pubkey_bytes = data_source_pubkey_bytes
        self.kit_bytes = kit_bytes
        self.label_bytes = label_bytes
        self.policy_pubkey_bytes = policy_pubkey_bytes

    @classmethod
    def from_channel(cls, channel: Channel, data: bytes) -> object:
        '''
        Create EncryptedDataPackage from Channel & data. In other words it encrypts data usign Channel settings
        :param channel: Channel instance
        :param data: data to be encrypted
        :return: EncryptedDataPackage instance
        '''

        label_bytes = channel.label_bytes
        policy_pub_key_object = UmbralPublicKey.from_bytes(channel.policy_pubkey_bytes)
        data_source = Enrico(policy_encrypting_key=policy_pub_key_object)
        data_source_pubkey_bytes = bytes(data_source.stamp)
        message_kit, _signature = data_source.encrypt_message(data)
        kit_bytes = message_kit.to_bytes()

        return EncryptedDataPackage(alice_pubkey_bytes=channel.alice_pubkey_bytes,
                                    data_source_pubkey_bytes=data_source_pubkey_bytes,
                                    kit_bytes=kit_bytes,
                                    label_bytes=label_bytes,
                                    policy_pubkey_bytes=channel.policy_pubkey_bytes)

    @classmethod
    def from_bytes(cls, seralized_object: bytes) -> object:
        '''
        Creates an EncryptedDataPackage from serialization
        :param seralized_object:
        :return: EncryptedDataPackage instance
        '''
        data = pickle.loads(seralized_object)
        return cls._from_dict(data)

    @classmethod
    def from_json(cls, json_data: str):
        '''
        Creates an EncryptedDataPackage from JSON
        :param json:
        :return:
        '''
        try:
            data = json.loads(json_data)
            alice_pubkey_bytes = bytes.fromhex(dict['alice_pubkey'])
            data_source_pubkey_bytes = bytes.fromhex(dict['data_source_pubkey'])
            kit_bytes = bytes.fromhex(dict['kit'])
            label_bytes = bytes.fromhex(dict['label'])
            policy_pubkey_bytes = bytes.fromhex(dict['policy_pubkey'])

        except KeyError:
            print("Dict was incorrect" + data)
            return None

        return EncryptedDataPackage(alice_pubkey_bytes=alice_pubkey_bytes,
                                    data_source_pubkey_bytes=data_source_pubkey_bytes,
                                    kit_bytes=kit_bytes,
                                    label_bytes=label_bytes,
                                    policy_pubkey_bytes=policy_pubkey_bytes)

    @classmethod
    def _from_dict(cls, data: dict):
        '''
        Creates an EncryptedDataPackage from Dict
        :param json:
        :return:
        '''
        try:
            alice_pubkey_bytes = data['alice_pubkey']
            data_source_pubkey_bytes = data['data_source_pubkey']
            kit_bytes =data['kit']
            label_bytes = data['label']
            policy_pubkey_bytes = data['policy_pubkey']

        except KeyError:
            print("Dict was incorrect" + data)
            return None

        return EncryptedDataPackage(alice_pubkey_bytes=alice_pubkey_bytes,
                                    data_source_pubkey_bytes=data_source_pubkey_bytes,
                                    kit_bytes=kit_bytes,
                                    label_bytes=label_bytes,
                                    policy_pubkey_bytes=policy_pubkey_bytes)

    def decrypt(self, channel_reader: object) -> bytes:
        '''
        Decrypt extsting message using ChannelReader instance
        :param BOB:
        :return:
        '''
        policy_pubkey_restored = UmbralPublicKey.from_bytes(self.policy_pubkey_bytes)

        data_source_restored = Enrico.from_public_keys(
            {SigningPower: self.data_source_pubkey_bytes},
            policy_encrypting_key=policy_pubkey_restored)

        channel_reader.BOB.join_policy(self.label_bytes, self.alice_pubkey_bytes)

        alices_sig_pubkey = UmbralPublicKey.from_bytes(bytes(self.alice_pubkey_bytes))
        message_kit_object = UmbralMessageKit.from_bytes(self.kit_bytes)

        return channel_reader.BOB.retrieve(
            message_kit=message_kit_object,
            data_source=data_source_restored,
            alice_verifying_key=alices_sig_pubkey,
            label=self.label_bytes)

    def to_bytes(self) -> bytes:
        '''
        Serialize object into bytes
        :return:
        '''
        dict = {
            'alice_pubkey': self.alice_pubkey_bytes,
            'data_source_pubkey': self.data_source_pubkey_bytes,
            'kit': self.kit_bytes,
            'label': self.label_bytes,
            'policy_pubkey': self.policy_pubkey_bytes,
        }

        return pickle.dumps(dict)

    def to_json(self) -> str:
        '''
        Serialize object into JSON
        :return:
        '''
        dict = {
            'alice_pubkey': self.alice_pubkey_bytes.hex(),
            'data_source_pubkey': self.data_source_pubkey_bytes.hex(),
            'kit': self.kit_bytes.hex(),
            'label': self.label_bytes.hex(),
            'policy_pubkey': self.policy_pubkey_bytes.hex(),
            }

        return json.dumps(dict)







