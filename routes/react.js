const express = require("express");
const router = express.Router();
const reactCtrl = require("../controllers/react");
const auth = require("../middleware/auth");

router.post("/", auth, reactCtrl.addReact);
router.delete("/", auth, reactCtrl.delete);
router.get(
  "/getReactsFromPublication/:id",
  reactCtrl.getReactsFromAPublication
);

module.exports = router;
