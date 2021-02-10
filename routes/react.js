const express = require("express");
const router = express.Router();
const reactCtrl = require("../controllers/react");

router.post("/", reactCtrl.addReact);
router.delete("/:id", reactCtrl.deleteReact);
router.get("/getReactFromComment/:id",reactCtrl.seeReactsFromAComment);
router.get("/getReactFromPublication/:id",reactCtrl.seeReactsFromAPublication);

module.exports = router;
