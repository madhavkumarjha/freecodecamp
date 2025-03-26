let express = require('express');
let app = express();
const bodyParser = require("body-parser");
require("dotenv").config();

app.use(bodyParser.urlencoded({ extended: false }));

absolutePath = __dirname + '/views/index.html'

app.use("/public", express.static(__dirname + "/public"))

/**dot env Variable and public file style with html file*/
// app.get("/json", function (req, res) {
//     // res.sendFile(absolutePath)
//     let text = "Hello json";
//     if (process.env.MESSAGE_STYLE === "uppercase") {
//         text = text.toUpperCase();
//     }
//     res.json({ "message": text })

// })



/**middleware */
// // Logger middleware
// app.use((req, res, next) => {
//     console.log(`${req.method} ${req.path} - ${req.ip}`);
//     next(); // Ensure the request proceeds to the next middleware/route
// });

/**JSON format */
// app.get("/json", (req, res) => {
//     res.json({ message: "Hello json" });
// });



// app.get('/now', function(req, res, next) {
//     req.time = new Date().toString();  // Hypothetical synchronous operation
//     next();
//   }, function(req, res) {
//     res.json({time:req.time});
//   });

/**params pass  */
// app.get("/:word/echo", function (req, res) {

//     res.json({ echo: req.params.word });
// })


/**request.query */
// app.get("/name", function (req, res) {
//     const { first, last } = req.query;
//     res.json({ name: `${first} ${last}` })
// })

/**body-parser encoded */
app.post("/name", function (req, res) {
    const { first, last } = req.body; // Extract from request body
    res.json({ name: `${first} ${last}` });
});



// console.log("Hello World");



module.exports = app;
