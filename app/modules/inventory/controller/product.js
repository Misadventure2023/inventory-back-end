const model = require('../model/products')

const getProduct = (req, res) => {
    model.getProduct((result, err) => {
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
const createProduct = (req, res) => {
    model.createProduct(req, res, (result, err) => {
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

const deleteProduct = (req, res) => {
    const id = req.query.id
    model.deleteProduct(id, (result, err) => {
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

const updateProduct = (req, res) => {
    model.updateProduct(req, res, (result, err) => {
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

const searchProduct = (req, res) => {
    const searchKey = req.body.search
    model.searchProduct(searchKey, (result, err) => {
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

module.exports = { getProduct, createProduct, deleteProduct, updateProduct, searchProduct }