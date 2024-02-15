//standard respose for all apis
const response = module.exports.response = (code, msg, data) => {
    return {code: code, message: msg, data: data };
};

