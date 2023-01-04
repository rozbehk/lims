const express = require('express');
const router = express.Router();
const testsCtrl = require('../../controllers/tests');
const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/images/upload/")
    },
    filename: (req, file, cb) =>{
        cb(null, Date.now() + "--" + file.originalname)
    }
})

const upload = multer({storage: storage})


router.get('/getallcategories', testsCtrl.getAll);
router.post('/createcategory', testsCtrl.create);
router.delete('/deletecategory', testsCtrl.deleteOne);


module.exports = router;