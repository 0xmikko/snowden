#!/bin/sh

# Check that python3 exist
pypath=$(which python3)
if [ ! $pypath ]
    then
        echo "Sorry, I can't find python3 in your computer. Please install it and repeat setup process"
        exit 1
    fi

# Create virtual environment
python3 -m venv venv

# Activate it
source ./venv/bin/activate

# Install needed packages
pip install -r requirements.txt

# Run local fleet
git clone https://github.com/nucypher/nucypher
bash nucypher/scripts/local_fleet/run_local_fleet.sh

cd host

# Install host app to google chrome
chmod u+rw ./install_host.sh
sh ./install_host.sh

# Tell user about success
echo "Snowden host app has been successfully installed"