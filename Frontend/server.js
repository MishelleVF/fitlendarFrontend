const express = require('express');
const { exec } = require('child_process');
const app = express();
const port = 3001;

app.get('/run-python-script', (req, res) => {
  exec('python quickstart.py', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      res.status(500).send(error.message);
      return;
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      res.status(500).send(stderr);
      return;
    }
    console.log(`stdout: ${stdout}`);
    res.send(stdout);
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}/run-python-script`);
});
