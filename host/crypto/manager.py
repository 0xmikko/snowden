import datetime
import os
import shutil
import base58
import sha3
import random

import maya
import pickle
from django.conf import settings

from nucypher.characters.lawful import Alice, Bob, Ursula
from nucypher.network.middleware import RestMiddleware
from umbral.keys import UmbralPublicKey
from nucypher.crypto.powers import CryptoPower, SigningPower, NoSigningPower, CryptoPowerUp, DecryptingPower
from nucypher.config.characters import AliceConfiguration, BobConfiguration
from .channel import Channel
from .reader import ChannelReaderPublic
from .utils import get_or_create_path


class ChannelManager:
    '''
    Key person, which manages Channel. It could create them and grant / revoke access to ChannelsReaders
    '''


    # Singleton pattern for ChannelManager
    __instance = None
    def __new__(cls):
        if cls.__instance is None:
            cls.__instance = object.__new__(cls)
            cls.__instance._initalize()

        return cls.__instance

    def _initalize(self):

        # Temporary file storage
        self.TEMP_FILES_DIR = get_or_create_path(os.path.join(settings.BASE_DIR, 'keys'))
        self.TEMP_URSULA_DIR = get_or_create_path(os.path.join(self.TEMP_FILES_DIR, 'ursula'))
        self.TEMP_ALICE_DIR = get_or_create_path(os.path.join(self.TEMP_FILES_DIR, 'alice'))
        self.TEMP_ALICE_URSULA_DIR = "{}/ursula-certs".format(self.TEMP_ALICE_DIR)

        # Getting TESTNET_LOAD_BALANCER from Django configuration file
        self.SEEDNODE_URL = "127.0.0.1:11500"#settings.SEEDNODE_URL
        self.ursula = Ursula.from_seed_and_stake_info(seed_uri=self.SEEDNODE_URL,
                                                     federated_only=True,
                                                     minimum_stake=0)

        self.passphrase = "STOHUEDSTOHUEDSTOHUED"
        self.ALICE = self._get_alice()

        # Todo: Check what happens if passphrase is invalid!

    def create_new_channel(self) -> Channel:
        '''
        Creates new channel
        :return:
        '''
        label_bytes = self.generate_random_label()
        return Channel(alice_pubkey_bytes=self.get_alice_public_key(),
                       policy_pubkey_bytes=self.get_policy(label_bytes).to_bytes(),
                       label_bytes=label_bytes)

    def grant(self, reader_public: ChannelReaderPublic, channel: Channel, day_to_exipre: int = 5):
        # Here are our Policy details.
        label_bytes = channel.label_bytes

        policy_end_datetime = maya.now() + datetime.timedelta(days=day_to_exipre)
        m, n = 1, 1

        self.ALICE.grant(bob=reader_public.BOB,
                         label=label_bytes,
                         m=m,
                         n=n,
                         expiration=policy_end_datetime)


    def get_alice_public_key(self):
        return bytes(self.ALICE.stamp)

    def get_policy(self, label_bytes: bytes):
        return self.ALICE.get_policy_pubkey_from_label(label_bytes)

    def _get_alice(self):
        # Gets an Alice instance
        print('Getting an Alice')
        try:  # If we had an existing Alicia in disk, let's get it from there
            alice_config_file = os.path.join(self.TEMP_ALICE_DIR, "config_root", "alice.config")
            new_alice_config = AliceConfiguration.from_configuration_file(
                filepath=alice_config_file,
                network_middleware=RestMiddleware(),
                known_nodes={self.ursula},
                start_learning_now=False,
                save_metadata=False,
            )
            alicia = new_alice_config(passphrase=self.passphrase)
        except:  # If anything fails, let's create Alicia from scratch
            # Remove previous demo files and create new ones

            print("Creating ALICE")

            shutil.rmtree(self.TEMP_ALICE_DIR, ignore_errors=True)
            os.mkdir(self.TEMP_ALICE_DIR)
            os.mkdir(self.TEMP_ALICE_URSULA_DIR)

            alice_config = AliceConfiguration(
                config_root=os.path.join(self.TEMP_ALICE_DIR, "config_root"),
                is_me=True,
                known_nodes={self.ursula},
                start_learning_now=False,
                federated_only=True,
                learn_on_same_thread=True,
            )
            alice_config.initialize(password=self.passphrase)
            alice_config.keyring.unlock(password=self.passphrase)
            alicia = alice_config.produce()

            # We will save Alicia's config to a file for later use
            alice_config_file = alice_config.to_configuration_file()

        # Let's get to learn about the NuCypher network
        alicia.start_learning_loop(now=True)

        return alicia

    @staticmethod
    def generate_random_label() -> str:
        '''
        Genarates random label for additional secutiry
        :return: string with hash label
        '''
        keccak = sha3.keccak_256()
        keccak.update((str(maya.now()) + str(random.random() * 10000)).encode('utf-8'))
        return keccak.digest()





