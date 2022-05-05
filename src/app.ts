import * as dotenv from 'dotenv';
import express from 'express';

dotenv.config();
const app = express();

app.get('/', (req, res) => {
    return res.send('The horses are out of the barn.');
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log('I can hear you...');
});