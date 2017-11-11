const router = require('koa-router')();
const multer = require('koa-multer');

// config local storage
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './static/uploads/')
  },
  filename: function (req, file, cb) {
    var fileFormat = (file.originalname).split(".");
    cb(null, Date.now() + "." + fileFormat[fileFormat.length - 1]);
  }
})
var upload = multer({ storage: storage });

// note: upload.single('picture'), the parameter here is the name the input(form data)
router.post('/upload', upload.single('picture'), async (ctx, next) => {
  try {
    const ocr = require('./ocr');
    let url = ctx.req.file.path; // local path
    let text = await ocr.recognize(url);

    if (url.startsWith('static')) {
      url = url.substr(6);
    }
    ctx.body = {
      status: true,
      text: text,
      url: url
    }
    let log = `[${new Date().toLocaleString()}], upload: ${url}`;
    ocr.write2Log('./log.txt', log);
  } catch (err) {
    ctx.body = {
      status: false,
      text: err.message,
      url: ''
    }
  }
})

// export router for app's use()
module.exports = router; 