const router = require("express").Router();
const controller = require("./notes.controller");
const upload = require("../../utils/storage");
const middlewares = require("../../middlewares/auth");

router.get("/", controller.findAllNotes);
router.get("/:id", controller.findNoteById);
router.post(
  "/",
  upload.single("file"),
  middlewares.auth,
  controller.createNote,
);
router.delete("/:id", middlewares.auth, controller.deleteNoteById);
router.put("/:id", middlewares.auth, controller.updateNoteById);

module.exports = router;
