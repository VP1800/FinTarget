const express = require('express');
const bodyParser = require('body-parser');
const Redis = require('ioredis');
const Bull = require('bull');

// Initialize Express app
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// Initialize Redis and Bull queue
const redis = new Redis(); // Defaults to localhost:6379
const taskQueue = new Bull('task-queue', { redis: { host: '127.0.0.1', port: 6379 } });

// Route to handle task submission
app.post('/task', async (req, res) => {
  const userId = req.body.user_id;

  if (!userId) {
    return res.status(400).json({ error: 'user_id is required' });
  }

  try {
    // Add task to the queue
    await taskQueue.add({ userId });

    res.status(200).json({ message: 'Task queued successfully' });
  } catch (error) {
    console.error('Error adding task to queue:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Process tasks from the queue
taskQueue.process(async (job) => {
  const { userId } = job.data;
  
  // Log task completion
  console.log(`${userId} - task completed at ${Date.now()}`);
  // Here you can add logic to write to a log file if needed
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
