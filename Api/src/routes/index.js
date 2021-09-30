const { Router } = require ('express')

const petsRouter = require('./sub-routes/pets')
const shelterRouter = require ('./sub-routes/shelters')
const eventsRouter = require ('./sub-routes/events')
const lostPetsRouter = require ('./sub-routes/lost_pets')
const formsRouter = require ('./sub-routes/forms')
const userRouter = require ('./sub-routes/user')
const photosRouter = require ('./sub-routes/photos')
const locationRouter = require ('./sub-routes/locations')
const citiesRouter = require ('./sub-routes/cities')
const provincesRouter = require ('./sub-routes/provinces')
const countriesRouter = require ('./sub-routes/countries')

const router = Router()

router.use('/pets', petsRouter)
router.use('/shelters', shelterRouter)
router.use('/events', eventsRouter)
router.use('/lostpets', lostPetsRouter)
router.use('/forms', formsRouter)
router.use('/users', userRouter)
router.use('/photos', photosRouter)
router.use('/locations', locationRouter)
/* router.use('/cities', citiesRouter) */
router.use('/provinces', provincesRouter)
router.use('/countries', countriesRouter)


module.exports = router;