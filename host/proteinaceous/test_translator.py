from unittest import TestCase

from proteinaceous.translator import Translator


class TestTranslator(TestCase):

    def setUp(self) -> None:
        self.translator = Translator()

    def test_bytes_str_and_back(self):
        str = "Hello, world!"
        str_bytes_representation = bytes(str, "UTF-8")
        smiles_representation = self.translator.to_proteinaceous(str_bytes_representation)
        str_bytes_back = self.translator.to_bytes(smiles_representation)

        assert str_bytes_representation == str_bytes_back

    def test_build_dict(self):
        self.translator.build_dict()
        assert self.translator._bytes_to_smiles.__len__() == 256
        assert self.translator._smiles_to_bytes.__len__() == 256
