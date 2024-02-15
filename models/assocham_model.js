'use strict';
const response = require('../common/assocham_utils').response;
const logger = require('../common/assocham_logging').logger;
const { constObj } = require('../common/constant');
const config = require('../config');
const commonFun = require('../common/common');
var httpContext = require('express-http-context');
const connection = require('../utils/mysql_client.js').connection;


// module.exports.adminUserTable = async (mobile_no) => {
//     try {
//         let query = "SELECT * FROM  admin_users WHERE mobile_no='" + mobile_no + "'";
//         let result = await connection.query(query);
//         return result;
//     } catch (e) {
//         logger.error(`TZFOT119 Exception occurred to find user of same mobile number : ${e.message}`);
//         return response(500, e.message, {});
//     }
// }



module.exports.getEventList = async () => {
    try {
        let query = "SELECT * FROM  assocham_event where status='Active'";
        let result = await connection.query(query);
        return result;
    } catch (e) {
        logger.error(`TZFOT119 Exception occurred to fetch menu list : ${e.message}`);
        return response(500, e.message, {});
    }
}

module.exports.createRegistration = async (request) => {
    try {
        // let login_details = await httpContext.get('loginDetails');
        let query = `INSERT INTO assocham_user_registration SET project_name="${request.project_name}", sub_project_name="${request.sub_project_name}", salutations="${request.salutations}", first_name="${request.first_name}", last_name="${request.last_name}", email_id="${request.email_id}", address="${request.address}", country="${request.country}", state="${request.state}", city="${request.city}", pin_code="${request.pin_code}", mobile_code="${request.mobile_code}", mobile_no="${request.mobile_no}", tele_no="${request.tele_no}", message="${request.message}", certification="${request.certification}", added_date=NOW(), status="${constObj.active}"`;
        let result = await connection.query(query);
        return result;
    }
    catch (e) {
        logger.error(`TZFOT119 Exception occurred get the event list : ${e.message}`);
        return response(500, e.message, {});
    }
}


module.exports.paymentFormData = async (request) => {
    try {
        // let query = 
    }
    catch (e) {

    }
}



module.exports.getAllImportantLink = async (request) => {
    try {
        let query = `SELECT * FROM  assocham_contentmenu where status='Active' and menu_id='${request.menu_id}' and sub_menu_id='${request.sub_menu_id}' ORDER BY order_number`;
        let result = await connection.query(query);
        return result;
    } catch (e) {
        logger.error(`TZFOT119 Exception occurred to fetch menu list : ${e.message}`);
        return response(500, e.message, {});
    }
}


module.exports.getImportantLinkData = async (request) => {
    try {
        let query = `SELECT * FROM  assocham_static_content where status='Active' and content_menu_id='${request.content_menu_id}'`;
        let result = await connection.query(query);
        return result;
    } catch (e) {
        logger.error(`TZFOT119 Exception occurred to fetch menu list : ${e.message}`);
        return response(500, e.message, {});
    }
}

module.exports.checkPaperIdExists = async (paper_id) => {
    try {
        let query = `SELECT * FROM  assocham_user_exam_paper where status='Active' and paper_id='${paper_id}'`;
        let result = await connection.query(query);
        return result;
    }
    catch (e) {
        logger.error(`TZFOT119 Exception occurred to fetch menu list : ${e.message}`);
        return response(500, e.message, {});
    }
}

module.exports.getAllQuestionsId = async (paper_id) => {
    try {
        let query = `SELECT question_id FROM  asshocham_exam_paper_questions where status='Active' and paper_id='${paper_id}'`;
        let result = await connection.query(query);
        return result;
    }
    catch (e) {
        logger.error(`TZFOT119 Exception occurred to fetch menu list : ${e.message}`);
        return response(500, e.message, {});
    }
}

module.exports.getAllQuestionsDataWithIds = async (allIds) => {
    try {
        let query = 'SELECT * FROM assocham_questions WHERE question_id IN (?)';
        let result = await connection.query(query, [allIds]);
        return result;
    }
    catch (e) {
        logger.error(`TZFOT119 Exception occurred to fetch menu list : ${e.message}`);
        return response(500, e.message, {});
    }
}


module.exports.storedUserInDb = async (request) => {
    try {
        let query = `INSERT INTO user_resourse_used SET name="${request.name}", email="${request.email}", mobile_no="${request.mobile_no}", state="${request.state}", added_date=NOW(), status="${constObj.active}"`;
        let result = await connection.query(query);
        return result;
    }
    catch (e) {
        logger.error(`TZFOT119 Exception occurred to fetch menu list : ${e.message}`);
        return response(500, e.message, {});
    }
}


module.exports.changeDownloadStatus = async (user_id) => {
    try {
        let query = `UPDATE user_resourse_used SET  status="Downloaded" where id=${user_id}`;

        let result = await connection.query(query);
        return result;
    }
    catch (e) {
        logger.error(`TZFOT119 Exception occurred to fetch menu list : ${e.message}`);
        return response(500, e.message, {});
    }
}


module.exports.fetchEcoProductsData = async (request) => {
    try {
        let query = `SELECT * FROM assocham_static_content WHERE content_menu_id=${request.content_menu_id} AND sub_menu_id=${request.sub_menu_id} AND menu_id=${request.menu_id}`;
        let result = await connection.query(query);
        return result;
    } catch (e) {
        logger.error(`TZFOT119 Exception occurred to fetch menu list : ${e.message}`);
        return response(500, e.message, {});
    }
}


module.exports.getGemStateChapterPersons = async (state_name) => {
    try {
        let query = `SELECT * FROM gem_state_chapters WHERE  status="Active"`;
        if (state_name) {
            query += ` AND state_name=${state_name}`;
        }
        let result = await connection.query(query);
        return result;
    } catch (e) {
        logger.error(`TZFOT119 Exception occurred to fetch menu list : ${e.message}`);
        return response(500, e.message, {});
    }
}

module.exports.checkEmailNumber = async (request) => {
    try {
        let query = `SELECT * FROM assocham_user_registration WHERE  status="Active" OR email_id="${request.email_id}" OR  mobile_no="${request.mobile_no}"`;
        let result = await connection.query(query);
        return result;
    }
    catch (e){
        logger.error(`TZFOT119 Exception occurred to fetch menu list : ${e.message}`);
        return response(500, e.message, {});
    }
}

module.exports.insertEnquiry = async (request,resp) => {
    try{
        let query = `INSERT INTO gem_certification_enquiry SET project="${request.project_name}",first_name="${request.first_name}",last_name="${request.last_name}", ${request.change_key}="${request.change_value}", status="${constObj.active}", added_date=NOW()`;
        let result = await connection.query(query);
        return result;
    }catch(e){
        logger.error(`TZFOT119 Exception occurred to fetch menu list : ${e.message}`);
        return response(500, e.message, {});
    }
}


