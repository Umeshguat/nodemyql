'use strict';
const express = require('express');
const bodyparser = require('body-parser');
const config = require('./config');
var httpContext = require('express-http-context');
//const logger = require('./common/tz_logging').authgger;
//const response = require('./common/tz_utils').response;
/* Bussiness Page Inculded to Route the specific action  url*/
// const business_controller = require('./controllers/business_controller');
const assocham_auth = require('./controllers/assocham_auth.js');
const assocham_controller = require('./controllers/assocham_controller.js');

const fileUpload = require('express-fileupload');

const app = express();
const router = express.Router();
app.use(bodyparser.json());
app.use(httpContext.middleware);
app.use(fileUpload());


//Enable CORS for all HTTP methods
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Authorization, Content-Type, Accept, tz-api-key");
    next();
});


app.get('/api/assocham/event-list', assocham_controller.getEventList);
app.post('/api/assocham/registration', assocham_controller.registration);
// app.post('/api/assocham/payment-form-data', assocham_controller.paymentFormData);
// app.get('/api/assocham/all-important-links', assocham_controller.allImportantLinks);
// app.get('/api/assocham/get-important-links-data', assocham_controller.importantLinksData);
// app.get('/api/assocham/get-test-paper-data', assocham_controller.getTestPaperData);
// app.post('/api/assocham/registered-and-sendemail', assocham_controller.registeredAndSendemail);
// app.get('/api/assocham/download-pdf-resource-free-guidance-data', assocham_controller.downloadPdfResourcefreeGuidanceData);
// app.get('/api/assocham/gem-eco-products', assocham_controller.getEcoProducts);
// app.get('/api/assocham/get-gem-state-chapter-persons', assocham_controller.getGemStateChapterPersons);
// app.post('/api/assocham/insert-gem-certification-enquiry',assocham_controller.insertGemCertificationEnquiry);

app.get('/', (req, res) => {
    res.status(200).send('Asscoham Working!')
});


const port = config.port || 3302;
var server = app.listen(port, () => {
    console.info(`Server started. Listening on :  ${port}`)
});

module.exports = server;
