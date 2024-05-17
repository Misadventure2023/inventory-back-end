require('dotenv').config();
const express = require('express')
const cors = require('cors')
const numeral = require('numeral');


const app = express()

const PORT = process.env.PORT 
const ORIGIN = process.env.ORIGIN 

var corsOptions = {
    origin: ORIGIN,
    optionsSuccessStatus: 200,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}

console.log(corsOptions)

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use((err, req, res, next) => {
    if (err) {
        console.error('CORS error:', err);
        res.status(500).send('CORS error');
    } else {
        next();
    }
});

require('./app')(app)

app.listen(PORT, () => {
    console.log(`ExpressJS server listening to port ${PORT} ${ORIGIN}`);
});

setInterval(()=>{
    const {rss, heapTotal} = process.memoryUsage();
    console.log('rss',numeral(rss).format('0.0 ib'),'heapTotal',numeral(heapTotal).format('0.0 ib'));
  },5000);