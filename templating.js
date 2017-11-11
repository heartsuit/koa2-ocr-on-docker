const nunjucks = require('nunjucks');

function createEnv(path, opts) {
  var
    autoescape = opts.autoescape && true,
    noCache = opts.noCache || false,
    watch = opts.watch || false,
    throwOnUndefined = opts.throwOnUndefined || false,
    env = new nunjucks.Environment(
      new nunjucks.FileSystemLoader('views', {
        noCache: noCache,
        watch: watch,
      }), {
        autoescape: autoescape,
        throwOnUndefined: throwOnUndefined
      });
  if (opts.filters) {
    for (var f in opts.filters) {
      env.addFilter(f, opts.filters[f]);
    }
  }
  return env;
}

function templating(path, opts) {
  var env = createEnv(path, opts);
  return async (ctx, next) => {
    ctx.render = function (view, model) {
      ctx.response.type = 'text/html';
      ctx.response.body = env.render(view, Object.assign({}, ctx.state || {}, model || {}));
    }

    await next();
  }
}

module.exports = templating;
