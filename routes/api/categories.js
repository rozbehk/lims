const express = require('express');
const router = express.Router();
const categoryCtrl = require('../../controllers/categories');
const multer = require('multer')




router.get('/getallcategories', categoryCtrl.getAll);
router.post('/createcategory', categoryCtrl.create);
router.delete('/deletecategory', categoryCtrl.deleteOne);


module.exports = router;