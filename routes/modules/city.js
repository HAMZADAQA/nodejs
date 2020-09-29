const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// {GeoJSON is a format for encoding a variety of geographic data structures.
//     "type": "Feature",
//     "geometry": {
//       "type": "Point",
//       "coordinates": [125.6, 10.1]
//     },
//     "properties": {
//       "name": "Dinagat Islands"
//     }
//   }
 // create geolocation Schema
 const GeoSchema = new Schema({
     type: { 
        type: String, 
        default:'Point'
     },
     coordinates:{
         type: [Number],
         index: '2dsphere'
     }

 });   

 
//create city ninja Schema and model
const CitySchema = new Schema({
    name:{
        type: String,
        required: [true, 'Name field is required']
    },
    rank:{
        type: String,
    },
    avilable:{
        type: Boolean,
        default:false
    },
    geometry: GeoSchema
    // add in geo location
});

const City = mongoose.model('city', CitySchema);

module.exports = City;