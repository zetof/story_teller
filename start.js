// Import section
import { fileURLToPath } from "url";
import { dirname } from "path";
import express from "express"

// Manually define __dirname function as it was not available from the start
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Constants section
const web_app_port = 8666;
const app = express();

// Define a base address for the starting page of the appplication
app.get("/", (req, res) => {
  res.sendFile("./index.html", { root: __dirname });
});

// Serve javascript pages of the application
app.use("/js", express.static(__dirname + "/js"));
app.use("/css", express.static(__dirname + "/css"));
app.use("/stories", express.static(__dirname + "/stories"));

// Start web server for frontend application
app.listen(web_app_port, () => console.log(`Your server is available on port ${web_app_port}`));