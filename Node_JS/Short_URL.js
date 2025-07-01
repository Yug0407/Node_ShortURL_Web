const express = require("express");
const path = require("path");
const { connectToMongoDB } = require("./connections/URL_conn");
const URL = require("./models/url");
const cookieParser = require("cookie-parser");
const {restrictToLoggedinUseOnly} = require("./middleware/shortURL");

const urlRouter = require("./routes/shortURL");
const staticRoute = require("./routes/static_router_url");
const userRoute = require("./routes/shortURL_user_route");

const app = express();
const port = 8001;

connectToMongoDB("mongodb://127.0.0.1:27017/short_url");
//Middleware 
app.use(express.json());
app.use(express.urlencoded({extended :false}))
app.use(cookieParser()); 

app.use("/url",restrictToLoggedinUseOnly, urlRouter);
app.use("/", staticRoute);
app.use("/user", userRoute);

app.set("view engine", "ejs");
app.set("views" , path.resolve("C:\\A_Web_Dev\\Node_JS\\viewer"));

app.get("/homepage/test" , async (req,res)=>{
    const allUrls = await URL.find({});
    return res.render("shortURL_View", {
        urls : allUrls
    });
})

app.get("/:shortID", async (req, res) => {
    try {
        const id = req.params.shortID;
        const entry = await URL.findOneAndUpdate({
           shortId : id
        }, {
            $push: {
                visitHistory: {
                    timestamps : Date.now(),
                }
            },
        },
        {new:true}
    )

    if (!entry) {
  return res.status(404).json({ error: "Short URL not found" });
}

      res.redirect(entry.oriURL);
    } catch (err) {
        console.log("Error is :->  ", err);
        res.status(500).json({ status: "Unsuccessful" });
    }
})

app.listen(port, () => console.log("Server Started ... !!"));
// Adding Comment 