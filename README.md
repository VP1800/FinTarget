# Task Queue API

This project is a Node.js API for handling tasks with rate limiting and queuing using Redis and Bull. The API allows users to submit tasks while adhering to rate limits and processes them asynchronously.

## Features

- **Rate Limiting**: Enforces a limit of 1 task per second and 20 tasks per minute per user ID.
- **Task Queuing**: Uses Bull for managing and processing task queues.
- **Logging**: Logs task completion with user ID and timestamp.

## Prerequisites

1. **Node.js**: Ensure you have Node.js (v14.x or later) installed on your system.
2. **Redis**: Redis server should be installed and running. For installation instructions, refer to [Redis Installation Guide](https://redis.io/download).

## Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/vp1800/FinTarget.git
   cd FinTarget

