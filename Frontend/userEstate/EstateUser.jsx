import React from 'react'
import Navigation from '../Navigation.jsx';
import EstateUserList from './EstateUserList.jsx';
import EstateUserGrid from './EstateUserGrid.jsx';
import { Link } from 'react-router-dom'
import '../myStyle.css'

export default class EstateUser extends React.Component {
    constructor() {
        super()
        this.state = {
            listView: true,
            gridView: false,
        }
    }
    displayList() {
        this.setState({
            listView: true,
            gridView: false
        })
        $('#listbtn').css(estateStyle.btn)
        $('#gridbtn').css(estateStyle.btn2)
        
        
    }
    displayGrid() {
        this.setState({
            listView: false,
            gridView: true
        })
        $('#listbtn').css(estateStyle.btn2)
        $('#gridbtn').css(estateStyle.btn)
    }

    render() {
        if (sessionStorage.getItem('state') === null || sessionStorage.getItem('state') === undefined) {
            return (
                <div>
                    <div id="login-req">
                         <div id="caption">
                        <h1>It looks like that you haven't log in yet.</h1>
                        <h2>Please click <Link to="/login">here</Link> to log in.</h2>
                        <br />
                        <p>___________</p>
                        <Link to="/" >
                        <button type="button" className="btn btn-primary">
                            Home Page
                        </button>
                    </Link>
                        <br /><br />
                    </div>
                    </div>
                   
                </div>
            )
        }
        else {
            return (
                <div>
                <Navigation />
                <div class="container">
                    <div class="row">
                        <div class="col">
                            <h1 style={estateStyle.h1}>Your Real Estate and Homes</h1>
                        </div>
                        <div class="col-4" style={{ textAlign: 'right',marginTop:'10px'} }>
                            View by:
                            <button id="listbtn" class="btn" style={estateStyle.btn} onClick={this.displayList.bind(this)}>
                                List <i class="fa fa-list"></i>
                            </button>
                            <button id="gridbtn" class="btn" style={estateStyle.btn2} onClick={this.displayGrid.bind(this)}>
                                Grid <i class="fa fa-th-large"></i>
                            </button>
                        </div>
                    </div>

                    <hr/>

                </div>
                {this.state.listView ? <EstateUserList /> : null}
                {this.state.gridView ? <EstateUserGrid /> : null}

            </div>

            )
        }
    }
}
const estateStyle = {
    cap: {
        position: 'absolute',
        left: '0',
        top: '20%',
        width: '100%',
        textAlign: 'center',
        color: '#000',
    },
    h1: {
        color: '#C4B578',
    },
    // btn: {
    //     padding: '5px',
    //     fontSize: '15px',
    //     display: 'block',
    //     marginLeft: 'auto',
    //     marginRight: 'auto',
    //     width: '70px',
    // },
    // btn2: {
    //     padding: '5px',
    //     fontSize: '18px',
    // },
    btn: {
        borderColor: '#819D92',
        width: '80px',
        textAlign: 'center',
        marginLeft: '10px',
        backgroundColor: '#819D92',
        color:'#fff'
    },
    btn2: {
        borderColor: '#A8A7A7',
        width: '80px',
        textAlign: 'center',
        marginLeft: '10px',
        backgroundColor: '#fff',
        color: '#A8A7A7'
    },   
}