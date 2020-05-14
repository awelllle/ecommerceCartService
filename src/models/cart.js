
'use strict';
const mongoose = require('mongoose'),
    Schema = mongoose.Schema;
let CartSchema = new Schema({
    
    name: String,
    price: Number,
    user: String,
   
    created: {type: Date, require:true, default: Date.now}
});

module.exports = mongoose.model('Cart', CartSchema);
