const {getUser} = require("../Service/shortURL_auth");

function restrictToLoggedinUseOnly(req, res, next) {
    const userUid = req.cookies.uid;
    console.log("Cookie UID:", userUid);

    if (!userUid) {
        console.log("No cookie found, redirecting");
        return res.redirect("/login");
    }

    const user = getUser(userUid);
    console.log("getUser result:", user);

    if (!user) {
        console.log("User not in session store, redirecting");
        return res.redirect("/login");
    }

    req.user = user;
    next();
}


module.exports = {
    restrictToLoggedinUseOnly
}