const express = require("express");
const fetchuser = require("../middleware/fetchuser");
const router = express.Router();
const Note = require("../models/Notes");
const { body, validationResult } = require("express-validator");

//fetch all notes of user
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  const notes = await Note.find({ user: req.user.id });
  res.json(notes);
});

router.post("/addnotes", fetchuser, [
    body('title').isLength({min:3}),
    body('description').isLength({min:3})
],async (req, res) => {
    //if there are errors then return bad request and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { title, description, tag } = req.body;
        const notes = await Note.create({
          title: title,
          description: description,
          tag: tag,
          user:req.user.id
        });
        res.send(notes);
        
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Some internal error occured")
    }
 
});

module.exports = router;
