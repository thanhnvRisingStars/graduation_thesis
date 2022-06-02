module.exports = function(sequelize, Sequelize) {
 
    var User = sequelize.define('user', {
 
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
 
        google_account_id: {
            type: Sequelize.STRING,
            notEmpty: true
        },
 
        email: {
            type: Sequelize.STRING,
            notEmpty: true
        },
 
        name: {
            type: Sequelize.STRING
        },
 
        avatar_link: {
            type: Sequelize.STRING
        },
    });
 
    return User;
 
}