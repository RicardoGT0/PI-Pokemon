const { Team, Pokemon } = require('../../database')

module.exports = async (UserID) => {
    return await Team.findAll({ where: {UserID} })
    
}