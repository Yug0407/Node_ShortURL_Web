const idshort = require("shortid");
const URL = require("../models/url");

async function GenerateNewShortID(req,res) {
    try {
    const body = req.body;
    if(!body.url){
        return res.status(400).json({error : "url is requierd "});
    }
    const shortID = idshort(8);
    await URL.create({
        shortId : shortID,
        oriURL : body.url ,
        visitHistory : []
    });

    res.render("shortURL_View", {
        id : shortID,
    });
}
    catch(err){
        console.log("Error is :->  ",err);
        res.status(500).json({status : "Unsuccessful"});
    }
}

module.exports = {
    GenerateNewShortID
}
