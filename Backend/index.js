const connectToMongo=require('./db');

const express = require('express')

connectToMongo();


const app = express()
const port = 6000;

app.use(express.json());
//Available routes
app.use('/api/auth',require('./Routes/auth'))
app.use('/api/notes',require('./Routes/notes'))


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})