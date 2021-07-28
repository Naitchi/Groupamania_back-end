const express = require("express");
const router = express.Router();
const reactCtrl = require("../controllers/react");
const auth = require("../middleware/auth");

router.post("/",auth, reactCtrl.addReact);
router.delete("/:id",auth, reactCtrl.deleteReact);
router.get("/getReactFromComment/:id",reactCtrl.seeReactsFromAComment);
router.get("/getReactFromPublication/:id",reactCtrl.seeReactsFromAPublication);

module.exports = router;
