//
//SERVER CODE
//
const express = require("express");
const path = require("path");
const bParser = require("body-parser");
const HTTP = require('http');
const {HOME, COMMUNICATION, PORT} = require("./config.json");

const app = express();
app.use(express.json());
app.set("view engine", "ejs");

const server = HTTP.createServer(app);
const io = require('socket.io')(server);

var urlEncodedParser = bParser.urlencoded({ extended: false });

const getHtmlPath = (name) => {return path.join(__dirname, "templates", name)}

app.get('/', (req, res) => {
        value = retrieveMessages();
        res.render('index', data = retrieveMessages());
});

app.post('/', urlEncodedParser, (req, res) => {
        var message = req.body['message'];
        sendMessage(`${COMMUNICATION}/messageReciever`, message);
        res.redirect('back');
});


app.post("/messageReciever", (req, res) => {
        logMessage(req.body.message);
});

app.get("/messagesData", (req, res) => {
        res.json(retrieveMessages());
});

server.listen(
        PORT, 
        () => console.log(`Running on http://localhost:${PORT} and ${HOME}`)
);

//
//CLIENT CODE
//
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var fs = require('fs');

function makePostRequest(url, json)
{
        let http = new XMLHttpRequest();
        http.open("POST", url, true);
        http.setRequestHeader("Content-Type", "application/json");
        http.send(JSON.stringify(json));
}

function sendMessage(url, message)
{
    makePostRequest(url, {message: message});
    logMessage(message);
}

function makeGetRequest(url, callback)
{
        let http = new XMLHttpRequest();
        http.onreadystatechange = function() 
        {
                if (http.readyState === http.DONE)
                {
                        let json = JSON.parse(http.responseText);
                        callback(json);
                }
        }
        http.open("GET", url);
        http.send();
}


function logMessage(message)
{
        if (message == '')
        {
                return;
        }
        let messagesJson = retrieveMessages();
        messagesJson.messages.push({content: `${message}`});
        fs.writeFileSync('messages.json', JSON.stringify(messagesJson));  
        io.emit("message_sent", {message})
        return;
}

function retrieveMessages()
{
        let messagesRaw = fs.readFileSync("messages.json", 'utf8');  
        if (messagesRaw == "")
        {
                messagesRaw = `{ "messages": []}`;
        }   
        let messagesJson = JSON.parse(messagesRaw);
        return messagesJson;
}

