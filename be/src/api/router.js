const router = require("express").Router();
const users = require("./users/users.router");
const notes = require("./notes/notes.router");

router.use("/", users);
router.use("/notes", notes);

module.exports = router;
