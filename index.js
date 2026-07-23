const express = require("express");
const {connectToMongoDB} = require('./connect');

const urlRoute = require('./routes/url');
const URL = require('./models/url');
const app = express();

const dns = require("dns");
dns.setServers([
    '8.8.8.1','1.1.1.1'
]);

require("dotenv").config();

connectToMongoDB(process.env.MONGO_URI).then(()=>console.log("mongodb Connected"));


const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use('/url',urlRoute);


app.get("/:shortId", async (req, res) => {
    const shortId = req.params.shortId;

    const entry = await URL.findOneAndUpdate(
        { shortId },
        {
            $push: {
                visitHistory: {
                    timestamp: Date.now(),
                },
            },
        },
        { new: true }
    );

    if (!entry) {
        return res.status(404).send("Short URL not found");
    }

    return res.redirect(entry.redirectURL);
});

app.listen(PORT,()=> console.log(`Server started at PORT ${PORT}`));
