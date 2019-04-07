
# Snowden
A modern anti-censor system. Share your thoughts and opinion with other in a new way.

[![pyversions](https://img.shields.io/pypi/pyversions/nucypher.svg)](https://pypi.org/project/nucypher/)

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

## Get started

### How to install
Video manual: https://youtu.be/-06vL9u6pwQ

##### 1. Install chrome extension 

1. Download extension: https://nusnowden.herokuapp.com/ext
2. Open zip archive
3. Open Google Chrome, enter chrome://extensions
4. Choose "Developer mode"
5. Click on "Load unpacked"
6. Choose folder with extension
7. Open extension

##### 2.Install host application
1. Download host app (host.zip)
2. Unpack archive
3. Check that you have python3 and virtualenv
4. Go to directory
5. Run "sh ./setup.sh"

Important:
This package run nucypher network in local mode by default. If you want to connect main net, please ping me.


### How to use

#### Write post

1. Open extension and the tab "Write post"
2. Wrute you post
3. Press "Encode post"
4. After encoding (it could take time) you will see a post converted into smile.
5. You could copy it by yourself or press "Copy to clipboard".
6. Post whole post into social network.

#### Read posts

1. Open facebook and look at your page
2. If encrypted post was shortened by facebook, press "More..."
3. You could see a quantity of found posts in the badge
4. Open extension and read them


