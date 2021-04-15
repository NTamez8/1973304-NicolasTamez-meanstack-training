const express = require('express');
const courseController = require('../controllers/courseController')
const routes = express.Router();

routes.get('/',courseController.index);
routes.get('/add',courseController.addPage);
routes.post('/add',courseController.addCourse)
routes.get('/update',courseController.updatePage);
routes.post('/update',courseController.updateCourse)
routes.get('/delete',courseController.deletePage);
routes.post('/delete',courseController.deleteCourse);
routes.get('/fetch',courseController.fetchPage);


module.exports = routes;