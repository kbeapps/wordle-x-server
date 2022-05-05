import * as dotenv from 'dotenv';
import express from 'express';

dotenv.config();
const app = express();

app.get('/', (req, res) => {
    return res.send('The horses are out of the barn.');
});

app.post('/api/data', (req, res) => {
    console.log(req.body);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Connection successful.  Port: ${port}`);
});