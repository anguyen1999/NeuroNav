const db = require('../controllers/databaseController.js'),
    directions = require('../controllers/directionsController.js')
    express = require('express'), 
    router = express.Router()

router.post('/patient', db.addPatient);
router.post('/appointment', db.addAppointment);
router.get('/patient', db.getPatients);
router.get('/appointment', db.getAppointments);
router.get('/directions', directions.getDirections);
router.get('/calendar', db.viewCalendarEvents);
router.post('/calendar', db.addCalendarEvent);
  
module.exports = router;