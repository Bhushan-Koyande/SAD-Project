import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Button, Input } from 'antd';
import SingleComment from './SingleComment';
import ReplyComment from './ReplyComment';
const { TextArea } = Input;

function Comments(props) {

    const user = useSelector(state => state.user);

    const[comment, setComment] = useState('');

    const handleChange = (e) => {
        setComment(e.currentTarget.value);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        const variables = {
            content: comment,
            writer: user.userData._id,
            videoId: props.videoId 
        };

        axios.post('/api/comment/saveComment', variables)
        .then(response => {
            if(response.data.success){
                setComment('');
                props.refreshFunction(response.data.result);
            }else{
                alert('Failed to save the comment');
            }
        })
    }

    return(
        <div>
            <br/>
            <p> Comments </p>
            <hr/>
            { /* Comment Lists */ }
            {console.log(props.CommentLists)}
            { props.CommentLists && props.CommentLists.map((comment, index) => (
                (!comment.responseTo && 
                    <React.Fragment>
                        <SingleComment comment = { comment } videoId = { props.videoId } refreshFunction = { props.refreshFunction } />
                        <ReplyComment CommentLists={props.CommentLists} videoId = { props.videoId } refreshFunction = { props.refreshFunction }/>
                    </React.Fragment>
                )
            )        
            ) }

            { /* Root comment form */ }
            <form style={{ display:'flex' }} onSubmit = {onSubmit}>
                <TextArea
                    style={{width:'100%', borderRadius:'5px'}}
                    onChange = {handleChange}
                    value = {comment}
                    placeholder="write some comments"
                />
                <br/>
                <Button style={{width:'20%',height:'52px'}} type='primary' onClick={onSubmit}>Submit</Button>
            </form>
        </div>
    )
}

export default Comments;