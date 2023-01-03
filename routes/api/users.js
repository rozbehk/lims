const express = require('express');
const router = express.Router();
const usersCtrl = require('../../controllers/users');

console.log('router')
router.post('/register', usersCtrl.register);
router.post('/login' , usersCtrl.login)
router.put('/update' , usersCtrl.update)



module.exports = router;