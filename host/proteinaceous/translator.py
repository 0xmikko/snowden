import os


class Translator(object):
    def __init__(self):
        self._bytes_to_smiles = {}
        self._smiles_to_bytes = {}
        self.build_dict()

    def to_proteinaceous(self, bytes_message: bytes) -> str:
        result = ""
        for symbol in bytes_message:
            result += self._bytes_to_smiles[symbol]
        return result

    def to_bytes(self, speech: str) -> bytes:
        result = b""
        for symbol in speech:
            result += self._smiles_to_bytes[symbol]
        return result

    def build_dict(self):
        index=0
        with open(os.path.join(os.path.dirname(__file__), "unicode.txt"), "r") as f:
            while True and index<256:
                p = f.readline()
                if p == '':
                    break
                code = p.split(';')[0]
                unicode = chr(int(code, 16))
                self._bytes_to_smiles[index] = unicode
                self._smiles_to_bytes[unicode] = bytes([index])
                index += 1
