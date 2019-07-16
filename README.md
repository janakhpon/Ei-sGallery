# Ei'Gallery
  Ei'sGallery is a simple wallpaper website for nature lover.You can upload wallpaper with related `TYPE` and `TAG WORDS` and as a consequence of this you can easily select `TYPE` options or `SEARCH TAG WORDS` from search box. `CRUD` operation can only be done with `admin` route. Here is a github example demo for [herokudeploy](https://ei-sgallery.herokuapp.com/)


[![Build Status](https://secure.travis-ci.org/fent/node-ytdl.svg)](https://github.com/janakhpon/Ei-sGallery.git)
[![Dependency Status](https://david-dm.org/fent/node-ytdl.svg)](https://github.com/janakhpon/Ei-sGallery.git)
[![codecov](https://codecov.io/gh/fent/node-ytdl/branch/master/graph/badge.svg)](https://ei-sgallery.herokuapp.com/)

# Usage

clone the repository

    git clone https://github.com/janakhpon/Ei-sGallery.git

Get into root folder

    cd Ei'sGallery

Install Dependencies using [npm](https://www.npmjs.com/)

    npm install
    npm i -d
    npm run start
    npm run dev

Install Dependencies using [yarn](https://yarnpkg.com/en/)

    yarn install
    yarn add
    yarn start
    yarn dev




# Warning
If u run into error use the following steps

```bash
sudo yarn install
sudo yarn
sudo yarn start
sudo yarn dev
```
or

```bash
sudo npm install
sudo npm i -d
sudo npm run start
sudo npm run dev
```

#API REQUESTS
Currently only list of data `get` request only is possile to make but i still havent add `allow cross origin` option for external request.
```bash
axios.get('https://ei-sgallery.herokuapp.com/ei-gallery/list', ...)
```
