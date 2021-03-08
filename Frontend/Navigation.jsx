import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Navigation extends Component {
    constructor(props) {
        super(props)
        this.state = {}
        this.signOut = this.signOut.bind(this)
    }

    signOut() {
        if (confirm('Do you want to log out')) {
        sessionStorage.clear()
        }
    }
    render() {
        return (
            <div class="container">
                <nav className="navbar navbar-expand-lg">
                    <a class="navbar-brand lg-brand" href={'/'}>
                        <img src="https://i.ibb.co/gJy71xC/forsale2.png" alt="logo" style={myStyle.brandImg} />
                    </a>
                    <ul className="navbar-nav mr-auto">
                        <li style={myStyle.navItem}><Link to={'/'} id="navlink1" className="nav-link" style={myStyle.navLink} onMouseEnter={() => $('#navlink1').css(myStyle.navLink2)} onMouseLeave={() => $('#navlink1').css(myStyle.navLink)}>HOME</Link></li>
                        {/* <li style={myStyle.navItem}><Link to={'/estate'} id="navlink2" className="nav-link" style={myStyle.navLink} onMouseEnter={()=>$('#navlink2').css(myStyle.navLink2)} onMouseLeave={()=>$('#navlink2').css(myStyle.navLink)}>ESTATE</Link></li> */}
                        <li class="nav-item dropdown" style={myStyle.navItem}>
                            <a style={myStyle.navLink} class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                BUY
                            </a>
                            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                                <Link to={'/estate'} id="navlink2" className="nav-link" style={myStyle.navLink3} onMouseEnter={() => $('#navlink2').css(myStyle.navLink2)} onMouseLeave={() => $('#navlink2').css(myStyle.navLink3)}>ESTATES</Link>
                                <Link to={'/projectgeneral'} id="navlink3" className="nav-link" style={myStyle.navLink3} onMouseEnter={() => $('#navlink3').css(myStyle.navLink2)} onMouseLeave={() => $('#navlink3').css(myStyle.navLink3)}>PROJECTS</Link>
                            </div>
                        </li>
                        <li class="nav-item dropdown" style={myStyle.navItem}>
                            <a style={myStyle.navLink} class="nav-link dropdown-toggle" href="#" id="navbarDropdown2" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                SELL
                            </a>
                            <div class="dropdown-menu" aria-labelledby="navbarDropdown2">
                                <Link to={'/estateuser'} id="navlink5" className="nav-link" style={myStyle.navLink3} onMouseEnter={() => $('#navlink5').css(myStyle.navLink2)} onMouseLeave={() => $('#navlink5').css(myStyle.navLink3)}>ESTATES</Link>
                                <Link to={'/projectuser'} id="navlink6" className="nav-link" style={myStyle.navLink3} onMouseEnter={() => $('#navlink6').css(myStyle.navLink2)} onMouseLeave={() => $('#navlink6').css(myStyle.navLink3)}>PROJECTS</Link>
                            </div>
                        </li>
                        <li style={myStyle.navItem}><Link to={'/about'} id="navlink4" className="nav-link" style={myStyle.navLink} onMouseEnter={() => $('#navlink4').css(myStyle.navLink2)} onMouseLeave={() => $('#navlink4').css(myStyle.navLink)}>ABOUT</Link></li>

                    </ul>
                    <div className='form-inline mt-md-0 mt-2'>
                            {sessionStorage.getItem('state') ?
                                <div>
                                    <span style={{ color: "grey" }}><i class="fa fa-user-circle-o"></i> {sessionStorage.getItem('state')} </span> 
                                    <Link to="/"><button className="btn" onClick={this.signOut} style={myStyle.btn}>Log out</button></Link>
                                    </div>
                                : <div>
                                    <Link to="/login"><button class="btn" style={{ color: "#fff" , backgroundColor:'#C4B578'}}>Log in</button></Link>
                                </div>
                            }
                        </div>
                </nav>
                <hr />
            </div>
        )
    }
}
const myStyle = {
    brandImg: {
        width: '100px',
        maxWidth: '100%',
        height: 'auto',
        float: 'left',
        display: 'block',
        objectFit: 'cover',
    },
    navItem: {
        padding: '15px 20px',
        display: 'block',
    },
    navLink: {
        color: '#52645d'
    },
    navLink2: {
        color: '#C4B578'
    },
    navLink3: {
        marginLeft: '5px',
        color: '#52645d'
    },
    btn:{
        color: '#C4B578',
        borderColor: '#C4B578',
        fontSize:'15px',
        marginLeft:'10px',
    }
}