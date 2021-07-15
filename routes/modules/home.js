const express = require('express')
const router = express.Router()

// DB
const URL = require('../../models/urls')

// URL validation
const { urlValidate } = require('../../tools/urlValidate')

// shorten URL function
const { shortenUrlBase62 } = require('../../tools/shortenUrlBase62')

router.get('/', (req, res) => {
  res.render('index', { input: true })
})

router.post('/', async (req, res) => {
  const { originUrl } = req.body
  if (!originUrl) {
    return res.render('index', { input: true, errorMessage: 'Please enter URL' })
  }

  if (!urlValidate(originUrl)) {
    return res.render('index', { input: true, errorMessage: 'Please enter valid URL' })
  }

  const shortUrl = await URL.find({ originUrl }).lean()

  if (shortUrl.length) {
    return res.render('index', {
      result: true,
      shortUrl: `${process.env.APP_URL}${shortUrl[0].shorten}`
    })
  }

  let shorten = shortenUrlBase62()
  let checkResult = await URL.find({ shorten }).lean()
  while (checkResult.length) {
    shorten = shortenUrlBase62()
    checkResult = await URL.find({ shorten }).lean()
  }

  const newURL = new URL({ originUrl, shorten })
  await newURL.save()
  res.render('index', { result: true, shortUrl: `${process.env.APP_URL}${shorten}` })
})

router.get('/:shorten', async (req, res) => {
  const shorten = req.params.shorten
  const result = await URL.find({ shorten }).lean()
  if (!result.length) return res.status(404).render('404')
  res.redirect(`${result[0].originUrl}`)
})

module.exports = router
