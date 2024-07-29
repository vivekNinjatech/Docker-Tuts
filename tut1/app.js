const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Who you are ?: ', (input) => {
    console.log(`Hello ${input}, How you doing Today?`);
    rl.close();
});