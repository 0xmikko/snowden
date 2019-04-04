import json
from unittest import TestCase
from responce import Response


class TestResponse(TestCase):
    def setUp(self) -> None:
        self.test_payload = "TestPayload"
        self.test_status = 200
        self.response = Response(self.test_payload, self.test_status)

    def test_to_json(self):
        json_response = self.response.to_json()
        data = json.loads(json_response)
        assert self.test_payload == data['payload']
        assert self.test_status == data['status']