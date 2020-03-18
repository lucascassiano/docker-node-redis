const express = require('express')
const redis = require('redis')

const app = express()
console.log("hello world")
const client = redis.createClient({ host: process.env.REDIS });

// {
//     host: 'redis-server',
//     port: 6379
// }

// client.set('visits', 0);

//defining the root endpoint
app.post('/set', (req, res) => {
    //Set initial visits
    client.set('visits', 0);
    res.send('OK')
})

//defining the root endpoint
app.get('/', (req, res) => {
    client.get('visits', (err, visits) => {
        let total = parseInt(visits) + 1
        res.send('Number of visits is: ' + total)
        client.set('visits', parseInt(visits) + 1)
    })
})

app.get('/test', (req, res) => res.send('Hello World!'))

//specifying the listening port
app.listen(8080, () => {
    console.log('Listening on port 8080')
})