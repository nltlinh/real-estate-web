import React from 'react'
import { withRouter } from 'react-router';
import Navigation from './Navigation.jsx';
const url = 'http://54.185.136.150:9000/estate'
class DetailPage extends React.Component {
    constructor() {
        super()
        this.state = {
            estate: {},
        };
    }
    // FETCH
    fetchDetail() {
        fetch(url + `/${this.props.match.params._id}`)
            .then(res => res.json())
            .then(json => this.setState({ estate: json })
            )
    }
    componentDidMount() {
        this.fetchDetail()
    }

    render() {
        return (
            <div>
            <Navigation />
            <div class="container" >
                <h2 style={detailStyle.h2}>Estate Information</h2>
                <div class="row">
                    <div class="col-sm-6">
                        <div class="img-wrap" style={detailStyle.imgWrap}>
                            <img src={this.state.estate.imageUrl} alt={this.state.estate.title} class="img-responsive" style={detailStyle.img} />

                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div class="row">
                            <div class="col-sm-8">
                                <h3 style={detailStyle.name}>{this.state.estate.title}</h3>
                                <p style={{ color: 'grey' }}><i class='indicator fa fa-map-marker' ></i> {this.state.estate.street}, {this.state.estate.district}, {this.state.estate.city} </p>
                            </div>
                            <div class="col-sm-4">
                                <h4><i class='indicator fa fa-dollar' ></i> {this.state.estate.price}</h4>
                            </div>
                        </div>
                        <br/><br/>
                        <h5><b>Features </b></h5>
                        <hr />
                        <div class="row">
                            <div class="col-sm-6">
                                <p><b>Area: </b>{this.state.estate.area} Sqm.</p>
                                <p><b>Bedrooms: </b>{this.state.estate.bedrooms}</p>
                                <p><b>Floors: </b>{this.state.estate.floors}</p>
                            </div>
                            <div class="col-sm-6">
                                <p><b>Direction: </b>{this.state.estate.direction}</p>
                                <p><b>Address: </b>{this.state.estate.street}, {this.state.estate.district}, {this.state.estate.city}</p>
                                {/* <p><b>Floors: </b>{this.state.estate.floors}</p> */}
                            </div>
                        </div>
                        <br/>
                        <h5><b>Contact Information </b></h5>
                        <hr/>
                        <div class="row">
                            <div class="col-sm-6">
                            <p><b><i class='indicator fa fa-user' ></i> </b> {this.state.estate.name}</p>
                        <p><b><i class='indicator fa fa-phone' ></i> </b> {this.state.estate.phone}</p>
                            </div>
                            <div class="col-sm-6">
                            <p style={{ color: 'grey' }}>Post Date: {this.state.estate.postDate}</p>
                            <p style={{ color: 'grey' }}>Expired Date: {this.state.estate.expiredDate}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        )
    }
}
export default withRouter(DetailPage)

const detailStyle = {
    h2:{
        color: '#C4B578',
    }, 
    name: {
        color: '#AD4945',
    },
    text:{
        color: '#819D92',
    },
    imgWrap: {
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
        position: 'relative',
        width: '500px',
        height: '500px',
        overflow: 'hidden',
        backgroundColor: 'white',
        // paddingBottom: '10px',
    },
    img: {
        backgroundColor: 'white',
        width: 'auto',
        height: '100%',
        position: 'absolute',
        left: '50%',
        top: '50%',
        WebkitTransform: 'translate(-50%,-50%)',
        msTransform: 'translate(-50%,-50%)',
        transform: 'translate(-50%,-50%)'

    },
}