const { Router } = require('express');

const petsRouter = require('./controllers/pets');
const eventsRouter = require('./controllers/events');
const userRouter = require('./controllers/user');
const lostPetsRouter = require('./controllers/lost_pets');
const adoptionsRouter = require('./controllers/adoptions');
const locationRouter = require('./controllers/locations');
const loginRouter = require('./controllers/login');
const citiesRouter = require('./controllers/cities');
const provincesRouter = require('./controllers/provinces');
const countriesRouter = require('./controllers/countries');
const mailRouter = require('./controllers/mailPostPetAdop');
const authRouter = require('./controllers/auth');

const router = Router();

router.use('/pets', petsRouter);
router.use('/events', eventsRouter);
router.use('/users', userRouter);
router.use('/lostpets', lostPetsRouter);
router.use('/adoptions', adoptionsRouter);
router.use('/locations', locationRouter);
router.use('/login', loginRouter);
router.use('/cities', citiesRouter);
router.use('/provinces', provincesRouter);
router.use('/countries', countriesRouter);
router.use('/sendmail', mailRouter);
router.use('/auth', authRouter);

module.exports = router;
