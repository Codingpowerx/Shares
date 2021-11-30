const express = require('express');
const fileController = require('./../controllers/fileController');
const authController = require('./../controllers/authController');


const router = express.Router();

router
  .route('/')
  .get(//authController.protect,
    fileController.getAllFiles)
  .post(fileController.uploadFile)
  

router
  .route('/:id')
  .get(fileController.getFile)
  .patch(fileController.updateFile)
  .delete(
    fileController.deleteFile
  );

module.exports = router;
