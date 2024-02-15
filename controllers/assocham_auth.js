'use strict';
const logger = require('../common/assocham_logging').logger;
const response = require('../common/assocham_utils').response;
const assocham_model = require('../models/assocham_model.js');
const config = require('../config');
const fs = require('fs');
const { parse } = require('path');
const jwt = require('jsonwebtoken');
const CryptoJS = require('crypto-js');
const bcrypt = require('bcrypt');

const cron = require('node-cron');
var httpContext = require('express-http-context');


let dataSet = {};
let params = {};




