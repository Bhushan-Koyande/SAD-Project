import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import moment from 'moment';
import { Input, Typography } from 'antd';
import { Space, Card, Avatar, Col, Row } from 'antd';

const { Meta } = Card;
const { Search } = Input;

function SearchPage() {

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

    const[videos, setVideos] = useState([]);


    const search = (val) => {
        console.log(val);
        let variable = {
            searchTerm: val
        }
        axios.post('/api/video/searchVideos', variable)
            .then(response => {
                if (response.data.success) {
                    console.log(response.data.videos)
                    setVideos(response.data.videos)
                } else {
                    alert('Failed to get Videos');
                }
            });
    }

    const renderCards = videos.map((video, index) => {

        var minutes = Math.floor(video.duration / 60);
        var seconds = Math.floor(video.duration - minutes * 60);

        return <Col lg={6} md={8} xs={24}>
            <div style={{ position: 'relative' }}>
                <a href={`/video/${video._id}`} >
                <img style={{ width: '100%' }} alt="thumbnail" src={`http://localhost:5000/${video.thumbnail}`} />
                <div className=" duration"
                    style={{ bottom: 0, right:0, position: 'absolute', margin: '4px', 
                    color: '#fff', backgroundColor: 'rgba(17, 17, 17, 0.8)', opacity: 0.8, 
                    padding: '2px 4px', borderRadius:'2px', letterSpacing:'0.5px', fontSize:'12px',
                    fontWeight:'500', lineHeight:'12px' }}>
                    <span>{minutes} : {seconds}</span>
                </div>
                </a>
            </div><br />
            <Meta
                avatar={
                    <Avatar src={video.writer.image} />
                }
                title={video.title}
            />
            <span>{video.writer.name} </span><br />
            <span style={{ marginLeft: '3rem' }}> {`${video.views} views`}</span>
            - <span> {moment(video.createdAt).format("MMM Do YY")} </span>
        </Col>

    })

    return (
        <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition} style={{margin: '10px'}}>
            <div style={{ height:'300px', backgroundImage:'linear-gradient(to bottom right, blue, green)',display:'block', justifyContent:'center' }}>
                <Typography.Title style={{ color:'white', top:'30%', textAlign:'center' }}>What Are You Looking For ?</Typography.Title>
                <br/>
                <Search placeholder="input search text" onSearch={value => search(value)} enterButton  style={{ display:'block', width: '500px', marginLeft:'auto', marginRight:'auto', top:'80%' }} />
            </div>
            <br />
            <br />
            <Row gutter={16}>
                {renderCards}
            </Row>
        </motion.div>
    )
}

export default SearchPage;
