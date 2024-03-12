var express = require('express');
const Contact = require('../models/ContactModel');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/api/contact/add', async function (req, res, next) {
  const { fullName, email, subject, message } = req.body

  try {

    if (!fullName) res.status(400).json({ success: false, message: 'Full Name is required' })
    if (!email) res.status(400).json({ success: false, message: 'Email is required' })
    if (!subject) res.status(400).json({ success: false, message: 'Subject is required' })
    if (!message) res.status(400).json({ success: false, message: 'Message is required' })

    const newContact = new Contact({ fullName, email, subject, message });

    await newContact.save();

    res.status(201).json({ success: true, message: 'Contact form submitted successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }

});

router.get('/api/contact/all', async function (req, res, next) {

  try {
    const contacts = await Contact.find({});

    res.status(200).json({ success: true, message: 'Contact Forms', result: contacts })
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
