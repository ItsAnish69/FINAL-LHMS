const logger = (req, res, next)=> {
    console.log(`[${new Date().toString()}] ${req.method} ${req.originalUrl}`)
    next();
}

module.exports = logger;