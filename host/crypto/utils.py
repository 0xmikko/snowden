import os

def get_or_create_path(path):
    if not os.path.exists(path):
        os.mkdir(path)
    return path