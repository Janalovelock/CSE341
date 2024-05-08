/* jshint esversion: 6 */
const express = require("express");
const router = express.Router();

const contactsController = require("../controllers/contactsController");

router.get("/", contactsController.getAll);

router.get("/:id", contactsController.getSingle);

router.post("/", contactsController.create);

router.put("/:id", contactsController.update);

router.delete("/:id", contactsController.deleteContact);

module.exports = router;
