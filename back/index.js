const express = require('express');
const PORT = process.env.PORT || 3000
const bodyParser = require('body-parser');
const db = require("./models")
const app = express()
const cors = require('cors')
const apiRouter = require('./routes/apiRouter');

db.sequelize.sync().then((req) =>{
    app.listen(PORT, () => console.log(`server started on post ${PORT}`))
})


// app.listen(PORT, () => console.log(`server started on port ${PORT}`))
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use('/apiRouter', apiRouter)
// routes?.forEach((item) =>{
//     console.log(item)
//     app.use(`/api/v1/${item}`, require(`./routes/${item}`))
// })

app.get('/', (req, res) =>{
    res.send('nodemon is work')
})


console.log('Server running')