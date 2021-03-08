import React from 'react'
import Navigation from './Navigation.jsx';
import { BrowserRouter, Router, Switch, Route, Link } from 'react-router-dom';


export default class Home extends React.Component {
    render() {
        return (
            <div>
                <Navigation />

                <div class="container" id="main-content">
                    <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel" style={{ height: '500px' }}>
                        <ol className="carousel-indicators">
                            <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                            <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                            <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                        </ol>
                        <div className="carousel-inner">
                            <div className="carousel-item active" style={{ height: '500px' }}>
                                <Link to="/estate">
                                    <img className="d-block w-100" src="http://www.jtre.sk/sites/default/files/styles/full_screen_1920x1080_/public/2018-03/jtre-real-estate.jpg?itok=gs-1WKSg" style={{ height: "100vh", maxWidth: "100vw" }} alt="First slide" />
                                </Link>
                            </div>
                            <div className="carousel-item" style={{ height: '500px' }}>
                                <Link to="/estate">
                                    <img className="d-block w-100" src="https://images.dailyhive.com/20160919115313/Real-estate-in-Vancouver-Shutterstock.jpg" style={{ height: "100vh", width: "100vw" }} alt="Second slide" />
                                </Link>
                            </div>
                            <div className="carousel-item" style={{ height: '500px' }}>
                                <Link to="/estate">
                                    <img className="d-block w-100" src="http://realtyplusmag.com/wp-content/uploads/2017/01/indian-real-estate-market.jpg" style={{ height: "100vh", width: "100vw" }} alt="Third slide" />
                                </Link>
                            </div>
                        </div>
                        <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="sr-only">Previous</span>
                        </a>
                        <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="sr-only">Next</span>
                        </a>
                    </div>
                    <div class="jumbotron" style={{ backgroundColor: 'white', textAlign: 'center' }}>
                        <h1 style={homeStyle.h1}>Welcome to ForSale!</h1>
                        <h5>Looking for available real estates now.</h5>
                        <h5>Please <Link to="/login">Log in</Link> to upload your advertisement.</h5>
                    </div>



                </div>
            </div>

        )
    }
}

const homeStyle = {
    h1: {
        color: '#C4B578',
    },
    card: {
        border: 'white'
    },
    img: {
        width: '80%'
    },
    h5: {
        // color: '#7D94A1',
        paddingTop: '10px',
        textAlign: 'center'
    }
}