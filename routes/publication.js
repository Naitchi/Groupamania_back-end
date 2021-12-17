const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

const publicationCtrl = require("../controllers/publication");

router.post("/", auth, multer, publicationCtrl.createPublication);
router.get("/:id", publicationCtrl.getOnePublication);
router.delete("/:id/delete", auth, publicationCtrl.deletePublication);
router.get("/", publicationCtrl.getAllPublication);
router.get("/:id", publicationCtrl.getAllPublicationFromUser);
router.put("/modifyPost", auth, multer, publicationCtrl.modifyPost);
router.put("/modifyPostContent", publicationCtrl.modifyPostContent);

module.exports = router;
