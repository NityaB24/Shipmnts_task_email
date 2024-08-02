const express = require('express');
const router = express.Router();
const { scheduleEmail,getScheduledEmail, getAllScheduledEmails, deleteScheduledEmail } = require('../controllers/email.controller');

router.post('/schedule-email', scheduleEmail);
router.get('/scheduled-emails', getAllScheduledEmails);
router.get('/scheduled-emails/:id', getScheduledEmail);
router.delete('/scheduled-emails/:id', deleteScheduledEmail);

module.exports = router;
