import struct
import threading
import json
import requests


class Request(threading.Thread):

    def run(self) -> None:
        super().run()
        requests.post("http://127.0.0.1/auth", data={"url": "yandex.ru"})

