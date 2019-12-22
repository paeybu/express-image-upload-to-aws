const express = require('express')
const router = express.Router()
const fs = require('fs')
const aws = require('aws-sdk')
const uuid = require('uuid')
const multer = require('multer')
const multerS3 = require('multer-s3')
require('dotenv').config()

const s3 = new aws.S3({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY
})

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.BUCKET_NAME,
    metadata: function(req, file, cb) {
      cb(null, { fieldName: file.fieldname })
    },
    key: function(req, file, cb) {
      cb(null, Date.now().toString())
    }
  })
})

router.post('/', upload.single('file'), (req, res) => {
  res.status(200).json(req.file.location)
})

module.exports = router
