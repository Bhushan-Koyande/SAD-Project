import React,{ useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { motion } from 'framer-motion';
import axios from 'axios';
import { Input, Button } from 'antd';


function EditProfile(props) {

    const pageVariants = {
        initial: {
          opacity: 0,
          x: "-100vw",
          scale: 0.8
        },
        in: {
          opacity: 1,
          x: 0,
          scale: 1
        },
        out: {
          opacity: 0,
          x: "100vw",
          scale: 1.2
        }
      };
      
    const pageTransition = {
        type: "tween",
        ease: "anticipate",
        duration: 0.5
    };      

    const [userProfile, setUserProfile] = useState({});
    const[newName, setNewName] = useState('');
    const[newEmail, setNewEmail] = useState('');
    const[newPassword, setNewPassword] = useState('');

    useEffect(() => {
        axios.get('/api/users/auth')
            .then(response => {
                if(response.status == 200){
                    console.log(response.data);
                    setUserProfile(response.data);
                }  
            })
    },[])


    const handleSubmit = e => {
        e.preventDefault();
        if(newName !== ''){
            let variable = {
                _id: userProfile._id,
                newName: newName
            }
            axios.post('/api/users/editName', variable)
                .then(response => {
                    if(response.status == 400){
                        alert(response.data.errMsg);
                    }else if(response.data.success){
                        alert('name updated');
                    }else{
                        alert('failed to update name');
                    }
                })
        }
        if(newEmail !== ''){
            let variable = {
                _id: userProfile._id,
                newEmail: newEmail
            }
            axios.post('/api/users/editEmail', variable)
                .then(response => {
                    if(response.status == 400){
                        alert(response.data.errMsg);
                    }else if(response.data.success){
                        alert('e-mail updated');
                    }else{
                        alert('failed to update e-mail');
                    }
                })
        }
        if(newPassword !== ''){
            let variable = {
                _id: userProfile._id,
                newPassword: newPassword
            }
            axios.post('/api/users/editPassword', variable)
                .then(response => {
                    if(response.status == 400){
                        alert(response.data.errMsg);
                    }else if(response.data.success){
                        alert('password updated');
                    }else{
                        alert('failed to update password');
                    }
                })
        }
    }


    const handleChangeName = e => {
        let val = e.target.value;
        setNewName(val);
    }

    const handleChangeEmail = e => {
        let val = e.target.value;
        setNewEmail(val);
    }

    const handleChangePassword = e => {
        let val = e.target.value;
        setNewPassword(val);
    }


    return (
        <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition} style={{margin: '160px'}}>
            <Input placeholder="change name" type="text" size="large" onChange = {handleChangeName}/>
            <hr/>
            <Input placeholder="change email" type="email" size="large" onChange = {handleChangeEmail}/>
            <hr/>
            <Input placeholder="change password" type="password" size="large" onChange = {handleChangePassword}/>
            <hr/>
            <Button type="primary" style={{alignItems: 'center'}} onClick={handleSubmit}>Submit</Button>
        </motion.div>
    )
}

export default EditProfile;
