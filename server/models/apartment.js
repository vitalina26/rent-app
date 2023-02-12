const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Apartment = new Schema(
    {
        id: { type: String, required: true, unique: true },
        rooms: {
            type: Number,
            validate: {
                validator: function (num) {
                    return num > 0;
                },
            }, required: true },
        name: { type: String,maxLength: 99, required: true },
        price: {
            type: Number,
            validate: {
                validator: function (num) {
                    return num > 0;
                },
            },
            required: true
        },
        description: { type: String, maxLength: 999, required: true },
    },
    
)

module.exports = mongoose.model('apartments', Apartment);