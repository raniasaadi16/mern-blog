import React from 'react';
import TopBar from '../components/TopBar';
import PostSlide from '../components/PostSlide';
import Posts from '../components/Posts';

export default function Home() {
    return (
        <div>
            <TopBar/>
            <PostSlide/>
            <Posts/>
        </div>
    )
}
