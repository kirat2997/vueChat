const moment = require('moment')

const generateMessage = (from, text, textClass) => {
    const now = moment().valueOf()
    const createdAt =  moment(now).format('h:mm a')
    return {
        from,
        text,
        createdAt,
        textClass,
        key: moment().valueOf()
    }
}

module.exports = { generateMessage }
