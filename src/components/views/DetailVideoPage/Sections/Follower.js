import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Follower(props) {

    const userTo = props.userTo;
    const userFrom = props.userFrom;

    const[followers, setFollowers] = useState(0);
    const[followed, setFollowed] = useState(false);


    const onFollow = () => {

        let followVariable = {
            userTo: userTo,
            userFrom: userFrom
        }

        if(followed){
            axios.post('/api/follow/unFollow', followVariable)
            .then(response => {
                if(response.data.success){
                    setFollowers(followers - 1);
                    setFollowed(! followed);
                }else{
                    alert('Failed to unfollow');
                }
            })
        }else{
            axios.post('/api/follow/follow', followVariable)
            .then(response => {
                if(response.data.success){
                    setFollowers(followers + 1);
                    setFollowed(! followed);
                }else{
                    alert('Failed to follow');
                }
            })
        }
    }

    useEffect(() => {
    
        const followerNumberVariables = { userTo: userTo, userFrom: userFrom };
        axios.post('/api/follow/followerNumber', followerNumberVariables)
        .then(response => {
            if(response.data.success){
                console.log(response.data.followerNumber);
                setFollowers(response.data.followerNumber);
            }else{
                alert('Failed to get follower count');
            }
        });
        axios.post('/api/follow/followed', followerNumberVariables)
        .then(response => {
            if(response.data.success){
                console.log(response.data.followed);
                setFollowed(response.data.followed);
            }else{
                alert('Failed to get follower information');
            }
        });        
    })

    return (
        <div>
            {
                (userFrom !== userTo) ?
                <div>
                    <button onClick = {onFollow} style={{backgroundColor: '#CC0000', borderRadius: '2px', color: 'white', padding: '10px 16px', fontWeight: '500', fontSize: '1rem', textTransform: 'uppercase'}}>
                        { followed ? 'Unfollow' : 'Follow' }
                    </button>
                    <p style={{ fontWeight:'500' }}>{followers} Followers</p>
                </div>    :
                <div>
                    <p style={{ fontWeight:'500' }}>{followers} Followers</p>
                </div>    
            }
        </div>
    )
}

export default Follower;