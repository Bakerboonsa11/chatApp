require('dotenv').config({ path: './config.env' }); // Ensure correct .env file is loaded
const App = require('./app');
const mongoose=require('mongoose')



const DB=process.env.DBSTRING
const port=process.env.PORT

// Connect to MongoDB
mongoose
  .connect(DB,{
  })
  .then(() => console.log('Database connected successfully'))
  .catch((err) => console.error('Database connection failed:', err.message));


App.listen(port,()=>{
    console.log(`server is running at port ${port}`)
})






