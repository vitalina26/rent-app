const express = require('express')

const ApartmentCtrl = require('../controllers/apartments-ctrl')

const router = express.Router()

router.post('/apartments', ApartmentCtrl.createApartment)
router.put('/apartments/:id', ApartmentCtrl.updateApartment)
router.delete('/apartments/:id', ApartmentCtrl.deleteApartment)
router.get('/apartments/:id', ApartmentCtrl.getApartmentById)
router.get('/apartments', ApartmentCtrl.getApartments)

module.exports = router