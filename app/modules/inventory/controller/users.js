const model = require('../model/users')

const getUsers = (req, res) => {
    model.getUsers((result, err) => {
        if (!result) {
            res.status(403).json({
                result: "ERROR", // return error
                message: err // return error message
            });
        } else {
            //return success upon matched account
            res.status(200).json({
                result: "success", // return success
                users: result // return users list
            });
        }
    })
}
const createUser = (req, res) => {
    console.log(req.body);
    const payload = req.body
    model.createUser(payload, req, res, (result, err) => {
        if (!result) {
            res.status(403).json({
                result: `ERROR: something went wrong`, // return error
                message: err // return error message
            });
        } else {
            //return success upon matched account
            res.status(200).json({
                result: "success", // return success
                users: result // return users list
            });
        }
    })
}

module.exports = { getUsers, createUser }