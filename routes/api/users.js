const express = require('express');
const router = express.Router();
const usersCtrl = require('../../controllers/users');
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

router.post('/register', usersCtrl.register);
router.post('/login' , usersCtrl.login)
router.put('/update' , usersCtrl.update)
router.post('/uploadimage', usersCtrl.uploadImage)
router.get('/getallusers', usersCtrl.getAllUsers)


module.exports = router;