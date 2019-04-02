# Router-lite

router-lite is simplified router resolver

it doesn't listen any event


# Installation

using Npm
-----------
    npm install router-lite
-----------

using browser
----------
Download
    https://raw.githubusercontent.com/tmdgus0118/router-lite/master/dist/router-lite.js
    https://raw.githubusercontent.com/tmdgus0118/router-lite/master/dist/router-lite.min.js

----------

# Usage

In node.js or using browserify
-----------
    const routerLite = require('router-lite')
    const router = new routerLite();
    router.on('/test/:parameter/:optional?', function (params) {
        console.log(params); 
    });
    router.otherwise(function (){
        console.log('otherwise');
    })
    router.resolve('/test/abc/def'); // { parameter: 'abc', optional : 'def'}
    router.resolve('/test/abc'); // { parameter : 'abc' }
    router.resolve('/no'); // otherwise
-----------

In browser
-----------
    var router = new routerLite();
    router.on('/test/:parameter/:optional?', function (params) {
        console.log(params); 
    });
    router.otherwise(function (){
        console.log('otherwise');
    })
    router.resolve('/test/abc/def'); // { parameter: 'abc', optional : 'def'}
    router.resolve('/test/abc'); // { parameter : 'abc' }
    router.resolve('/no'); // otherwise
-----------
