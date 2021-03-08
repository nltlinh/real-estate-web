import React from 'react'
import Navigation from './Navigation.jsx';

export default class Category extends React.Component {

    render() {
        return (
            <div>
                <Navigation />
            <div class="container">
            
                This is category.
            </div>
            </div>
            
        )
    }
}
const typeStyle = {
    btn: {
        padding: '5px',
        fontSize: '15px',
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '70px',
    },
    cardTitle1: {
        display: 'block',
        color: '#5D85A3',
        textTransform: 'capitalize',
        fontWeight: 'bold'
    },
}