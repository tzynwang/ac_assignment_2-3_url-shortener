const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.render('index', { input: true })
})

router.post('/', (req, res) => {
  res.render('index', { result: true })
})

module.exports = router
