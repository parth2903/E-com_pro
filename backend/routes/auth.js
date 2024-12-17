const express = require('express');
const { registerUser, loginUser } = require('../handlers/auth-handler');
const router= express.Router();

router.post('/register', async (req, res) => {
  let model = req.body;
  if(model.name && model.email && model.password){
    await registerUser(model);
    res.send({
      message : "User registered"
    })
  }else{
    res.status(400).json({
      error: "PLease provide name, email and Pass"
    })
  }
})

router.post('/login', async (req, res) => {
  let model = req.body;
  if(model.email && model.password){
    const result = await loginUser(model);
    if(result){
      res.send(result)
    }else{
      res.status(400).json({
        error: "Email or password is incorrect"
      })
    }
  }else{
    res.status(400).json({
      error: "PLease provide email and Pass"
    })
  }
})

module.exports = router;