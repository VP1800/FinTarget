const cluster = require('cluster');
const os = require('os');

if (cluster.isMaster) {
  const numWorkers = 2; // Number of replicas
  console.log(`Master ${process.pid} is running`);
  
  for (let i = 0; i < numWorkers; i++) {
    cluster.fork();
  }
  
  cluster.on('exit', (worker) => {
    console.log(`Worker ${worker.process.pid} died, starting a new one...`);
    cluster.fork();
  });
} else {
  require('./server'); // Worker processes run the server
}
