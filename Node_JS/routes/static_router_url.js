const express = require("express")
const router = express.Router();

router.get("/" , (req,res) =>{
    return res.render("shortURL_View");
})

router.get("/signup",(req,res)=>{
    return res.render("shortURL_signup");
})

router.get("/login", (req,res)=>{
    return res.render("shortURL_login");
})
module.exports = router;