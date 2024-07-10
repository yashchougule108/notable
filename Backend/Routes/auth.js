const express = require("express");
const User = require("../models/User");
const router = express.Router();
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const fetchuser=require('../middleware/fetchuser')

const { body, validationResult } = require("express-validator");

const jWT_Secrete="harryisgoodb$oy";

//create a user Using POST"/api/auth/" no login required
router.post(
  "/createuser",
  [
    body("name", "Enter valid Name").isLength({ min: 3 }),
    body("email", "Enter valid email").isEmail(),
    body("password", "enter valid password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    //checking for validations
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success,errors: errors.array() });
    }
    try {
      //finding user whether user with similar email exits then retrun error
      let user = await User.findOne({success, email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ errors: "User with this email id is already exists" });
      }
     // salting and hashing password for security purpose
     const salt= await bcrypt.genSalt(10);
     const secPass=await bcrypt.hash(req.body.password,salt);
     //console.log(hash);

     //creating user and inserting it in database in UserSchema 
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });
      //res.json(user);
      const data={
        user:{
          id:user.id
        }
      }
      const authtoken=jwt.sign(data,jWT_Secrete);
      success=true;
      res.json({success,authtoken});
    } catch (error) {
      console.log(error.message);
      res.status(500).send({error:"some internal error occured"})
    }
  }
);
//creating login endpoint with POST"/api/auth/login"
router.post(
  "/login",
  [ body("email", "Enter valid email").isEmail(),
    body("password", "enter valid password").exists(),
  ],
  async (req, res) => {
    //checking for validations
    let success=false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success,errors: errors.array() });
    }
    try {
      //finding user whether user with similar email exits then retrun error
      const {email,password}=req.body;
      let user = await User.findOne({ email});
      
      if (!user) {
        return res
          .status(400)
          .json({success, errors: "Please enter valid credentials " });
      }
     //comparing password
     const pass_Check=await bcrypt.compare(password,user.password);
     if(!pass_Check){
      return res.status(400).json({success,errors:"Please enter valid credentials "});
     }

      const data={
        user:{
          id:user.id
        }
      }
      const authtoken=jwt.sign(data,jWT_Secrete);
      success=true;
      res.json({success,authtoken});
    } catch (error) {
      console.log(error.message);
      res.status(500).send({error:"some internal error occured"})
    }
  }
);

//get the user details from the token POST"/api/auth/getuser"

router.post('/getuser',fetchuser,async (req,res)=>{
  try {
    const userid=req.user.id;
    let user= await User.findById(userid).select("-password");
    res.send(user);

    
  } catch (error) {
    console.log(error.message)
    res.status(500).send({error:"some error occured"})
    
  }
})



module.exports = router;
