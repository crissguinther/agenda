const express = require("express");
const router = express.Router();
const path = require("path");

const controllersPath = path.resolve(__dirname, "src", "controllers");
const homeController = require(`${controllersPath}/homeController`);
const loginController = require(`${controllersPath}/loginController`);

router.get("/", homeController.index);
router.get("/login", loginController.index);
router.post("/login/register", loginController.register);

module.exports = router;
