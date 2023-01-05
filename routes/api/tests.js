const express = require('express');
const router = express.Router();
const testsCtrl = require('../../controllers/tests');
const multer = require('multer')



router.get('/getalltests', testsCtrl.getAll);
router.post('/createtest', testsCtrl.create);
router.delete('/deletetest', testsCtrl.deleteOne);


module.exports = router;