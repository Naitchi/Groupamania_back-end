const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user");
const auth = require("../middleware/auth");

router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);
router.get("/getAll", userCtrl.getAllUsers);
router.get("/:id", userCtrl.getUser); //pour voir son profil 
router.delete("/:id/deleteAccount",auth, userCtrl.deleteUser);

module.exports = router;
