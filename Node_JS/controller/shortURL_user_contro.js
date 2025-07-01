const shortURL_user = require("../models/Auth_url_user");
const bcrypt = require("bcrypt");
const {v4 : uuidv4} = require("uuid");
const {setUser,getUser} = require("../Service/shortURL_auth");

async function handleUserSignup(req, res) {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await shortURL_user.create({ name, email, password: hashedPassword });
    return res.redirect("/login"); // safer: force login
}

// async function handleUserLogin (req,res) {
//     const {email,password} = req.body;
//     const user = await shortURL_user.findOne({email ,password});
//     if(!user){
//         return res.render("shortURL_login" , {error : "Invalid Username or Password"});
//     }
    
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.render("shortURL_login", { error: "Invalid email or password" });

//     const sessionId = uuidv4();
//     setUser(sessionId,user);
//     res.cookie('uid',sessionId, {
//         httpOnly: true,
//         maxAge: 24 * 60 * 60 * 1000,
//     })
//     return res.redirect("/homepage/test");
// }

async function handleUserLogin(req, res) {
    const { email, password } = req.body;
    const user = await shortURL_user.findOne({ email });

    console.log("Login attempt:", email);

    if (!user) {
        console.log("No user found");
        return res.render("shortURL_login", { error: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        console.log("Password does not match");
        return res.render("shortURL_login", { error: "Invalid email or password" });
    }

    const sessionId = uuidv4();
    console.log("Login success, sessionId:", sessionId);

    setUser(sessionId, user);
    res.cookie("uid", sessionId, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
    });

    return res.redirect("/homepage/test");
}


module.exports = {
    handleUserSignup, handleUserLogin
}