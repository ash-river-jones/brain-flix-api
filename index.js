const express = require('express');
const cors = require('cors');
const app = express();
const videosRoutes = require('./routes/videos')
require('dotenv').config()
const PORT = process.env.PORT || 2000

app.use(cors())
app.use(express.static('public'))
app.use(express.json())
app.use((req,res,next)=>{
	// console.log("middleware")
	next()
})


app.use('/videos',videosRoutes)


app.listen(PORT, function () {
	console.log(`server running at http://localhost:${PORT}`);
});
