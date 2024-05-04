
module.exports = { 
    test: (req, callback) => {
        const callbackReturn = req

        callback(() => {
            return callbackReturn
        })
    } 
}