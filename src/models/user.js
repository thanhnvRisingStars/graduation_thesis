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
        birthday: {
            type: Sequelize.STRING,
            allowNull: true
        },
        address: {
            type: Sequelize.STRING,
            allowNull: true
        },
        name: {
            type: Sequelize.STRING
        },
        avatar_link: {
            type: Sequelize.STRING
        },
        phone_number: {
            type: Sequelize.STRING,
            allowNull: true
        },
        facebookLink: {
            type: Sequelize.STRING,
            allowNull: true
        },
    });
 
    return User;
 
}