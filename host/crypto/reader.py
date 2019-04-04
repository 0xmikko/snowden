import json
import os
import shutil

from nucypher.characters.lawful import Alice, Bob, Ursula
from nucypher.network.middleware import RestMiddleware
from umbral.keys import UmbralPublicKey
from nucypher.crypto.powers import CryptoPower, SigningPower, NoSigningPower, CryptoPowerUp, DecryptingPower
from nucypher.config.characters import AliceConfiguration, BobConfiguration
#from nucypher.config.storages import LocalFileBasedNodeStorage
from .utils import get_or_create_path


class ChannelReader:
    '''
    ChannelReader are peers who have rights to read different Channels if it was granted.
    ChannelReader contains private keys and could not be serialized for this moment.

    To serialize ChannelReader use ChannelReader public which provides neccessary methods
    '''

    # Singleton pattern
    __instance = None
    def __new__(cls):
        if cls.__instance is None:
            cls.__instance = object.__new__(cls)
            cls.__instance._initalize()

        return cls.__instance

    def _initalize(self):
        # Twisted Logger
        #globalLogPublisher.addObserver(simpleObserver)

        # Temporary file storage
        self.TEMP_FILES_DIR = get_or_create_path(os.path.join(os.getcwd(), 'keys'))
        self.TEMP_URSULA_DIR = get_or_create_path(os.path.join(self.TEMP_FILES_DIR, 'ursula'))
        self.TEMP_BOB_DIR = get_or_create_path(os.path.join(self.TEMP_FILES_DIR, 'bob'))
        self.TEMP_BOB_URSULA_DIR = "{}/ursula-certs".format(self.TEMP_BOB_DIR)

        # Getting TESTNET_LOAD_BALANCER from Django configuration file
        self.SEEDNODE_URL = "https://localhost:11501"#settings.SEEDNODE_URL
        self.ursula = Ursula.from_seed_and_stake_info(seed_uri=self.SEEDNODE_URL,
                                                     federated_only=True,
                                                     minimum_stake=0)

        passphrase = "STOHUEDSTOHUEDSTOHUED"

        self.BOB = self._get_bob(passphrase=passphrase)

        # Todo: Check what happens if passphrase is invalid!

    def get_public_reader(self) -> object:
        channel_reader_public = ChannelReaderPublic(signing_power_bytes=self.BOB.public_keys(SigningPower).to_bytes(),
                                                    decrypt_power_bytes=self.BOB.public_keys(DecryptingPower).to_bytes())

        return channel_reader_public

    def get_bob_keys(self) -> str:

        keys = {'sp': self.BOB.public_keys(SigningPower).to_bytes(),
                'dp': self.BOB.public_keys(DecryptingPower).to_bytes()
                }

        return keys


    def _get_bob(self, passphrase) -> object:
        '''

        :param passphrase: Passpharse for new Bob instance
        :return: None
        '''

        try:

            bob_config_file = os.path.join(self.TEMP_BOB_DIR, "config_root", "bob.config")
            bob_config = BobConfiguration.from_configuration_file(
                filepath=bob_config_file,
                network_middleware=RestMiddleware(),
                start_learning_now=False,
                save_metadata=False,
            )
            bob_config.keyring.unlock(password=passphrase)
            bob = bob_config.produce()

        except ValueError:
            shutil.rmtree(self.TEMP_BOB_DIR, ignore_errors=True)
            os.mkdir(self.TEMP_BOB_DIR)


            bob_config = BobConfiguration(
                config_root=os.path.join(self.TEMP_BOB_DIR, "config_root"),
                is_me=True,
                known_nodes={self.ursula},
                start_learning_now=True,
                federated_only=True,
                learn_on_same_thread=True,
            )
            bob_config.initialize(password=passphrase)
            bob_config.keyring.unlock(password=passphrase)
            bob =bob_config.produce()

            bob_config_file = bob_config.to_configuration_file()

        return bob


class ChannelReaderPublic:
    '''
    Public part of Channel Reader. Used for serialization
    '''

    def __init__(self, signing_power_bytes: bytes, decrypt_power_bytes: bytes):

        self.signing_power_bytes = signing_power_bytes
        self.decrypt_power_bytes = decrypt_power_bytes

        powers_and_material = {
            DecryptingPower: UmbralPublicKey.from_bytes(decrypt_power_bytes),
            SigningPower: UmbralPublicKey.from_bytes(signing_power_bytes)
        }

        self.BOB = Bob.from_public_keys(powers_and_material,
                                        federated_only=True)

    @classmethod
    def from_json(cls, json_data: str) -> object:
        try:

            json_dict = json.loads(json_data)

            signing_power_bytes = bytes.fromhex(json_dict['signing_power'])
            decrypt_power_bytes = bytes.fromhex(json_dict['decrypt_power'])

        except KeyError:
            return None

        return ChannelReaderPublic(signing_power_bytes=signing_power_bytes,
                                   decrypt_power_bytes=decrypt_power_bytes)

    def to_json(self) -> str:
        '''
        Serialize object into JSON
        :return:
        '''
        dict = {
            'signing_power': self.signing_power_bytes.hex(),
            'decrypt_power': self.decrypt_power_bytes.hex(),
            }

        return json.dumps(dict)

    def to_human(self) -> str:
        return self.signing_power_bytes.hex() + ":" + self.decrypt_power_bytes.hex()







