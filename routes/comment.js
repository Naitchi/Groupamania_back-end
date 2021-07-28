const express = require("express");
const router = express.Router();
const commentCtrl = require("../controllers/comment");
const auth = require("../middleware/auth");

router.post("/", auth, commentCtrl.createComment);
router.delete("/:id/delete", auth, commentCtrl.deleteComment);
router.get("/:id", commentCtrl.seeComments);

module.exports = router;
