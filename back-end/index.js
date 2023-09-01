import cors from "cors";
import express from "express";

import { exampleData } from "./ExampleData.js";
import { exampleSchema } from "./ExampleSchema.js";
import { Server } from "./Server.js";

Server.apiKey = "$YOUR_API_KEY";

const app = express();

app.use(cors());
app.use(express.json());

app.post("/initialize", (request, response) => {
    // In a real world scenario you'll want to get the user ID from the requesting user's 
    // JWT (or use a similar method) and check that they're allowed to access the given project.
    const userID = request.body.userID;
    const projectID = request.body.projectID;
    let authToken;
    // First, create a session for the given user and project. `transient` is set to `true` such that
    // the user's messages aren't persisted beyond the length of the session.
    return Server.createSession(userID, projectID, true, false, 1000)
        .then((json) => {
            authToken = json.token; // The auth token to be passed to the front-end
        })
        .then(() => {
            // Next, upload the schema for the data. This is an optional step but highly recommended.
            return Server.uploadSchema(exampleSchema, userID, projectID);
        })
        .then(() => {
            // Finally, upload the data related for the given user and project.
            return Server.uploadData(Buffer.from(exampleData), userID, projectID);
        })
        .then(() => {
            response.json({ token: authToken });
        })
        
});

app.listen(3000, () => {
    console.log("Listening on port 3000");
});