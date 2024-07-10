const connectToMongo=require('./db');

const express = require('express')
const cors=require('cors')

connectToMongo();


const app = express()
const port = 5001;
app.use(cors())
app.use(express.json());
//Available routes
app.use('/api/auth',require('./Routes/auth'))
app.use('/api/notes',require('./Routes/notes'))


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})