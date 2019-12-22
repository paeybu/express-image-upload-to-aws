const express = require('express')
const router = express.Router()
const fs = require('fs')
const aws = require('aws-sdk')
const uuid = require('uuid')
require('dotenv').config()

const s3 = new aws.S3({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY
})

const uploadFile = fileName => {
  const fileContent = fs.readFileSync(fileName)

  const params = {
    Bucket: process.env.BUCKET_NAME,
    Key: uuid.v4(),
    Body: fileContent
  }

  s3.upload(params, (err, data) => {
    if (err) throw err
    console.log('Upload successful: ', data.Location)
  })
}

exports = router
