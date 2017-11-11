const download = require('../core/download');

module.exports = {
  'GET /': async (ctx, next) => {
    ctx.render('index.html', {
      title: 'ocr'
    });
  },

  'POST /test': async (ctx, next) => {
    console.log(ctx.request.body);
    // ctx.response.body = upload.upload(picture);
  },

  'POST /download': async (ctx, next) => {
    let url = ctx.request.body.url;
    ctx.response.body = await download.download(url);
  },

}