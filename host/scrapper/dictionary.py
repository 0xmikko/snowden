import logging

import requests
from selenium import webdriver
from requests.exceptions import RequestException
from contextlib import closing
from bs4 import BeautifulSoup
from queue import Queue

log = logging.getLogger()
log.setLevel(logging.INFO)


class DictionaryGenerator(object):

    def __init__(self, url: str) -> None:
        super().__init__()

        if not url.startswith("http:") and not url.startswith("https:") and url.__contains__("://"):
            raise ValueError("URL should start with http:// or https://. Others protocols are not supported")

        if not url.startswith("http:") and not url.startswith("https:"):
            url = "http://" + self.url

        self.url = url
        self.scrapped_urls = set()
        self.texts = {}
        self._driver = None
        self.queue = Queue()

    def parse(self, max_depth=50, selenium=False):
        self.queue.put(self.url)

        pages_opened = 0
        while not self.queue.empty() and pages_opened<max_depth:
            url = self.queue.get()
            if selenium is True:
                self._generate_dict_selenium(url)
            else:
                self._generate_dict(url)

            pages_opened += 1

        for key, value in self.texts.items():
            print(key)
            print(value)

    def _generate_dict(self, url):
        print("=====", url)
        self._add_to_scrapped_list(url)
        headers = {'User-Agent': "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36"}

        try:
            response = requests.get(url, headers=headers)
            raw_html = response.content
            print(raw_html)
            html = BeautifulSoup(raw_html, 'html.parser')

            text = ""
            for p in html.select('div'):
                text += p.text

            self.texts[url] = text

            for link in html.find_all('a'):
                cur_link = link.get('href')
                #self._parse_link(cur_link)

        except RequestException:
            print("{} => error", url)

    def _generate_dict_selenium(self, url):
        print("=====", url)
        self._add_to_scrapped_list(url)
        driver = self._selenium_driver
        n = driver.get(url)

        text = ""
        for p in driver.find_elements_by_tag_name("p"):
            text += p.text

        self.texts[url] = text

        for link in driver.find_elements_by_tag_name("a"):
            cur_link = link.get_attribute('href')
            self._parse_link(cur_link)

    def _parse_link(self, link: str) -> None:
        """
        Adds link to queue if it wasn't scrap and in scope
        :param link: URL of new link
        :return: None
        """
        if link is None or link.startswith('mailto:') or \
                link.startswith("#") or link.startswith("javascript"):
            return

        if (link.startswith('/') or link.startswith('?')):
            link = self.url + link

        print("Found link", link)
        if self._is_in_scope(link) and not self._is_scrapped(link):
            print("Open {}".format(link))
            self.queue.put(link)

    def _add_to_scrapped_list(self, url):
        self.scrapped_urls.add(url)

    def _is_scrapped(self, url):
        return url in self.scrapped_urls

    def _is_in_scope(self, url: str) -> bool:
        return url.startswith(self.url) or url.startswith(self._additional_url_in_scope())

    def _additional_url_in_scope(self):
        if (self.url.startswith("http://")):
            return self.url.replace("http://", "https://")
        return self.url.replace("https://", "http://")

    @property
    def _selenium_driver(self):
        if self._driver is None:
            self._driver = webdriver.Firefox()
        return self._driver


if __name__ == '__main__':
    d = DictionaryGenerator(url="https://edition.cnn.com/2019/04/01/investing/ipo-one-day-stock-gains/index.html")
    d.parse(selenium=False)

