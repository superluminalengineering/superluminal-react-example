import axios from 'axios';

export class Server {

    static baseURL = "https://app.getluminal.com";
    static apiKey;

    static createSession(userID, projectID, isTransient, isEditingAllowed, tablePageSize) {
        if (!Server.apiKey || Server.apiKey == "$YOUR_API_KEY") { return console.log("Missing API key."); }
        return axios.post(`${Server.baseURL}/sessions`, {
            user_id: userID,
            project_id: projectID,
            transient: isTransient,
            allow_edits: isEditingAllowed,
            table_page_size: tablePageSize,
        }, { 
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${Server.apiKey}`
            } 
        })
        .then((response) => response.data)
        .catch((error) => console.log(`Couldn't create session due to error: ${error?.reason ?? error}`));
    }

    static uploadSchema(schema, userID, projectID) {
        if (!Server.apiKey || Server.apiKey == "$YOUR_API_KEY") { return console.log("Missing API key."); }
        const url = `https://app.getluminal.com/users/${userID}/projects/${projectID}/schema`;
        return axios.put(url, schema, {
            headers: {
                "Content-Type": "application/json",
                "Authorization" : `Bearer ${Server.apiKey}`,
            }
        }).catch(error => {
            console.log(`Couldn't upload schema due to error: ${error?.reason ?? error}`);
        });
    }

    static uploadData(data, userID, projectID) {
        if (!Server.apiKey || Server.apiKey == "$YOUR_API_KEY") { return console.log("Missing API key."); }
        const url = `https://app.getluminal.com/users/${userID}/projects/${projectID}/data`;
        return axios.put(url, data, {
            headers: {
                "Content-Type": "text/csv",
                "Authorization" : `Bearer ${Server.apiKey}`,
            }
        }).catch(error => {
            console.log(`Couldn't upload data due to error: ${error?.reason ?? error}`);
        });
    }
}
