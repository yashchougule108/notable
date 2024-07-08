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

router.post(
  "/addnotes",
  fetchuser,
  [
    body("title").isLength({ min: 3 }),
    body("description").isLength({ min: 3 }),
  ],
  async (req, res) => {
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
        user: req.user.id,
      });
      res.send(notes);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Some internal error occured");
    }
  }
);

router.put("/updatenote/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;
  try {
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not found");
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }
    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.send(note);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Some internal error occured");
  }
});

router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not found");
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }
    note = await Note.findByIdAndDelete(req.params.id);
    res.send(note);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Some internal error occured");
  }
});

module.exports = router;
