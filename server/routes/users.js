const express = require('express');
const router = express.Router();
const { User } = require("../models/User");

const { auth } = require("../middleware/auth");

//=================================
//             User
//=================================

class UserClass{

    constructor(){
        this.isAuthenticated();
        this.signup();
        this.signin();
        this.signout();
        this.editProfile();
    }

    isAuthenticated(){
        router.get("/auth", auth, (req, res) => {
            res.status(200).json({
                _id: req.user._id,
                isAdmin: req.user.role === 0 ? false : true,
                isAuth: true,
                email: req.user.email,
                name: req.user.name,
                lastname: req.user.lastname,
                role: req.user.role,
                image: req.user.image,
            });
        });
    }

    signup(){
        router.post("/register", (req, res) => {

            const user = new User(req.body);
        
            user.save((err, doc) => {
                if (err) return res.json({ success: false, err });
                return res.status(200).json({
                    success: true
                });
            });
        });
    }

    signin(){
        router.post("/login", (req, res) => {
            User.findOne({ email: req.body.email }, (err, user) => {
                if (!user)
                    return res.json({
                        loginSuccess: false,
                        message: "Auth failed, email not found"
                    });
        
                user.comparePassword(req.body.password, (err, isMatch) => {
                    if (!isMatch)
                        return res.json({ loginSuccess: false, message: "Wrong password" });
        
                    user.generateToken((err, user) => {
                        if (err) return res.status(400).send(err);
                        res.cookie("w_authExp", user.tokenExp);
                        res
                            .cookie("w_auth", user.token)
                            .status(200)
                            .json({
                                loginSuccess: true, userId: user._id
                            });
                    });
                });
            });
        });
    }

    signout(){
        router.get("/logout", auth, (req, res) => {
            User.findOneAndUpdate({ _id: req.user._id }, { token: "", tokenExp: "" }, (err, doc) => {
                if (err) return res.json({ success: false, err });
                return res.status(200).send({
                    success: true
                });
            });
        });
    }

    editProfile(){

        router.post("/editName", auth, (req, res) => {
            User.findOne({ name: req.body.newName }, (err, user) => {
                if(user){
                    return res.status(400).json({errMsg : "You can not user old name"});
                }
            })
            User.findOneAndUpdate({ _id: req.body._id }, { name: req.body.newName }, (err, doc) => {
                if (err) return res.json({ success: false, err });
                return res.status(200).send({
                    success: true
                });
            });
        });
        
        router.post("/editEmail", auth, (req, res) => {
            User.findOne({ name: req.body.newName }, (err, user) => {
                if(user){
                    return res.status(400).json({errMsg : "You can not user old email"});
                }
            })
            User.findOneAndUpdate({ _id: req.body._id }, { email: req.body.newEmail }, (err, doc) => {
                if (err) return res.json({ success: false, err });
                return res.status(200).send({
                    success: true
                });
            });
        });
        
        router.post("/editPassword", auth, (req, res) => {
            User.findOne({ name: req.body.newName }, (err, user) => {
                if(user){
                    user.comparePassword(req.body.newPassword, (err, isMatch) => {
                        if(isMatch){
                            return res.status(400).json({errMsg : "You can not user old password"});
                        }
                    })
                }
            })
            User.findOneAndUpdate({ _id: req.body._id }, { password: req.body.newPassword }, (err, doc) => {
                if (err) return res.json({ success: false, err });
                return res.status(200).send({
                    success: true
                });
            });
        });
    }

}

new UserClass();

module.exports = router;
