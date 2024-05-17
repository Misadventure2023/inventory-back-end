require('dotenv').config();
const express = require('express')
const cors = require('cors')
const numeral = require('numeral');


const app = express()

const PORT = process.env.PORT 

var corsOptions = {
    origin: `http://localhost:${PORT}`
}

app.use(cors())
app.use(express.json(corsOptions))
app.use(express.urlencoded({ extended: true }))

require('./app')(app)

app.listen(PORT, () => {
    console.log(`ExpressJS server listening to port ${PORT}`);
});

setInterval(()=>{
    const {rss, heapTotal} = process.memoryUsage();
    console.log('rss',numeral(rss).format('0.0 ib'),'heapTotal',numeral(heapTotal).format('0.0 ib'));
  },5000);