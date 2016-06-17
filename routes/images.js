var express = require('express');
var router = express.Router();
var imageController = require('../controllers/imageController.js');

/*
 * GET
 */
router.get('/', function(req, res) {
    imageController.list(req, res);
});

/*
 * GET
 */
router.get('/:id', function(req, res) {
    imageController.show(req, res);
});

/*
 * POST
 */
router.post('/', function(req, res) {
    imageController.create(req, res);
});

/*
 * PUT
 */
router.put('/:id', function(req, res) {
    imageController.update(req, res);
});

/*
 * DELETE
 */
router.delete('/:id', function(req, res) {
    imageController.remove(req, res);
});

module.exports = router;