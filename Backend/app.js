//import libraries
var express = require('express');
var bodyParser = require('body-parser');
var mongo = require('mongodb');
var monk = require('monk');

//create neccessary objects
var app = express();
var router = express.Router();

//you need to update wp with your own database name
var db = monk('localhost:27017/wp');

const logger = function (req, res, next) {
  console.log('Logged' + new Date())
  next()
}
app.use(logger)
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
})

//use objects in app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req, res, next) {
  req.db = db;
  next();
});

//CLIENT SIDE ROUTING
app.set('views', __dirname + '/views');

app.get('/home', function (req, res) {
  res.render('home.ejs');

});



//SERVER SIDE ROUTING
app.use('/', router);

// ESTATE 
// General
router.get('/estate', function (req, res) {
  req.db.collection('estate').find({}, { "limit": 100 }, function (e, docs) {
    res.json(docs);
  });
});
router.get('/estate/:id', function (req, res) {
  req.db.collection('estate').findOne({ _id: req.params.id }, function (e, doc) {
    res.json(doc);
  })
});
router.delete('/estate/:id', function (req, res) {
  req.db.collection('estate').remove({ _id: req.params.id }, function (e, doc) {
    res.json(doc);
  })
});

// By user
router.get('/estate/byUser/:username', function (req, res) {
  req.db.collection('estate').find({ user: req.params.username }, { "limit": 100000000 }, function (e, docs) {
    if (docs.length == 0) {
      console.log(null)
    }
    else {
      res.json(docs)
    }
  })
})
router.post('/estate/byUser', function (req, res) {
  if (req.body.user) {
    req.db.collection('estate').insert({
      title: req.body.title,
      price: req.body.price,
      area: req.body.area,
      bedrooms: req.body.bedrooms,
      floors: req.body.floors,
      direction: req.body.direction,
      name: req.body.name,
      phone: req.body.phone,
      street: req.body.street,
      district: req.body.district,
      city: req.body.city,
      postDate: req.body.postDate,
      expiredDate: req.body.expiredDate,
      imageUrl: req.body.imageUrl,
      user: req.body.user,
    }, function (e, docs) { res.json(docs) })
  }
  else { res.json("Unauthorized access") }
});
router.put('/estate/', function (req, res) {
  if (req.body.user) {
    req.db.collection('estate').update({ _id: req.body._id }, {
      title: req.body.title,
      price: req.body.price,
      area: req.body.area,
      bedrooms: req.body.bedrooms,
      floors: req.body.floors,
      direction: req.body.direction,
      name: req.body.name,
      phone: req.body.phone,
      street: req.body.street,
      district: req.body.district,
      city: req.body.city,
      postDate: req.body.postDate,
      expiredDate: req.body.expiredDate,
      imageUrl: req.body.imageUrl,
      user: req.body.user,
    });

    req.db.collection('estate').findOne({ _id: req.body._id }, function (e, doc) {
      res.json(doc);
    })
  }
  else {
    res.json("Unauthorized access")
  }
});

// PROJECTS
// General
router.get('/project', function (req, res) {
  req.db.collection('project').find({}, { "limit": 100 }, function (e, docs) {
    res.json(docs);
  });
});
router.get('/project/:id', function (req, res) {
  req.db.collection('project').findOne({ _id: req.params.id }, function (e, doc) {
    res.json(doc);
  })
});
router.delete('/project/:id', function (req, res) {
  req.db.collection('project').remove({ _id: req.params.id }, function (e, doc) {
    res.json(doc);
  })
});
// By user
router.get('/project/byUser/:username', function (req, res) {
  req.db.collection('project').find({ user: req.params.username }, { "limit": 100000000 }, function (e, docs) {
    if (docs.length == 0) {
      console.log(null)
    }
    else {
      res.json(docs)
    }
  })
})
router.post('/project/byUser', function (req, res) {
  if (req.body.user) {
    req.db.collection('project').insert({
      id: req.body.id,
      name: req.body.name,
      owner: req.body.owner,
      type: req.body.type,
      area: req.body.area,
      startYear: req.body.startYear,
      endYear: req.body.endYear,
      user: req.body.user
    }, function (e, docs) { res.json(docs) })
  }
  else {
    res.json("Unauthorized access")
  }
})
router.put('/project/', function (req, res) {
  if (req.body.user) {
    req.db.collection('project').update({ _id: req.body._id }, {
      id: req.body.id,
      name: req.body.name,
      owner: req.body.owner,
      type: req.body.type,
      area: req.body.area,
      startYear: req.body.startYear,
      endYear: req.body.endYear,
      user: req.body.user
    });

    req.db.collection('project').findOne({ _id: req.body._id }, function (e, doc) {
      res.json(doc);
    })
  }
  else { res.json("Unauthorized access") }
})

// LOGIN and REGISTER
app.post('/register', function (req, res) {
  req.db.collection('users').find({ username: req.body.username }, function (e, docs) {
    if (docs.length === 0) {
      req.db.collection('users').insert(req.body, function (e, docs) {
        res.json({ "registration": "successful" })
      })
    }
    else {
      res.json({ "registration": "failed" })
    }
  })
})

app.post('/login', function (req, res) {
  req.db.collection('users').find({ username: req.body.username, password: req.body.password }, function (err, docs) {
    if (docs.length == 0) {
      res.json({ "authorize": "false" })
    }
    else {
      res.json({ "authorize": "true" })
    }
  })
})

module.exports = app;
app.listen(8080);
