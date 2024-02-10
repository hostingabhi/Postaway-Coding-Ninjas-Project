import winston from 'winston';

const logger = winston.createLogger({
    level:'info',
    format: winston.format.json(),
    defaultMeta:{service:'request-logging'},
    transports:[
        new winston.transports.File({filename:'logs.log'})
    ]
});

const loggerMiddleware = async(req,res,next)=>{
    //1. log request body
    if (!req.url.includes('signup') && !req.url.includes('signin')){
        const logData = `${req.url} - ${JSON.stringify(req.body)}`;
        logger.info(logData)
    }
    next();
};

export default loggerMiddleware;
