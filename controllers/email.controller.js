const Email = require('../models/email.model');
const schedule = require('node-schedule');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'nityabalar@gmail.com',
    pass: 'bmse qlxp odvy midk', 
  },
  debug: true, 
});

const sendEmail = async (email) => {
  const { recipient, subject, body, attachments } = email;
  try {
    console.log('Sending email:', email);
    await transporter.sendMail({
      from: '"Nitya Balar" <nityabalar@gmail.com>',
      to: recipient,
      subject: subject,
      text: body,
      attachments: attachments.length > 0 ? attachments : [],
    });
    console.log(`Email sent to ${recipient}`);
  } catch (error) {
    console.error(`Failed to send email to ${recipient}:`, error);
  }
};

exports.scheduleEmail = async (req, res) => {
  const { recipient, subject, body, scheduleTime, recurrence, recurrenceDetails, attachments } = req.body;

  try {
    const scheduleDate = new Date(scheduleTime);
    if (isNaN(scheduleDate.getTime()) || scheduleDate <= new Date()) {
      return res.status(400).json({ msg: 'Schedule time must be a valid future date.' });
    }

    const newEmail = new Email({ recipient, subject, body, scheduleTime, recurrence, recurrenceDetails, attachments });
    await newEmail.save();

    console.log(`Scheduling email for ${recipient} at ${scheduleDate}`);

    const jobName = newEmail._id.toString();

    if (recurrence === 'none') {
      schedule.scheduleJob(jobName, scheduleDate, () => {
        console.log(`Job triggered: sending email to ${recipient}`);
        sendEmail(newEmail);
      });
    } else {
      const rule = new schedule.RecurrenceRule();
      rule.hour = scheduleDate.getHours();
      rule.minute = scheduleDate.getMinutes();

      if (recurrence === 'daily') {
        schedule.scheduleJob(jobName, rule, () => {
          console.log(`Job triggered: sending daily email to ${recipient}`);
          sendEmail(newEmail);
        });
      } else if (recurrence === 'weekly') {
        rule.dayOfWeek = recurrenceDetails.days;
        schedule.scheduleJob(jobName, rule, () => {
          console.log(`Job triggered: sending weekly email to ${recipient}`);
          sendEmail(newEmail);
        });
      } else if (recurrence === 'monthly') {
        rule.date = recurrenceDetails.dates; 
        schedule.scheduleJob(jobName, rule, () => {
          console.log(`Job triggered: sending monthly email to ${recipient}`);
          sendEmail(newEmail);
        });
      } else if (recurrence === 'quarterly') {
        rule.month = [0, 3, 6, 9];
        rule.date = recurrenceDetails.dates; 
        schedule.scheduleJob(jobName, rule, () => {
          console.log(`Job triggered: sending quarterly email to ${recipient}`);
          sendEmail(newEmail);
        });
      }
    }

    res.json(newEmail);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

exports.getAllScheduledEmails = async (req, res) => {
  try {
    const emails = await Email.find();
    res.json(emails);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

exports.getScheduledEmail = async (req, res) => {
  try {
    const email = await Email.findById(req.params.id);
    if (!email) return res.status(404).json({ msg: 'Email not found' });
    res.json(email);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

exports.deleteScheduledEmail = async (req, res) => {
  try {
    const email = await Email.findById(req.params.id);
    if (!email) return res.status(404).json({ msg: 'Email not found' });

    await Email.deleteOne({ _id: req.params.id });

    // Cancel the scheduled job if it exists
    const job = schedule.scheduledJobs[req.params.id];
    if (job) {
      job.cancel();
    }

    res.json({ msg: 'Email canceled' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};
