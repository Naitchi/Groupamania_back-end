const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);
router.get("/me", userCtrl.me);
router.get("/getAll", userCtrl.getAllUsers);
router.get("/:id", userCtrl.getUser); //pour voir son profil
router.delete("/:id/deleteAccount", auth, userCtrl.deleteUser);
router.put("/modify", auth, multer, userCtrl.signup);

module.exports = router;
