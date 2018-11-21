const express = require('express');
const router = express.Router();
const userController = require('../../controllers/userController');

router
  .get('/', userController.getAll)
  .post('/new', userController.create)
  .patch('/update', userController.updatePasswordOrName)
  .delete('/delete/:id', userController.deleteById);

module.exports = router;
