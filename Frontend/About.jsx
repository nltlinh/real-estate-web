import React from 'react'
import Navigation from './Navigation.jsx';

export default class About extends React.Component {
    render() {
        return (
            <div>
                <Navigation />
                <div class="container">
                <h1 style={aboutStyle.h1}>About</h1>
                <img src="https://i.ibb.co/gJy71xC/forsale2.png" alt="" style={aboutStyle.img}/>
                <div style={aboutStyle.text}>
                   <p><b>ForSale</b> is a simple platform looking for and selling available real estate and related projects.</p>
                </div>
                </div>
            </div>
        )
    }
}

const aboutStyle={
    h1:{
        color: '#C4B578',
    },
    img:{
        width: '300px',
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    text:{
        marginTop: '30px',
        fontSize: '18px',
        textAlign: 'center'
    }
}

