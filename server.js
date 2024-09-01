const express = require('express');
const bodyParser = require('body-parser');
const { taskQueue } = require('./queue');
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Rate limiter middleware
const rateLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 20, // limit each IP to 20 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});

app.use('/task', rateLimiter);

app.post('/task', async (req, res) => {
  try {
    const { user_id } = req.body;
    if (!user_id) {
      return res.status(400).send('user_id is required');
    }
    await taskQueue.add({ user_id });
    res.status(200).send('Task accepted');
  } catch (error) {
    res.status(500).send('An error occurred');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
