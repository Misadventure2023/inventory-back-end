const model = require('../model/category')

const getCategory = (req, res) => {
    model.getCategory((result, err) => {
        if (!result) {
            res.status(403).json({
                success: false, 
                server_response: `ERROR: something went wrong`,
                data: err
            });
        } else {
            res.status(200).json({
                success: true, 
                server_response: `ok`,
                data: result
            });
        }
    })
}
const createCategory = (req, res) => {
    model.createCategory(req, res, (result, err) => {
        if (!result) {
            res.status(403).json({
                success: false, 
                server_response: `ERROR: something went wrong`,
                data: err
            });
        } else {
            res.status(200).json({
                success: true, 
                server_response: `ok`,
                data: result
            });
        }
    })
}

const deleteCategory = (req, res) => {
    const id = req.query.id
    model.deleteCategory(id, (result, err) => {
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

const updateCategory = (req, res) => {
    model.updateCategory(req, res, (result, err) => {
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

const searchCategory = (req, res) => {
    const searchKey = req.body.search
    model.searchCategory(searchKey, (result, err) => {
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

module.exports = { getCategory, createCategory, deleteCategory, updateCategory, searchCategory }