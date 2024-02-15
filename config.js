// we will use production config from direct file
module.exports = {
    port : process.env.PORT,
    host : process.env.HOST,
    environment : process.env.ENVIRONMENT,
    service_name : process.env.SERVICE_NAME,
    base_url : process.env.TZ_BASE_URL,
    tz_api_ver:process.env.TZ_API_VERSION,
    mysql : {
        host : process.env.MYSQL_HOST,
        port : process.env.MYSQL_PORT,
        user : process.env.MYSQL_USER,
        password : process.env.MYSQL_PASSWORD,
        database : process.env.MYSQL_DATABASE,
    }
}

    

