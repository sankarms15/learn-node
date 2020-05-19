const express = require('express');
const pjson = require('../package.json');
const router = express.Router();

router.get('/ping', (req, res) => {
  res.json({ version: pjson.version });
});

module.exports = router;