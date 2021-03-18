# HPGL Sender

Send HPGL code on our Roland DXY plotters through a web interface.

## Install on raspberry pi (Raspbian Jessie Stretch Lite)

### Install nodejs

* Update the package list : `sudo apt-get update`
* Install curl and git : `sudo apt-get install git curl -y`
* Download script from nodesource for v8 : `curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -`
* Install node : `sudo apt-get install nodejs -y`

### Clone repository

`git clone https://github.com/LgHS/hpgl-sender.git'

## Run server

* `cd hpgl-sender`
* `npm install`
* `node src/app.js`

Look for your raspberry pi IP address on your local
 network, add port `8080` and open in your browser
 (eg. `http://192.168.*.*:8080`)
