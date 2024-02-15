'use strict';
const logger = require('../common/assocham_logging').logger;
const response = require('../common/assocham_utils').response;
const assocham_model = require('../models/assocham_model.js');
const CryptoJS = require('crypto-js');
const bcrypt = require('bcrypt');
const url = require('url');
const Joi = require('joi');

const path = require('path');
const moment = require('moment');


let dataSet = {};
let params = {};

module.exports.getEventList = async (request, resp) => {
    try {
        console.log('hi');
        console.log('hi', request.query);
        let getList = await assocham_model.getEventList();
        console.log(getList);
        logger.info(`Event list!`);
        dataSet = response("success", "Event List!", getList);
        resp.status(200).json(dataSet);
        return;
    }
    catch (e) {
        logger.error(`TZFOT113 Exception occurred to send menu list : ${e.message}`, 'Line No 22 Page Name admin Controller');
        dataSet = response(422, e.message, {});
        resp.status(422).json(dataSet);
        return;
    }
}

module.exports.registration = async (request, resp) => {
    try {
        let buzValidateResponse = await auth_registration.validateAsync(request.body);
        if (buzValidateResponse.error) {
            dataSet = response("failed", "Validation Error", buzValidateResponse.error.details.map(d => d.message));
            resp.status(422).json(dataSet);
            return;
        }

        let checkEmailNumber = await assocham_model.checkEmailNumber(request.body);
        if(checkEmailNumber.length >= 1){
            logger.error(`Already Registered... !:`, '');
            dataSet = response(422, "Already Registered... !", {});
            resp.status(422).json(dataSet);
            return;
        }
        let result = await assocham_model.createRegistration(request.body);
        if (result?.insertId) {
            logger.info(`Registered Successfully!`);
            dataSet = response("success", "Registered Successfully!");
            resp.status(200).json(dataSet);
            return;
        }
        logger.error(`Somethinh went wrong :`, '');
        dataSet = response(422, "Something went wrong!", {});
        resp.status(422).json(dataSet);
        return;
    }
    catch (e) {
        logger.error(`TZFOT113 Exception occurred to send menu list : ${e.message}`, 'Line No 22 Page Name admin Controller');
        dataSet = response(422, e.message, {});
        resp.status(422).json(dataSet);
    }
}







const auth_registration = Joi.object().keys({
    project_name: Joi.string().required(),
    sub_project_name: Joi.optional(),
    salutations: Joi.string().required(),
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email_id: Joi.string().required(),
    address: Joi.string().required(),
    country: Joi.string().required(),
    state: Joi.string().required(),
    city: Joi.string().required(),
    pin_code: Joi.string().required(),
    mobile_code: Joi.string().required(),
    mobile_no: Joi.string().required(),
    tele_no: Joi.string().required(),
    message: Joi.string().required(),
    certification: Joi.optional()
});
