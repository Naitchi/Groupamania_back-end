const express = require("express");
const router = express.Router();
const reactCtrl = require("../controllers/react");
const auth = require("../middleware/auth");

router.post("/", reactCtrl.addReact);
router.delete("/", reactCtrl.delete);
router.get(
  "/getReactsFromPublication/:id",
  reactCtrl.getReactsFromAPublication
);

module.exports = router;
