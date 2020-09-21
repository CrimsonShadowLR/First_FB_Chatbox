'use strict';
// Variables
let verifyToken ="M4sKap0EsUnaLeyenDaQuePocosConocen";
let pageToken ="EAAEd3jfSeHUBAFYfut6yoO5wrLDLzvuRIBO2CdqTOZBYjqRXUtR4t1aMKv0ZCHYPLdj2dXhcflga9VkX5VplHHFukFTsxKxqqeT9RccirZB4fbhghC8hFXaTe78rMsyDBuxfJykEEo8y7epbeZAQFOpytCTfPT4ko8M2kepc8QZDZD";

// Imports dependencies and set up http server
const
  express = require('express'),
  bodyParser = require('body-parser'),
  app = express().use(bodyParser.json()); // creates express http server

// Sets server port and logs message on success
app.listen(process.env.PORT || 1337, () => console.log('webhook is listening'));

// Creates the endpoint for our webhook 
app.post('/webhook', (req, res) => {  
 
    const messagingEvents = req.body.entry[0].messaging;

    messagingEvents.forEach((event) => {
        const sender = event.sender.id;

        if (event.message && event.message.text) {
            const text = event.message.text.trim().substring(0, 200);
            sendTextMessage(sender, text);
        }
    });

});

// Adds support for GET requests to our webhook
app.get('/webhook', (req, res) => {


    
  // Parse the query params
  let mode = req.query['hub.mode'];
  let token = req.query['hub.verify_token'];
  let challenge = req.query['hub.challenge'];
    
  // Checks if a token and mode is in the query string of the request
  if (mode && token) {
  
    // Checks the mode and token sent is correct
    if (mode === 'subscribe' && token === verifyToken) {
      
      // Responds with the challenge token from the request
      console.log('WEBHOOK_VERIFIED');
      res.status(200).send(challenge);
    
    } else {
      // Responds with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403);      
    }
  }
});

function sendMessage (sender, message) {
    request
        .post('https://graph.facebook.com/v2.6/me/messages')
        .query({access_token: pageToken})
        .send({
            recipient: {
                id: sender
            },
            message: message
        })
        .end((err, res) => {
            if (err) {
                console.log('Error sending message: ', err);
            } else if (res.body.error) {
                console.log('Error: ', res.body.error);
            }
        });
}

function sendTextMessage (sender, text) {
    sendMessage(sender, {
        text: text
    });
}
