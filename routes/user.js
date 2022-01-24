const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

router.post("/crypt", userCtrl.crypt);
router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);
router.get("/me", userCtrl.me);
router.get("/getAll", userCtrl.getAllUsers);
router.get("/:id", userCtrl.getUser); //pour voir son profil
router.delete("/:id", auth, userCtrl.deleteUser);
router.put("/modifyPP", auth, multer, userCtrl.modifyPP);
router.put("/modifyPassword", auth, userCtrl.modifyPassword);
router.put("/modifyUser", auth, userCtrl.modifyUser);

module.exports = router;
