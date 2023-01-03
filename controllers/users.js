const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { findAllByDisplayValue } = require("@testing-library/react");
const fs = require('fs');


module.exports = {
  register,
  login,
  update
};

async function register(req, res) {
  let message = ''
  try {
    if (await User.findOne({ email: req.body.email })) {
      message = 'Email Addres Already Taken'
      throw new Error()
    }
    const hashedPassword = await bcrypt.hash(
      req.body.password,
      parseInt(process.env.SALT_ROUNDS)
    );
    const user = await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hashedPassword,
      receptionist: false,
      labTech: false,
      admin: false
    });
    console.log(user._id)
    path = `public/userData/${user._id}`
    fs.access(path, (error) => {
      if (error) {
        fs.mkdir(path, (error) => {
          if (error) {
            console.log(error);
          } else {
            console.log("New Directory created successfully !!");
          }
        });
      } else {
        console.log("Given Directory already exists !!");
      }
    });
    const token = jwt.sign({ user }, process.env.SECRET, { expiresIn: "24h" });
    res.status(200).json(token);
  } catch (err) {
    console.log(err)
    res.status(400).json(message);
  }
}

async function login(req, res) {
  message = ''

  try {
    const user = await User.findOne({ email: req.body.email });
    if (!(await User.findOne({ email: req.body.email }))) {
      message = 'Email not exist'
      throw new Error()
    }
    if (await User.findOne({ email: req.body.email }) && !(await bcrypt.compare(req.body.password, user.password))) {
      message = 'Bad Password'
      throw new Error()
    }
    const token = jwt.sign({ user }, process.env.SECRET, { expiresIn: "24h" });
    res.status(200).json(token);
  } catch (err) {
    res.status(400).json(message);
  }
}


async function update(req,res){
  console.log(req.body)
  try{
    let user = await User.findById(req.body._id)
    console.log(user)
    user.firstName = req.body.firstName
    user.lastName = req.body.lastName
    user.email = req.body.email
    const token = jwt.sign({ user }, process.env.SECRET, { expiresIn: "24h" });
    user.save()
    res.status(200).json({token,message: 'Details Updated'});

  }catch(err){
    res.status(400).json(err); 
    console.log(err)
  }
  
}