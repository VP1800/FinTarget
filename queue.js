const Queue = require('bull');
const fs = require('fs');
const path = require('path');
const Redis = require('ioredis');

// Initialize Redis connection
const redis = new Redis();

// Create a Bull queue
const taskQueue = new Queue('taskQueue', {
  redis: {
    host: '127.0.0.1',
    port: 6379
  }
});

// Process tasks in the queue
taskQueue.process(async (job) => {
  const { user_id } = job.data;
  await logTaskCompletion(user_id);
});

// Log task completion
async function logTaskCompletion(user_id) {
  const timestamp = new Date().toISOString();
  const logMessage = `${user_id}-task completed at-${timestamp}\n`;
  const logFilePath = path.join(__dirname, 'task_logs.txt');

  // Append log message to the file
  fs.appendFile(logFilePath, logMessage, (err) => {
    if (err) {
      console.error('Failed to write to log file:', err);
    }
  });
}

module.exports = {
  taskQueue
};
