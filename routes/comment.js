const express = require("express");
const router = express.Router();
const commentCtrl = require("../controllers/comment");

router.post("/", commentCtrl.createComment);
router.delete("/:id/delete", commentCtrl.deleteComment);
router.get("/:id", commentCtrl.seeComments);

module.exports = router;
