const express = require("express");
const router = express.Router();
const reactCtrl = require("../controllers/react");

router.post("/", reactCtrl.addReact);
router.delete("/:id", reactCtrl.deleteReact);

module.exports = router;
