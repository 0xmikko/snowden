import json


class Response(object):
    def __init__(self, payload, status):
        self.payload = payload
        self.status = status

    def to_json(self) -> str:
        return json.dumps({
            "payload": self.payload,
            "status": self.status
        })

