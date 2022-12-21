const express = require('express')
const connectToMongo =  require("./db");
const cors = require('cors')
const app = express();
const path = require('path');
const port = 5000

connectToMongo();

app.use(cors())
app.use(express.json());
app.use("/images", express.static(path.join(__dirname,"Images")));
app.use("/", express.static(path.join(__dirname,"public")));

// middleware
app.use('/api/auth',require('./routes/auth'));
app.use('/api/blog',require('./routes/blog'));
app.use('/api/upload',require('./middleware/uploadimg'));

// static files - Serving the front end
app.use(express.static(path.join(__dirname,'./client/dist')))

app.get('*',(req,res) => {
   res.sendFile(path.join(__dirname,'./client/dist/index.html'))
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

