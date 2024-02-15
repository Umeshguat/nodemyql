const path = require('path');
const fs = require('fs');
const winston = require('winston');
const { format } = require('logform');
const appRoot = require('app-root-path');
const logDirectory = path.join(appRoot.toString(), 'log');
const os = require('os');
const ifaces = os.networkInterfaces();
const config = require('../config');
const util = require('util');

const environment = config.environment || "dev";
const service_name = config.service_name || "-";

// ensure log directory exists
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

let ips = [];
Object.keys(ifaces).forEach(function (ifname) {
    var alias = 0;
    ifaces[ifname].forEach(function (iface) {
        if ('IPv4' !== iface.family || iface.internal !== false) {
            // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
            return;
        }

        ips.push(iface.address);
        if (alias >= 1) {
            // this single interface has multiple ipv4 addresses
            console.log(ifname + ':' + alias, iface.address);
        } else {
            // this interface has only one ipv4 adress
            console.log(ifname, iface.address);
        }
        ++alias;
    });
});

// check issue https://github.com/winstonjs/winston/issues/1140 for more details on what is going on here
const addContext = winston.format(info => {
    if (ips.length > 0) {
        info.ips = ips;
    }
    info.service_name = service_name;
    return info;
});

const jsonWithTimeAndIp = format.combine(
    addContext(),
    format.timestamp(),
    format.json()
);

const consoleWithTimeAndIp = format.combine(
    addContext(),
    format.timestamp(),
    format.printf(info => `${info.timestamp} (${info.service_name}) [${info.ips|| '-'}] [${info.level}] ${info.message}`),
);

const logger =
    winston.createLogger({
        level: environment !== 'dev' ? 'info' : 'debug',
        transports: [
            new winston.transports.File({
                // level: 'info',
                filename: `${logDirectory}/wpi_${service_name}.log`,
                handleExceptions: true,
                maxsize: 5242880, // 5MB
                maxFiles: 5,
                format: jsonWithTimeAndIp,
            }),
            new winston.transports.Console({
                // level: 'debug',
                handleExceptions: true,
                format: consoleWithTimeAndIp,
            }),
        ]
    });

module.exports.logger = logger;
module.exports.actionLoggerI = (parent, action, data, response) => {
    logger.info(util.inspect({parent : parent, action : action, data: data, response :response}), {depth:null});
};
module.exports.actionLoggerE = (parent, action, data, response) => {
    logger.error(util.inspect({parent : parent, action : action, data: data, response :response}));
};
