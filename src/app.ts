import express from 'express';

const app = express();

app.get('/', (req, res) => {
    return res.send('nooooooope');
});

app.listen(8080, () => {
    console.log('I can hear you...');
});

console.log('test')