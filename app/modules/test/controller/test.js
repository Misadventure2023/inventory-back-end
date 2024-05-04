const model = require('../model/test')

const test = (req, res) => {
    console.log('test model --->')
    model.test('req', () => {
        console.log('this is the callback from controller');
        res.json({
            message: 'successss'
        })
    })
}

module.exports = { test }