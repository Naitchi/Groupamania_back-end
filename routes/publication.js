const express = require("express");
const router = express.Router();

const multer = require("../middleware/multer-config");

const publicationCtrl = require("../controllers/publication");

router.post("/", publicationCtrl.createPublication);
router.get("/:id",publicationCtrl.getOnePublication);
router.delete("/:id/delete",publicationCtrl.deletePublication);

module.exports = router;
