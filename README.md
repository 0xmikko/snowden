
# Snowden
A modern anti-censor system. Share your thoughts and opinion with other in a new way.

[![pyversions](https://img.shields.io/pypi/pyversions/nucypher.svg)](https://pypi.org/project/nucypher/)
[![coveralls](https://coveralls.io/repos/github/nucypher/nucypher/badge.svg?branch=master)](https://coveralls.io/github/nucypher/nucypher?branch=master)
[![license](https://img.shields.io/pypi/l/nucypher.svg)](https://www.gnu.org/licenses/gpl-3.0.html)

---
### Problem:
Share your opinion and got a ban from Facebook? Authorities try to block all your posts? Publishing your opposite opinion could be a reason for criminal prosecution? Today social networks and authorities try to control people and block free opinions share. We need a robust system which could protect persons who share information and make it’s visible for selected people and pointless for others.
 
### Solution:
Snowden is a Google Chrome extension which helps you to share your thoughts for selected list of people (no limit how much they are) using NuCypher Technology. You could simply encrypt your message into human readble text and nobody could claim you. Only selected peopls could read “between lines” and see what you want to share.

Extension provides two basic functions:
 
#### Encrypt posts
Simply share your thoughts via public networks, just insert your text into extension ang get a translated text (it’s human readable and neutral)

#### Decrypt messages
When you read any site, system automatically finds encrypted text and show you it if it’s found a new one.

### Installation

##### 1. Install chrome extenstion 

1. Download 
2. Enter app directory (cd app)
3. Collect packages (yarn)
4. Build extension (yarn build)
5. Open Google Chrome, enter chrome://extension
6. Press "Add unpacked extension" button and choose "app/build" directory
7. Write extension hash code 

##### 2.Install host application
1. Download package
2. Create virtual environment (virtualenv venv in working directory)
3. Download packages (pip install -r requirements.txt)
4. Open file (host/chrome_showden_.json) and change hash code to code you've written in step 7 of Google Chrom installation
4. Install Host app in Google Chrome (bash ./host/install_)
5. Reload chrome extension

### What's in package

#### App
Google Chrome ex 

