const readline = require('readline');

//입력 받아 처리하는 모듈

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.on('line', (input) => {
    console.log(`Received: ${input}`);
  });
  
  rl.question('What do you think of Node.js? ', (answer) => {
    // TODO: Log the answer in a database
    console.log(`Thank you for your valuable feedback: ${answer}`);
  
    // rl.close();
  });