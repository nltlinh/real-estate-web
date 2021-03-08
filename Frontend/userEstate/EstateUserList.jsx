import React from 'react'
import DetailPage from '../DetailPage.jsx';
import Pagination from '../Pagination.jsx';

import { BrowserRouter, Router, Switch, Route, Link } from 'react-router-dom';

const url = 'http://54.185.136.150:9000/estate'

export default class EstateUserList extends React.Component {
    constructor() {
        super()
        this.state = {
            pageOfItems: [],
            estates: [],
        };
        this.onChangePage = this.onChangePage.bind(this);


    }
    // FETCH
    fetchEstate(username) {
        fetch(url + `/byUser/${username}`)
            .then(res => res.json())
            .then(json => this.setState({ estates: json })
            )
    }

    componentDidMount() {
        this.fetchEstate(sessionStorage.getItem('state'))
    }

    // FORM INPUT
    handleChange(e) {
        let obj = {}
        obj[e.target.name] = e.target.value
        this.setState(obj)
    }
    // PAGINATION
    onChangePage(pageOfItems) {
        this.setState({ pageOfItems: pageOfItems });
    }
    //DELETE
    handleDelete(_id) {
        if (confirm('Do you want to delete this advert?')) {
            fetch(url + `/${_id}`, {
                method: 'DELETE'
            })
                .then(res => this.fetchEstate(sessionStorage.getItem('state')))
        }
    }
    //ADD & EDIT
    handleAdd() {
        let emp = {
            title: this.state.title,
            price: this.state.price,
            area: this.state.area,
            bedrooms: this.state.bedrooms,
            floors: this.state.floors,
            direction: this.state.direction,
            name: this.state.name,
            phone: this.state.phone,
            street: this.state.street,
            district: this.state.district,
            city: this.state.city,
            postDate: this.state.postDate,
            expiredDate: this.state.expiredDate,
            imageUrl: this.state.imageUrl,
            user: sessionStorage.getItem('state')
        }
        if (this.state._id === undefined || this.state._id === null || this.state._id === '') {
            fetch(url +`/byUser`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'post',
                body: JSON.stringify(emp)
            })
                .then(res => {
                    alert('New advert have been added successfully.')
                    this.fetchEstate(sessionStorage.getItem('state'))
                })
        }
        else {
            console.log(this.state._id)
            fetch(url +`/`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'put',
                body: JSON.stringify({
                    _id: this.state._id,
                    title: this.state.title,
                    price: this.state.price,
                    area: this.state.area,
                    bedrooms: this.state.bedrooms,
                    floors: this.state.floors,
                    direction: this.state.direction,
                    name: this.state.name,
                    phone: this.state.phone,
                    street: this.state.street,
                    district: this.state.district,
                    city: this.state.city,
                    postDate: this.state.postDate,
                    expiredDate: this.state.expiredDate,
                    imageUrl: this.state.imageUrl,
                    user: sessionStorage.getItem('state')
                })
            })
                .then(res => {
                    alert('Your advert have been updated.')
                    this.fetchEstate(sessionStorage.getItem('state'))
                })
        }
    }
    handleFilterDirection(n){
        fetch(url + `/byUser/${sessionStorage.getItem('state')}`)
            .then(res => res.json())
            .then(json => {
                let data = json.filter(d => (d.direction == `${n}`))
                if (data.length == 0){
                    data = [{"title":"Not Found"}]
                };
                this.setState({ estates: data })      
            })
    }
    handleFilterPrice(min,max){
        fetch(url + `/byUser/${sessionStorage.getItem('state')}`)
            .then(res => res.json())
            .then(json => {
                let data = json.filter(d => (d.price > min) && (d.price <= max))
                if (data.length == 0){
                    data = [{"title":"Not Found"}]
                };
                this.setState({ estates: data })      
            })
    }
    handleFilterArea(min,max){
        fetch(url + `/byUser/${sessionStorage.getItem('state')}`)
            .then(res => res.json())
            .then(json => {
                let data = json.filter(d => (d.area > min) && (d.area <= max))
                if (data.length == 0){
                    data = [{"title":"Not Found"}]
                };
                this.setState({ estates: data })      
            })
    }
    handleFilterBedrooms(n){
        fetch(url + `/byUser/${sessionStorage.getItem('state')}`)
            .then(res => res.json())
            .then(json => {
                let data = json.filter(d => (d.bedrooms == n))
                if (data.length == 0){
                    data = [{"title":"Not Found"}]
                };
                this.setState({ estates: data })    
            })
    }
    handleFilterFloors(n){
        fetch(url + `/byUser/${sessionStorage.getItem('state')}`)
            .then(res => res.json())
            .then(json => {
                let data = json.filter(d => (d.floors == n))
                if (data.length == 0){
                    data = [{"title":"Not Found"}]
                };
                this.setState({ estates: data })    
            })
    }
    handleFilter(filter) {
        if (filter === 'ALL') {
            fetch(url + `/byUser/${sessionStorage.getItem('state')}`)
            .then(res => res.json())
            .then(json => this.setState({ estates: json })
            )
        }
        else if (filter === 'PRICE_1') {
            this.handleFilterPrice(0,100000)
        }
        else if (filter === 'PRICE_2') {
            this.handleFilterPrice(100000,200000)
        }
        else if (filter === 'PRICE_3') {
            this.handleFilterPrice(200000,300000)
        }
        else if (filter === 'PRICE_4') {
            this.handleFilterPrice(300000,400000)
        }
        else if (filter === 'PRICE_5') {
            this.handleFilterPrice(400000,100000000000000000)
        }
        else if (filter === 'BED_1') {
            this.handleFilterBedrooms(1)
        }
        else if (filter === 'BED_2') {
            this.handleFilterBedrooms(2)
        }
        else if (filter === 'BED_3') {
            fetch(url + `/byUser/${sessionStorage.getItem('state')}`)
            .then(res => res.json())
            .then(json => {
                let data = json.filter(d => (d.bedrooms >= 3)) 
                if (data.length == 0){
                    data = [{"title":"Not Found"}]
                };
                this.setState({ estates: data })  
            })
        }
        else if (filter === 'FLOOR_1') {
            this.handleFilterFloors(1)
        }
        else if (filter === 'FLOOR_2') {
            this.handleFilterFloors(2)
        }
        else if (filter === 'FLOOR_3') {
            fetch(url+ `/byUser/${sessionStorage.getItem('state')}`)
            .then(res => res.json())
            .then(json => {
                let data = json.filter(d => (d.floors >= 3)) 
                if (data.length == 0){
                    data = [{"title":"Not Found"}]
                };
                this.setState({ estates: data })  
            })
        }
        else if (filter === 'AREA_1') {
            this.handleFilterArea(0,100)
        }
        else if (filter === 'AREA_2') {
            this.handleFilterArea(100,200)
        }
        else if (filter === 'AREA_3') {
            this.handleFilterArea(200,300)
        }
        else if (filter === 'AREA_4') {
            this.handleFilterArea(300,1000000000000000)
        }
        else if (filter === 'N') {
            this.handleFilterDirection("North")
        }
        else if (filter === 'C') {
            this.handleFilterDirection("Central")
        }
        else if (filter === 'S') {
            this.handleFilterDirection("South")
        }

    }
    handleSort(e) {
        var choice = e.target.value
        console.log(choice)
        if (choice === 'ALL') {
            this.fetchEstate()
        }
        else if (choice === 'LO2HI') {
            let data = this.state.estates.filter(d => !(d.title == null)).sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
            this.setState({ estates: data })
        }
        else if (choice === 'HI2LO') {
            let data = this.state.estates.filter(d => !(d.title == null)).sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
            this.setState({ estates: data })
        }
        else if (choice === 'S2L') {
            let data = this.state.estates.filter(d => !(d.title == null)).sort((a, b) => parseFloat(a.area) - parseFloat(b.area));
            this.setState({ estates: data })
        }
        else if (choice === 'L2S') {
            let data = this.state.estates.filter(d => !(d.title == null)).sort((a, b) => parseFloat(b.area) - parseFloat(a.area));
            this.setState({ estates: data })
        }
    }
    // EDIT
    handleEdit(_id, title, price, area, bedrooms, floors, direction, name, phone, street, district, city, postDate, expiredDate, imageUrl) {
        this.setState({
            _id: _id,
            title: title,
            price: price,
            area: area,
            bedrooms: bedrooms,
            floors: floors,
            direction: direction,
            name: name,
            phone: phone,
            street: street,
            district: district,
            city: city,
            postDate: postDate,
            expiredDate: expiredDate,
            imageUrl: imageUrl,
            user: sessionStorage.getItem('state'),
        })
        $('#estateForm').collapse('show')
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }
    // RESET FORM
    handleNew() {
        this.setState({
            _id: '',
            title: '',
            price: '',
            area: '',
            bedrooms: '',
            floors: '',
            direction: '',
            name: '',
            phone: '',
            street: '',
            district: '',
            city: '',
            postDate: '',
            expiredDate: '',
            imageUrl: '',
            user: sessionStorage.getItem('state'),
        }
        )
    }
    
    //SEARCH
    handleSearch(e) {
        let obj = {}
        obj[e.target.name] = e.target.value
        this.setState(obj)
        var lowerKeyword = this.state.keyword.toLowerCase()
        if (e.target.value === null) {
            fetch(url + `/byUser/${sessionStorage.getItem('state')}`)
                .then(res => res.json())
                .then(json => this.setState({ estates: json })
                )
        }
        fetch(url + `/byUser/${sessionStorage.getItem('state')}`)
            .then(res => res.json())
            .then(json => {
                let data = json.filter(d => d.title.toLowerCase().indexOf(lowerKeyword) !== -1)
                this.setState({ estates: data })
            })
    }
    // RELOAD
    reLoad() {
        fetch(url + `/byUser/${sessionStorage.getItem('state')}`)
            .then(res => res.json())
            .then(json => this.setState({ estates: json })
            )
    }
    render() {
        return (
            <div class="container" onLoad={() => $('[data-toggle="popover"]').popover()}>
                <div class="row">
                    <div class="col"></div>
                    <div class="col-6">
                        {/* FORM */}
                        <div class="estate-form">
                            <div align="left">
                                <a id="addbtn" class="btn" data-toggle='collapse' href='#estateForm' style={estateStyle.addbtn2} onMouseEnter={() => $('#addbtn').css(estateStyle.addbtn)} onMouseLeave={() => $('#addbtn').css(estateStyle.addbtn2)}>
                                    <i class='indicator fa fa-plus-circle'></i> Add new advert
							</a>
                            </div>
                            <div id='estateForm' class='card-body card-collapse collapse in' style={estateStyle.form}>
                                <form>
                                    <label for="title">Title</label>
                                    <input type="text" name="title" id="title" class='form-control'
                                        value={this.state.title}
                                        onChange={this.handleChange.bind(this)} />
                                    <label for="price">Price ($)</label>
                                    <input type="text" name="price" id="price" class='form-control'
                                        value={this.state.price}
                                        onChange={this.handleChange.bind(this)} />
                                    <label for="area">Total Area (Sqm.)</label>
                                    <input type="text" name="area" id="area" class='form-control'
                                        value={this.state.area}
                                        onChange={this.handleChange.bind(this)} />
                                    <label for="bedrooms">Number of bedrooms</label>
                                    <input type="number" name="bedrooms" id="bedrooms" class='form-control'
                                        value={this.state.bedrooms}
                                        onChange={this.handleChange.bind(this)} />
                                    <label for="floors">Number of floors</label>
                                    <input type="number" name="floors" id="floors" class='form-control'
                                        value={this.state.floors}
                                        onChange={this.handleChange.bind(this)} />
                                    <label for="direction">Direction</label>
                                    <select id="direction" name="direction" class="custom-select" value={this.state.direction}
                                        onChange={this.handleChange.bind(this)}>
                                        <option value="" selected disabled>Please select</option>
                                        <option value="North">North</option>
                                        <option value="Central">Central</option>
                                        <option value="South">South</option>
                                    </select>
                                    <label for="address" >Address </label>
                                    <div class="input-group">
                                        <input type="text" name="street" id="street" class='form-control'
                                            value={this.state.street}
                                            onChange={this.handleChange.bind(this)} placeholder="Street" />
                                        <input type="text" name="district" id="district" class='form-control'
                                            value={this.state.district}
                                            onChange={this.handleChange.bind(this)} placeholder="District" />
                                        <input type="text" name="city" id="city" class='form-control'
                                            value={this.state.city}
                                            onChange={this.handleChange.bind(this)} placeholder="City" />
                                    </div>
                                    <label for="contactInfo" >Contact Information </label>
                                    <div class="input-group">
                                        <input type="text" name="name" id="name" class='form-control'
                                            value={this.state.name}
                                            onChange={this.handleChange.bind(this)} placeholder="Name" />
                                        <input type="text" name="phone" id="phone" class='form-control'
                                            value={this.state.phone}
                                            onChange={this.handleChange.bind(this)} placeholder="Phone" />
                                    </div>
                                    <label for="postDate">Post Date</label>
                                    <input type="date" name="postDate" id="postDate" class='form-control'
                                        value={this.state.postDate}
                                        onChange={this.handleChange.bind(this)} />
                                    <label for="expiredDate">Expired Date</label>
                                    <input type="date" name="expiredDate" id="expiredDate" class='form-control'
                                        value={this.state.expiredDate}
                                        onChange={this.handleChange.bind(this)} />
                                    <label for="imageUrl">Image Link:</label>
                                    <input type="text" name="imageUrl" id="imageUrl" class='form-control' placeholder="http://example.com/image"
                                        value={this.state.imageUrl}
                                        onChange={this.handleChange.bind(this)} />
                                    <br />
                                    <div>
                                        <a class="btn btn-success inline mr-1" style={estateStyle.btn2} role="button" href="#" onClick={this.handleAdd.bind(this)}>Add / Update</a>
                                        <a class="btn btn-info mr-1 inline" style={estateStyle.btn2} role="button" href="#" onClick={this.handleNew.bind(this)}>Reset Form</a>
                                    </div>
                                </form>
                            </div>
                        </div>
                        {/* SORT */}
                    </div>
                    <div class="col-3">
                        <select id="sort" name="sort" class="custom-select" data-toggle="popover" data-trigger="hover" data-placement="left" data-content="Sort" onMouseEnter={()=>$('[data-toggle="popover"]').popover()} onChange={this.handleSort.bind(this)}>
                            <option value="ALL">All</option>
                            <option value="LO2HI">Price: Low to High</option>
                            <option value="HI2LO">Price: High to Low</option>
                            <option value="S2L">Area: Small to Large</option>
                            <option value="L2S">Area: Large to Small</option>
                        </select>
                    </div>
                </div>
                <div class="row">
                    {/* FILTER */}
                    <div class="col-3">
                        <h3 style={{ color: 'white' }}>Filter</h3>
                        <div class="card">
                            <div class="input-group" style={{ marginTop: '20px' }}>
                                <button class="form-button btn"><i style={{ color: '#679D7D' }} class="fa fa-search"></i></button>
                                <input type="text" name="search" id="search" class='form-control' name="keyword" style={{ marginRight: '20px' }} placeholder="Search"
                                    value={this.state.keyword}
                                    onChange={this.handleSearch.bind(this)} />
                            </div>
                            <hr />
                            <div>
                                <h6 style={estateStyle.fitertext}>DIRECTION:</h6>
                                <button class="btn btn-link" style={estateStyle.btn} onClick={() => this.handleFilter('N')}>North</button>
                                <button class="btn btn-link" style={estateStyle.btn} onClick={() => this.handleFilter('C')}>Central</button>
                                <button class="btn btn-link" style={estateStyle.btn} onClick={() => this.handleFilter('S')}>South</button>
                            </div>
                            <hr />
                            <div>
                                <h6>
                                    <a data-toggle='collapse' href='#byPrice' style={estateStyle.fitertext}>
                                        <i class='indicator fa fa-caret-down'></i> Price
							            </a>
                                </h6>
                                <div id='byPrice' class='card-collapse collapse in' >
                                    <button class="btn btn-link" style={estateStyle.btn} onClick={() => this.handleFilter('ALL')}>All</button>
                                    <button class="btn btn-link" style={estateStyle.btn} onClick={() => this.handleFilter('PRICE_1')}>Under 100 000$</button>
                                    <button class="btn btn-link" style={estateStyle.btn} onClick={() => this.handleFilter('PRICE_2')}>100 000$ - 200 000$</button>
                                    <button class="btn btn-link" style={estateStyle.btn} onClick={() => this.handleFilter('PRICE_3')}>200 000$ - 300 000$</button>
                                    <button class="btn btn-link" style={estateStyle.btn} onClick={() => this.handleFilter('PRICE_4')}>300 000$ - 400 000$</button>
                                    <button class="btn btn-link" style={estateStyle.btn} onClick={() => this.handleFilter('PRICE_5')}>Over 400 000$</button>
                                </div>
                            </div>
                            <hr />
                            <div>
                                <h6>
                                    <a data-toggle='collapse' href='#byArea' style={estateStyle.fitertext}>
                                        <i class='indicator fa fa-caret-down'></i> Area
							            </a>
                                </h6>
                                <div id='byArea' class='card-collapse collapse in' >
                                    <button class="btn btn-link" style={estateStyle.btn} onClick={() => this.handleFilter('ALL')}>All</button>
                                    <button class="btn btn-link" style={estateStyle.btn} onClick={() => this.handleFilter('AREA_1')}>Under 100 m²</button>
                                    <button class="btn btn-link" style={estateStyle.btn} onClick={() => this.handleFilter('AREA_2')}>100 m² - 200 m²</button>
                                    <button class="btn btn-link" style={estateStyle.btn} onClick={() => this.handleFilter('AREA_3')}>200 m² - 300m²</button>
                                    <button class="btn btn-link" style={estateStyle.btn} onClick={() => this.handleFilter('AREA_4')}>Over 300m²</button>
                                </div>
                            </div>
                            <hr />
                            <div>
                                <h6>
                                    <a data-toggle='collapse' href='#byBed' style={estateStyle.fitertext}>
                                        <i class='indicator fa fa-caret-down'></i> Bedrooms
							            </a>
                                </h6>
                                <div id='byBed' class='card-collapse collapse in' >
                                    <button class="btn btn-link" style={estateStyle.btn} onClick={() => this.handleFilter('ALL')}>All</button>
                                    <button class="btn btn-link" style={estateStyle.btn} onClick={() => this.handleFilter('BED_1')}>1</button>
                                    <button class="btn btn-link" style={estateStyle.btn} onClick={() => this.handleFilter('BED_2')}>2</button>
                                    <button class="btn btn-link" style={estateStyle.btn} onClick={() => this.handleFilter('BED_3')}>3 or Higher</button>
                                </div>
                            </div>
                            <hr />
                            <div>
                                <h6>
                                    <a data-toggle='collapse' href='#byFloor' style={estateStyle.fitertext}>
                                        <i class='indicator fa fa-caret-down'></i> Floors
							            </a>
                                </h6>
                                <div id='byFloor' class='card-collapse collapse in' >
                                    <button class="btn btn-link" style={estateStyle.btn} onClick={() => this.handleFilter('ALL')}>All</button>
                                    <button class="btn btn-link" style={estateStyle.btn} onClick={() => this.handleFilter('FLOOR_1')}>1</button>
                                    <button class="btn btn-link" style={estateStyle.btn} onClick={() => this.handleFilter('FLOOR_2')}>2</button>
                                    <button class="btn btn-link" style={estateStyle.btn} onClick={() => this.handleFilter('FLOOR_3')}>3 or Higher</button>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div class="col-9">
                        <div align="right"><button class="btn" onClick={this.reLoad.bind(this)} data-toggle="popover" data-trigger="hover" data-placement="left" data-content="Reload Page"><i style={estateStyle.reloadbtn} class="fa fa-undo"></i></button></div>
                        {this.state.pageOfItems.map((estate, i) =>
                            <div key={i} id="estatecard" class="card" style={estateStyle.card}>
                                <div class="row" style={{ margin: '10px' }}>
                                    <div class="col-4">
                                        <div style={estateStyle.imgContain}>
                                            <img src={estate.imageUrl} alt="" style={estateStyle.img} />
                                        </div>
                                    </div>
                                    <div class="col-7">
                                        <div class="eName" style={{ color: '#AD4945' }}><h4>{estate.title}</h4></div>
                                        <div class="ePrice"><h5><i class='indicator fa fa-dollar' ></i> {estate.price}</h5></div>
                                        <div class="eAddress"><b><i class='indicator fa fa-map-marker' ></i> {estate.street}, {estate.district}, {estate.city} </b></div>
                                        <div class="eInfo" style={{ color: '#5E5E5E' }}>{estate.area} m² | {estate.bedrooms} bedrooms | {estate.floors} floors </div>
                                        <br />
                                        <div style={{ textAlign: 'right' }}>  <Link to={`DetailPage/${estate._id}`}><button class="btn stretched-link" style={{ color: '#679D7D' }}>View more <i class='indicator fa fa-caret-right'></i></button></Link></div>
                                    </div>
                                    <div class="col-1">
                                        <button type="button" class="btn" data-toggle="popover" data-trigger="hover" data-placement="top" data-content="Edit" style={estateStyle.cardbtn}
                                            onClick={() => { this.handleEdit(estate._id, estate.title, estate.price, estate.area, estate.bedrooms, estate.floors, estate.direction, estate.name, estate.phone, estate.street, estate.district, estate.city, estate.postDate, estate.expiredDate, estate.imageUrl) }}><i class='indicator fa fa-edit' ></i></button>
                                        <button type="button" class="btn" data-toggle="popover" data-trigger="hover" data-placement="top" data-content="Delete" style={estateStyle.cardbtn}
                                            onClick={this.handleDelete.bind(this, estate._id)}><i class='indicator fa fa-trash' ></i></button>
                                    </div>
                                </div>
                            </div>
                        )}
                        <Pagination items={this.state.estates} onChangePage={this.onChangePage} />
                    </div>
                </div>
            </div>
        )
    }
}

const estateStyle = {
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