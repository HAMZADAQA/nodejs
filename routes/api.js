const express = require('express');
const router = express.Router();
const City = require('./modules/city');

//Get a list of cities from the db
// router.get('/cities', function(req,res,next){
    //Get a list of cities from the db
// router.get('/cities', function(req,res,next){
//     //  res.send({type:'GET'});
//     City.find({}).then(function(cities){
//         res.send(cities);
//     });
// });
router.get('/cities', (req, res, next) => {
    City.aggregate([
        {
            $geoNear: {
                near: { type: "Point", coordinates: [ parseFloat(req.query.lng) , parseFloat(req.query.lat) ] },
                maxDistance: 100000,
                distanceField: "distance",
                spherical: true
            }
        }
    ]).then(function(cities){
        res.send(cities);
    }).catch(next)
});

// Add a new cities to the db
router.post('/cities', function(req,res,next){
    City.create(req.body).then(function(city){
      res.send(city);
        // res.send({
        //     type:'POST',
        //     name: req.body.name,
        //     rank: req.body.rank
        // });
    }).catch(next);
   
});
// Update a city in the db
router.put('/cities/:id', function(req,res,next){
    City.findByIdAndUpdate({_id :req.params.id},req.body).then(function(){
        City.findOne({_id:req.params.id}).then(function(city){
            res.send(city);
        })
    });
});
// Delete a city from the db
router.delete('/cities/:id', function(req,res,next){
    console.log(req.params.id);
    City.findByIdAndRemove({_id : req.params.id}).then(function(city){
        res.send(city);
    });
    // res.send({type:'DELETE'});
});

module.exports = router;