// const express=require('express');
// const jwt =  require('jsonwebtoken');
// const bcrypt=require('bcryptjs');
// const User=require('../models/user');

// const router=express.Router();

// //login route

// router.post('/login',async(request,response)=>{
//     const {email,password}=request.body;
//     try{

//         // user exit or not 
//         const user=await User.findOne({email});
//         if(!user){
//             return response.status(400).json({message:'user exist'});
//         }

//         // new user
//         user=new  User({
//             email,
//             password,
//         });


//         await user.save();
//         response.status(500).json({message:'user registered successfully'});
        
        
//         // match password
//         if(!isMatch){
//             return response.status(400).json({message:'invalid credentials'});
//         }
//         // const isMatch = await bcrypt.compare(password, user.password);

//         // create a jwt token
//         const token=jwt.sign({id:user._id}, process.env.JWT_SECRET,{
//             expiresIn :'1h',
//         });
//         response.json({token});
//     }

//     catch(error){
//         response.status(500).json({message:'server error'});
//     }
// });

// module.exports=router;


// const express = require('express');
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');
// const User = require('../models/user');

// const router = express.Router();

// // Login route
// router.post('/login', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     // Check if user exists
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ message: 'Invalid credentials' });
//     }

//     // Check if the password matches
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: 'Invalid credentials' });
//     }

//     // Create a JWT token
//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//       expiresIn: '1h',
//     });

//     res.json({ token });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// module.exports = router;

const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const  jwt = require('jsonwebtoken');


const router = express.Router();

// Registration route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user with hashed password
    user = new User({
      email,
      password: hashedPassword,  // Store hashed password
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: '1h',
    });
    
    await user.save();
    res.status(201).json({ message: 'User registered successfully' ,token:token});

    
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

