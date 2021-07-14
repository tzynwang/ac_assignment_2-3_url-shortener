const express = require('express')
const router = express.Router()

// DB
const URL = require('../../models/urls')

// shorten URL function
const { generateShortUrl } = require('../../tools/shortenUrl')

router.get('/', (req, res) => {
  res.render('index', { input: true })
})

router.post('/', async (req, res) => {
  const { originUrl } = req.body
  const shortUrl = await URL.find({ originUrl }).lean()

  if (shortUrl.length) {
    return res.render('index', {
      result: true,
      shortUrl: `${process.env.APP_URL}${shortUrl[0].shorten}`
    })
  }

  let shorten = generateShortUrl()
  let checkResult = await URL.find({ shorten }).lean()
  while (checkResult.length) {
    shorten = generateShortUrl()
    checkResult = await URL.find({ shorten }).lean()
  }

  const newURL = new URL({
    originUrl,
    shorten
  })
  await newURL.save()
  res.render('index', { result: true, shortUrl: `${process.env.APP_URL}${shorten}` })
})

module.exports = router
