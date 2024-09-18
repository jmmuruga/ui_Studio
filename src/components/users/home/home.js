import React from 'react';
import './home.css';
import HeaderPage from '../header/header';

function HomePage() {
    return <>
        <HeaderPage />
        <div style={{ height: '1000px' }}>
            <p>Home Page !</p>
        </div>
    </>
}

export default HomePage;