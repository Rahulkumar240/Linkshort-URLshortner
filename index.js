const express = require("express");
const {connectToMongoDB} = require('./connect');

const urlRoute = require('./routes/url');
const URL = require('./models/url');
const app = express();
const PORT = 8000;

connectToMongoDB('mongodb://localhost:27017/short-url').then(()=>console.log("mongodb Connected"));


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
