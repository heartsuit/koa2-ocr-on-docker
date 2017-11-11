const fs = require('fs');

function addControllers(router, dir) {
  // read files synchronously only one time on start
  var files = fs.readdirSync(__dirname + `/${dir}`);
  var jsFiles = files.filter((f) => {
    return f.endsWith('.js');
  });

  //iterate an array
  for (let f of jsFiles) {
    console.log(`process controller: ${f}...`);
    let mapping = require(__dirname + `/${dir}/` + f);
    addMapping(router, mapping);
  }
}

function addMapping(router, mapping) {
  //iterate an object
  for (let url in mapping) {
    if (url.startsWith('GET ')) {
      var path = url.substring(4);
      router.get(path, mapping[url]);
      console.log(`register URL mapping: GET ${path}`);
    } else if (url.startsWith('POST ')) {
      var path = url.substring(5);
      router.post(path, mapping[url]);
      console.log(`register URL mapping: POST ${path}`);
    } else {
      console.log(`invalid URL: ${url}`);
    }
  }
};

module.exports = function (dir) {
  let controller_dir = dir || 'controllers';
  let router = require('koa-router')();

  addControllers(router, controller_dir);
  return router.routes();
};