const { Router } = require ('express')

const petsRouter = require('./controllers/pets')
const eventsRouter = require ('./controllers/events')
const userRouter = require ('./controllers/user')
const lostPetsRouter = require ('./controllers/lost_pets')
const formsRouter = require ('./controllers/forms')
const photosRouter = require ('./controllers/photos')
const locationRouter = require ('./controllers/locations')
const loginRouter = require('./controllers/login')
const citiesRouter = require ('./controllers/cities')
const provincesRouter = require ('./controllers/provinces')
const countriesRouter = require ('./controllers/countries')
const mailRouter = require ('./controllers/mailPostPetAdop')

const router = Router()

router.use('/pets', petsRouter)
router.use('/events', eventsRouter)
router.use('/users', userRouter)

router.use('/lostpets', lostPetsRouter)
router.use('/forms', formsRouter)
router.use('/photos', photosRouter)
router.use('/locations', locationRouter)
router.use('/login', loginRouter)
router.use('/cities', citiesRouter)
router.use('/provinces', provincesRouter)
router.use('/countries', countriesRouter)
router.use('/sendmail', mailRouter)


module.exports = router;