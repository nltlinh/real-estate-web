import React from 'react'
import Navigation from '../Navigation.jsx';
import Pagination from '../Pagination.jsx';
import { BrowserRouter, Router, Switch, Route, Link } from 'react-router-dom';


const url = 'http://54.185.136.150:9000/project'
export default class ProjectGeneral extends React.Component {
    constructor() {
        super()
        this.state = {
            pageOfItems: [],
            projects: [],
        };
        this.onChangePage = this.onChangePage.bind(this);
    }
    // FETCH
    fetchProject() {
        fetch(url)
            .then(res => res.json())
            .then(json => this.setState({ projects: json })
            )
    }
    componentDidMount() {
        this.fetchProject()
    }
    // PAGINATION
    onChangePage(pageOfItems) {
        this.setState({ pageOfItems: pageOfItems });
    }
    // RELOAD
    reLoad() {
        fetch(url)
            .then(res => res.json())
            .then(json => this.setState({ projects: json })
            )
    }
    render() {
        return (
            <div>
                <Navigation />
                <div class="container">
                    <h1 style={{ color: '#C4B578' }}>Projects</h1>
                    <div class="row">
                        <div class="col"></div>
                        <div class="col-1"><div align="right"><button class="btn" onClick={this.reLoad.bind(this)} data-toggle="popover" data-trigger="hover" data-placement="left" data-content="Reload Page"><i style={projectStyle.reloadbtn} class="fa fa-undo"></i></button></div></div>
                    </div>
                    <div class="row">
                        {this.state.pageOfItems.map((pj, i) =>
                            <div key={i} class="col-6">
                                <div id="pjcard" class="card" style={projectStyle.card}>
                                    <div style={{ margin: '20px' }}>
                                        <div >
                                            <div style={{ color: '#AD4945' }}><h4>{pj.name}</h4></div>
                                            <div class="row">
                                                <div class="col-6">
                                                    <p><b>ID: </b>{pj.id}</p>
                                                    <p><b>Owner: </b>{pj.owner}</p>
                                                    <p><b>Type: </b>{pj.type}</p>
                                                </div>
                                                <div class="col-6">
                                                    <p><b>Total area: </b>{pj.area} m²</p>
                                                    <p><b>Start year: </b>{pj.startYear}</p>
                                                    <p><b>End tear: </b>{pj.endYear}</p>
                                                </div>

                                            </div>


                                        </div>
                                    </div>
                                </div>
                            </div>

                        )}
                    </div>
                    <Pagination items={this.state.projects} onChangePage={this.onChangePage} />
                </div>
            </div>
        )
    }
}

const projectStyle = {
    form: {
        fontWeight: 'bold',
        border: '1px solid #819D92'
    },
    card: {
        height: '200px',
        marginBottom: '10px',
        borderRadius: '1',
        boxShadow: '0 1px 3px -1px #A8A7A7'
    },
    view: {
        textAlign: 'right',
        color: '#679D7D',
    },
    imgContain: {
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
        position: 'relative',
        width: '240px',
        height: '180px',
        overflow: 'hidden',
        backgroundColor: 'white',
        color: '#A8A7A7',
        textAlign: 'center',

    },
    img: {
        // width: '100%',
        // height: 'auto',
        backgroundColor: 'white',
        width: 'auto',
        height: '100%',
        verticalAlign: 'middle',
        position: 'absolute',
        left: '50%',
        top: '50%',
        WebkitTransform: 'translate(-50%,-50%)',
        msTransform: 'translate(-50%,-50%)',
        transform: 'translate(-50%,-50%)'

    },
    cardbtn: {
        // color: '#C4B578',
        color: '#A8A7A7',
        padding: '5px',
        fontSize: '20px',
        // color:'#000',
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
        // width: '70px',
    },
    btn1: {
        padding: '5px',
        marginLeft: 'auto',
        marginRight: 'auto',
        fontSize: '15px',
        width: '120px'
    },
    addbtn2: {
        borderColor: '#819D92',
        backgroundColor: '#819D92',
        color: '#fff',
        borderRadius: '0',
    },
    addbtn: {
        borderColor: '#819D92',
        backgroundColor: '#FFF',
        color: '#819D92',
        borderRadius: '0',
    },
    fitertext: {
        color: '#AD5945',
        marginLeft: '20px'
    },
    btn: {
        color: '#000',
        display: 'block',
        marginLeft: '20px',
    },
    reloadbtn: {
        color: '#C4B578',
        fontSize: '20px',
        margin: '4px',
    },

}