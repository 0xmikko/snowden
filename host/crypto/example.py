from .channel import Channel
from .data_pkg import EncryptedDataPackage
from .manager import ChannelManager
from .reader import ChannelReader

# Get a ChannelManager instance. For this version, Channel manager uses Singleton pattern
manager = ChannelManager()
channel = manager.create_new_channel()

# Creating ChannelReader
reader = ChannelReader()
reader_public = reader.get_public_reader()

# Grant access to specific ChannelReader for Channel
manager.grant(reader_public, channel)

# Serialize channels data into JSON to transfer
channel_bytes = channel.to_bytes()

# Restore channel data from JSON
channel_recevied = Channel.from_bytes(channel_bytes)

# Text & bytes information which we are going to send
plaintext = "TEST"
plaintext_bytes = plaintext.encode("UTF-8")

# Creating
encrypted_data_package = EncryptedDataPackage.from_channel(channel_recevied, plaintext_bytes)
json_data = encrypted_data_package.to_json()

# Transferring JSON

# Decrypt original message
received_data_package = EncryptedDataPackage.from_json(json_data=json_data)
retrieved_plaintexts = received_data_package.decrypt(reader)

print(retrieved_plaintexts)
