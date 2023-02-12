const Apartment = require('../models/apartment')
const { v4: uuidv4 } = require('uuid')

let createApartment = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide an apartment',
        })
    }
    let apr = {id:uuidv4(),...body}
    const apartment = new Apartment(apr)

    if (!apartment) {
        return res.status(400).json({ success: false, error: err })
    }

    apartment
        .save()
        .then(() => {
            return res.status(201).json(apartment)
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Apartment  not created!',
            })
        })
}

let updateApartment = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Apartment.findOne({ id: req.params.id }, (err, apartment) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Apartment not found!',
            })
        }
        apartment.name = body.name
        apartment.rooms = body.rooms
        apartment.price = body.price
        apartment.description = body.description
        apartment
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: apartment.id,
                    message: 'apartment updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'apartment not updated!',
                })
            })
    })
}

let deleteApartment = async (req, res) => {
    await Apartment.findOneAndDelete({ id: req.params.id }, (err, apartment) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!apartment) {
            return res
                .status(404)
                .json({ success: false, error: `Apartment not found` })
        }

        return res.status(200).json({ success: true, data: apartment })
    }).catch(err => console.log(err))
}

let getApartmentById = async (req, res) => {
    await Apartment.findOne({ id: req.params.id }, (err, apartment) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!apartment) {
            return res
                .status(404)
                .json({ success: false, error: `apartment not found` })
        }
        return res.status(200).json({ success: true, data: apartment })
    }).catch(err => console.log(err))
}

let getApartments = async (req, res) => {
    let queryObj = {};
    let howToSort = 1;

    if (req.query.rooms) {
        queryObj.rooms = req.query.rooms;
    }
    if (req.query.price) {
      howToSort =  req.query.price === 'desc' ? -1 : 1
    }

    await Apartment.find(queryObj).sort({ 'price': howToSort }).exec((err, apartments) => {
        
        return res.status(200).json({ success: true, data: apartments })
    })
}

module.exports = {
    createApartment,
    updateApartment,
    deleteApartment,
    getApartments ,
    getApartmentById,
}