const express = require('express');
const router = express.Router();


const { Follower } = require('../models/Follower');

const { auth } = require('../middleware/auth');


//=================================
//             Follower
//=================================


class FollowerClass{
    
    constructor(){
        this.follow();
        this.unfollow();
    }

    follow(){

        router.post('/followerNumber', (req, res) => {

            Follower.find({ "userTo": req.body.userTo })
            .exec((err, follow) => {
                if(err){
                    return res.status(400).send(err);
                }
        
                res.status(200).json({ success: true, followerNumber: follow.length })
            })
        });
        
        router.post('/followed', (req, res) => {
        
            Follower.find({ "userTo": req.body.userTo, "userFrom": req.body.userFrom })
            .exec((err, follow) => {
                if(err){
                    return res.status(400).send(err);
                }
        
                let result = false;
                if(follow.length !== 0){
                    result = true;
                }
                res.status(200).json({ success: true, followed: result })
            })
        });
        
        
        router.post('/follow', (req, res) => {
        
            const follower = new Follower(req.body);
        
            follower.save((err, doc) => {
                if(err){
                    return res.json({success: false, err});
                }
                return res.status(200).json({ success: true });
            })
        
        });

    }

    unfollow(){

        router.post('/unFollow', (req, res) => {

            Follower.findOneAndDelete({ userTo: req.body.userTo, userFrom: req.body.userFrom })
            .exec((err, doc) => {
                if(err){
                    return res.json({success: false, err});
                }
                return res.status(200).json({ success: true, doc });
            })
        
        });

    }

}


new FollowerClass();


module.exports = router;