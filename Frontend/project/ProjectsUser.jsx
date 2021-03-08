import React from 'react'
import Navigation from '../Navigation.jsx';
import Pagination from '../Pagination.jsx';
import { BrowserRouter, Router, Switch, Route, Link } from 'react-router-dom';

const url = 'http://54.185.136.150:9000/project'
export default class ProjectsUser extends React.Component {
    constructor() {
        super()
        this.state = {
            pageOfItems: [],
            projects: [],
        };
        this.onChangePage = this.onChangePage.bind(this);
    }
    // FETCH
    fetchProject(username) {
        fetch(url + `/byUser/${username}`)
            .then(res => res.json())
            .then(json => this.setState({ projects: json })
            )
    }
    componentDidMount() {
        this.fetchProject(sessionStorage.getItem('state'))
    }
    // PAGINATION
    onChangePage(pageOfItems) {
        this.setState({ pageOfItems: pageOfItems });
    }
    // RELOAD
    reLoad() {
        fetch(url + `/byUser/${username}`)
            .then(res => res.json())
            .then(json => this.setState({ projects: json })
            )
    }
    // FORM INPUT
    handleChange(e) {
        let obj = {}
        obj[e.target.name] = e.target.value
        this.setState(obj)
    }
    //DELETE
    handleDelete(_id) {
        if (confirm('Do you want to delete this project?')) {
            fetch(url + `/${_id}`, {
                method: 'DELETE'
            })
                .then(res => this.fetchProject(sessionStorage.getItem('state')))
        }
    }
    //ADD & EDIT
    handleAdd() {
        let emp = {
            id: this.state.id,
            name: this.state.name,
            owner: this.state.owner,
            type: this.state.type,
            area: this.state.area,
            startYear: this.state.startYear,
            endYear: this.state.endYear,
            user: sessionStorage.getItem('state')
        }
        if (this.state._id === undefined || this.state._id === null || this.state._id === '') {
            fetch(url + `/byUser`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'post',
                body: JSON.stringify(emp)
            })
                .then(res => {
                    alert('New project have been added successfully.')
                    this.fetchProject(sessionStorage.getItem('state'))
                })
        }
        else {
            console.log(this.state._id)
            fetch(url + `/`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'put',
                body: JSON.stringify({
                    _id: this.state._id,
                    id: this.state.id,
                    name: this.state.name,
                    owner: this.state.owner,
                    type: this.state.type,
                    area: this.state.area,
                    startYear: this.state.startYear,
                    endYear: this.state.endYear,
                    user: sessionStorage.getItem('state')
                })
            })
                .then(res => {
                    alert('You project have been updated.')
                    this.fetchProject(sessionStorage.getItem('state'))
                })
        }
    }
    handleEdit(_id, id, name, owner, type, area, startYear, endYear) {
        this.setState({
            _id: _id,
            id: id,
            name: name,
            owner: owner,
            type: type,
            area: area,
            startYear: startYear,
            endYear: endYear,
            user: sessionStorage.getItem('state'),
        })
        $('#projectForm').collapse('show')
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }
    // RESET FORM
    handleNew() {
        this.setState({
            _id: '',
            id: '',
            name: '',
            owner: '',
            type: '',
            area: '',
            startYear: '',
            endYear: '',
            user: sessionStorage.getItem('state'),
        }
        )
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
                    <h1 style={{ color: '#C4B578' }}>Projects</h1>
                    <div class="row">
                        <div class="col">
                            <div class="project-form">
                                <div align="left">
                                    <a id="addbtn" class="btn" data-toggle='collapse' href='#projectForm' style={projectStyle.addbtn2} onMouseEnter={() => $('#addbtn').css(projectStyle.addbtn)} onMouseLeave={() => $('#addbtn').css(projectStyle.addbtn2)}>
                                        <i class='indicator fa fa-plus-circle'></i> Add new Project
							</a>
                                </div>
                                <div id='projectForm' class='card-body card-collapse collapse in' style={projectStyle.form}>
                                    <form>
                                        <label for="id">ID</label>
                                        <input type="text" name="id" id="id" class='form-control'
                                            value={this.state.id}
                                            onChange={this.handleChange.bind(this)} />

                                        <label for="name">Name</label>
                                        <input type="text" name="name" id="name" class='form-control'
                                            value={this.state.name}
                                            onChange={this.handleChange.bind(this)} />

                                        <label for="owner">Owner</label>
                                        <input type="text" name="owner" id="owner" class='form-control'
                                            value={this.state.owner}
                                            onChange={this.handleChange.bind(this)} />

                                        <label for="type">Direction</label>
                                        <select id="type" name="type" class="custom-select" value={this.state.type}
                                            onChange={this.handleChange.bind(this)}>
                                            <option value="" selected disabled>Please select</option>
                                            <option value="House">House</option>
                                            <option value="Land">Land</option>
                                            <option value="Apartment">Apartment</option>
                                        </select>
                                        <label for="area">Total area</label>
                                        <input type="text" name="area" id="area" class='form-control'
                                            value={this.state.area}
                                            onChange={this.handleChange.bind(this)} />
                                        <label for="startYear">Start Year</label>
                                        <input type="text" name="startYear" id="startYear" class='form-control'
                                            value={this.state.startYear}
                                            onChange={this.handleChange.bind(this)} />
                                        <label for="endYear">End Year</label>
                                        <input type="text" name="endYear" id="endYear" class='form-control'
                                            value={this.state.endYear}
                                            onChange={this.handleChange.bind(this)} />
                                        <br />
                                        <div>
                                            <a class="btn btn-success inline mr-1" style={projectStyle.btn2} role="button" href="#" onClick={this.handleAdd.bind(this)}>Add / Update</a>
                                            <a class="btn btn-info mr-1 inline" style={projectStyle.btn2} role="button" href="#" onClick={this.handleNew.bind(this)}>Reset Form</a>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
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
                                                <div class="col-5">
                                                    <p><b>ID: </b>{pj.id}</p>
                                                    <p><b>Owner: </b>{pj.owner}</p>
                                                    <p><b>Type: </b>{pj.type}</p>
                                                </div>
                                                <div class="col-5">
                                                    <p><b>Total area: </b>{pj.area} m²</p>
                                                    <p><b>Start year: </b>{pj.startYear}</p>
                                                    <p><b>End tear: </b>{pj.endYear}</p>
                                                </div>
                                                <div class="col-2">
                                               
                                            <button type="button" class="btn" data-toggle="popover" data-trigger="hover" data-placement="top" data-content="Edit" style={projectStyle.cardbtn}
                                                onClick={() => { this.handleEdit(pj._id, pj.id, pj.name, pj.owner, pj.type, pj.area, pj.startYear, pj.endYear) }}><i class='indicator fa fa-edit' ></i></button>
                                            <button type="button" class="btn" data-toggle="popover" data-trigger="hover" data-placement="top" data-content="Delete" style={projectStyle.cardbtn}
                                                onClick={this.handleDelete.bind(this, pj._id)}><i class='indicator fa fa-trash' ></i></button>

                       
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