const express = require('express');
const concController = require('../../controllers/concController');
const router = express.Router();

router
  .post('/new', concController.create)
  .get('/:id?', concController.read)
  .patch('/:id/update', concController.update)
  .delete('/:id/delete', concController.delete);

module.exports = router;
