const express = require("express")
const router = express.Router()
const {contactUs}=require("../controllers/ContsctUs");




router.post("/contactUs", contactUs);

module.exports = router;

