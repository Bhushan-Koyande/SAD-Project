const express = require('express');
const router = express.Router();
const multer = require('multer');
var ffmpeg = require('fluent-ffmpeg');

const { Video } = require("../models/Video");
const { auth } = require("../middleware/auth");

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`)
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        if (ext !== '.mp4') {
            return cb(res.status(400).end('only jpg, png, mp4 is allowed'), false);
        }
        cb(null, true)
    }
})

var upload = multer({ storage: storage }).single("file")


//=================================
//             Video
//=================================

class VideoClass{

    constructor(){
        this.uploadVideo();
        this.getVideos();
        this.play();
        this.searchVideos();
        this.getOwnVideos();
    }

    uploadVideo(){
        router.post("/uploadfiles", (req, res) => {

            upload(req, res, err => {
                if (err) {
                    return res.json({ success: false, err })
                }
                return res.json({ success: true, filePath: res.req.file.path, fileName: res.req.file.filename })
            })
        
        });
        
        router.post("/thumbnail", (req, res) => {
        
            let thumbsFilePath ="";
            let fileDuration ="";
        
            ffmpeg.ffprobe(req.body.filePath, function(err, metadata){
                console.dir(metadata);
                console.log(metadata.format.duration);
        
                fileDuration = metadata.format.duration;
            })
        
        
            ffmpeg(req.body.filePath)
                .on('filenames', function (filenames) {
                    console.log('Will generate ' + filenames.join(', '))
                    thumbsFilePath = "uploads/thumbnails/" + filenames[0];
                })
                .on('end', function () {
                    console.log('Screenshots taken');
                    return res.json({ success: true, thumbsFilePath: thumbsFilePath, fileDuration: fileDuration})
                })
                .screenshots({
                    // Will take screens at 20%, 40%, 60% and 80% of the video
                    count: 3,
                    folder: 'uploads/thumbnails',
                    size:'320x240',
                    // %b input basename ( filename w/o extension )
                    filename:'thumbnail-%b.png'
                });
        
        });
        
        router.post("/uploadVideo", (req, res) => {
        
            const video = new Video(req.body)
        
            video.save((err, video) => {
                if(err) return res.status(400).json({ success: false, err })
                return res.status(200).json({
                    success: true 
                })
            })
        
        });
    }

    getVideos(){
        router.get("/getVideos", (req, res) => {

            Video.find()
                .populate('writer')
                .exec((err, videos) => {
                    if(err) return res.status(400).send(err);
                    res.status(200).json({ success: true, videos })
                })
        
        });
    }

    play(){
        router.post("/getVideo", (req, res) => {

            Video.findOne({ "_id" : req.body.videoId })
            .populate('writer')
            .exec((err, video) => {
                if(err) return res.status(400).send(err);
                res.status(200).json({ success: true, video })
            })
        });
    }

    searchVideos(){
        router.post("/searchVideos", (req, res) => {

            Video.find({title: { $regex: req.body.searchTerm, $options: "i" }},(err, videos) => {
                if(err) return res.status(400).send(err);
                res.status(200).json({ success: true, videos })
            })
        });
    }

    getOwnVideos(){
        router.post("/getOwnVideos", (req, res) => {

            Video.find({"author": req.body.authorId},(err, videos) => {
                if(err) return res.status(400).send(err);
                res.status(200).json({ success: true, videos })
            })
        });        
    }

}


new VideoClass();








module.exports = router;