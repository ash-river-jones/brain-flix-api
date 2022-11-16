const fs = require('fs');
const express = require('express');
const router = express.Router();
const {v4: uuid} = require('uuid');

router.route('/')
    .get((req, res) => {
	const data = fs.readFileSync('./data/videos.json', 'utf-8');
	const videoListData = JSON.parse(data).map((video) => {
		return {
			id: video.id,
			title: video.title,
			channel: video.channel,
			image: video.image,
		};
	});
	res.json(videoListData);
})
    .post((req,res)=>{
        const data =fs.readFileSync('./data/videos.json', 'utf-8');
        const videoListData = JSON.parse(data);
        if(req.body.title && req.body.desc){
            videoListData.push({
                id: uuid(),
                title: req.body.title,
                channel: "Ash Jones",
                image: "images/imageUpload.jpg",
                description: req.body.desc,
                views: "0",
                duration: "12:34",
                video:"https://project-2-api.herokuapp.com/stream",
                timestamp: Date.now(),
                comments:[]
            })
            fs.writeFileSync('./data/videos.json', JSON.stringify(videoListData))
            res.send("Video published to server")
        } else {
            res.send("You forgot to include json data in your request")
        }
    })

router.route('/:id').get((req, res) => {
	const data = fs.readFileSync('./data/videos.json', 'utf-8');
	const videoData = JSON.parse(data);
	res.json(
		videoData.find((video) => {
			return video.id === req.params.id;
		})
	);
});

module.exports = router;
