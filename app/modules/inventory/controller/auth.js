const model = require('../model/auth')

const login = (req, res) => {
    
    const userInput = req.body

    model.login(userInput, (result, err) => {
        //if no result return error
        if (!result) {
            res.status(403).json({
                result: "ERROR",//return error
                message: err//return error message
            });
        } else {
            //return success upon matched account
            res.status(200).json({
                result: "success",//return success
                user: result //return email and user level for user level routing
            });
        }
    })
}

module.exports = { login }