import os
from zipfile import ZipFile, ZIP_DEFLATED
from flask import Flask, send_file, request
from shutil import copyfile


app = Flask(__name__)


@app.route('/')
def hello_world():
    return 'Hello World!'

@app.route("/ext")
def extension():
    try:
        return send_file(os.path.join(os.path.dirname(__file__), "snowden.zip"),
                         attachment_filename='snowden.zip')
    except Exception as e:
        return str(e)

@app.route("/host")
def host():
    try:
        ext_id = request.args.get('ext_id')
        manifest = os.path.join(os.path.dirname(__file__), "original.json")
        with open(manifest, "r") as file:
            content = file.read()

        content = content.replace("EXT", ext_id)
        with open("com.snowden.connect.json", "w") as file:
            file.write(content)

        dest_file = os.path.join(os.path.dirname(__file__), "host.zip")
        if os.path.exists(dest_file):
            os.remove(dest_file)
        copyfile(os.path.join(os.path.dirname(__file__), "host_orig.zip"), dest_file)
        with ZipFile(dest_file, 'a') as zp:
            zp.write("com.snowden.connect.json", "com.snowden.connect.json", ZIP_DEFLATED)

        return send_file(dest_file,
                         attachment_filename='host.zip')
    except ValueError as e:
        return str(e)


if __name__ == '__main__':
    app.run()
