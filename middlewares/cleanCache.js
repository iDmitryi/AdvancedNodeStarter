const { clearHash } = require("../services/cache");


module.exports =async (req, res, next) => {
    await next() // do eveything that service need to do

    clearHash(req.user.id)
}