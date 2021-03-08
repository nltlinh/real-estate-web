import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class PageNotFound extends Component {
    render() {
        return (
            <div class="error">
                <div class="caption" style={myStyle.cap}>
                    <h1>404</h1>
                    <h2>Page not found</h2>
                    <br />
                    <p>Either something went wrong or the page does not exist.</p>
                    <p>You can click <Link to="/">here</Link> to go back to home page.</p>
                    <br /><br />
                </div>
            </div>

        )
    }
}

const myStyle = {
    cap: {
        position: 'absolute',
        left: '0',
        top: '20%',
        width: '100%',
        textAlign: 'center',
        color: '#000',
    }
}
