import React, { useState, useEffect } from 'react';
import{Tooltip, Icon } from 'antd';
import axios from 'axios';


function LikeDislikes(props){

    const [Likes,setLikes] = useState(0)
    const [LikeAction,setLikeAction] = useState(null)
    const [Dislikes,setDislikes] = useState(0)
    const [DislikeAction,setDislikeAction] = useState(null)

    let variable ={};

    if (props.video) {
        variable = {videoId : props.videoId , userId : props.userId}
    }else{
        variable = { commentId : props.commentId , userId : props.userId}
    }

    useEffect(() => {
        axios.post('/api/like/getLikes', variable)
        .then(response => {
            if (response.data.success) {
                //how many likes
                setLikes(response.data.likes.length)
                
                if(response.data.likes.length > 0){
                    response.data.likes.map(like => {
                        if (like.userId === props.userId) {
                            setLikeAction('liked')
                        }
                    })
                }
            }else{
                alert('Failed to get likes')
            }
        })

        axios.post('/api/like/getDisLikes', variable)
        .then(response => {
            if (response.data.success) {
                //how many dislikes
                setDislikes(response.data.dislikes.length)

                if(response.data.dislikes.length > 0){
                    response.data.dislikes.map(dislike => {
                        if (dislike.userId === props.userId) {
                            setDislikeAction('disliked')
                        }
                    })
                }
            }else{
                alert('Failed to get dislikes')
            }
        })
    })

    const onLike = () => {
        if(LikeAction === null){
            axios.post('/api/like/upLike', variable)
            .then(response => {
                if(response.data.success){
                    setLikes(Likes + 1);
                    setLikeAction('liked');

                    if(DislikeAction !== null){
                        setDislikeAction(null);
                        setDislikes(Dislikes - 1);
                    }
                }else{
                    alert('Failed to save like');
                }
            })
        }else{
            axios.post('/api/like/unLike', variable)
            .then(response => {
                if(response.data.success){
                    setLikes(Likes - 1);
                    setLikeAction(null);

                }else{
                    alert('Failed to remove like');
                }
            })
        }
    }

    const onDislike = () => {
        if (DislikeAction !== null) {
            axios.post('/api/like/unDisLike', variable)
            .then(response => {
                if (response.data.success) {

                    setDislikes(Dislikes - 1)
                    setDislikeAction(null)
                } else {
                    alert('Failed to remove dislike')
                }
            })
        } else {
            axios.post('/api/like/upDisLike', variable)
            .then(response => {
                if (response.data.success) {

                    setDislikes(Dislikes + 1)
                    setDislikeAction('disliked')

                    //If dislike button is already clicked
                    if(LikeAction !== null ) {
                        setLikeAction(null)
                        setLikes(Likes - 1)
                    }
                } else {
                    alert('Failed to save dislike')
                }
            })
        }

    }

    return(

        <React.Fragment>
            <span key="comment-basic-like">
                <Tooltip title="Like">
                    <Icon type="like" theme ={LikeAction === 'liked' ? 'filled' : 'outlined'} onClick={onLike}/>
                </Tooltip>
                <span style={{ paddingLeft: '8px',cursor: 'auto'}}>{ Likes }</span>
            </span>&nbsp;&nbsp;

            <span key="comment-basic-dislike">
                <Tooltip title="Dislike">
                    <Icon type="dislike" theme ={DislikeAction === 'liked' ? 'filled' : 'outlined'} onClick={onDislike}/>
                </Tooltip>
                <span style={{ paddingLeft: '8px',cursor: 'auto'}}>{ Dislikes }</span>
            </span>&nbsp;&nbsp;    
        </React.Fragment>  
    )
}

export default LikeDislikes;