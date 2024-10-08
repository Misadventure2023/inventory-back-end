const model = require('../model/users')

const getUsers = (req, res) => {
    model.getUsers((result, err) => {
        if (!result) {
            res.status(403).json({
                success: false, 
                server_response: `ERROR: something went wrong`,
                data: err
            });
        } else {
            //return success upon matched account
            res.status(200).json({
                success: true, 
                server_response: `ok`,
                data: result
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
                success: false, 
                server_response: `ERROR: something went wrong`,
                data: err
            });
        } else {
            //return success upon matched account
            res.status(200).json({
                success: true, 
                server_response: `ok`,
                data: result
            });
        }
    })
}

const deleteUser = (req, res) => {
    console.log(req.query);
    const id = req.query.id
    model.deleteUser(id, (result, err) => {
        if (err) {
            res.status(403).json({
                success: false, 
                server_response: `ERROR: something went wrong`,
                data: err
            })
        } else {
            res.status(200).json({
                success: true, 
                server_response: `ok`,
                data: result
            })
        }
    })
}

const updateUser = (req, res) => {
    model.updateUser(req, res, (result, err) => {
        if (err) return res.status(403).json({
            success: false, 
            server_response: `ERROR: something went wrong`,
            data: err
        });

        
        return res.status(200).json({
            success: true, 
            server_response: `ok`,
            data: result
        });

    })
}

const searchUser = (req, res) => {
    model.searchUser(req.body.search, (result, err) => {
        if (err) return res.status(403).json({
            success: false, 
            server_response: `ERROR: something went wrong`,
            data: err
        });

        
        return res.status(200).json({
            success: true, 
            server_response: `ok`,
            data: result
        });

    })
}

module.exports = { getUsers, createUser, deleteUser, updateUser, searchUser }