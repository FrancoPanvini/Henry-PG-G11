const { Router } = require ('express')

const petsRouter = require('./sub-routes/pets')
const shelterRouter = require ('./sub-routes/shelters')
const eventsRouter = require ('./sub-routes/events')
const lostPetsRouter = require ('./sub-routes/lost_pets')
const formsRouter = require ('./sub-routes/forms')
const userRouter = require ('./sub-routes/user')
const photosRouter = require ('./sub-routes/photos')
const locationRouter = require ('./sub-routes/locations')

const router = Router()

router.use('/pets', petsRouter)
router.use('/shelters', shelterRouter)
router.use('/events', eventsRouter)
router.use('/lostpets', lostPetsRouter)
router.use('/forms', formsRouter)
router.use('/users', userRouter)
router.use('/photos', photosRouter)
router.use('/locations', locationRouter)


module.exports = router;