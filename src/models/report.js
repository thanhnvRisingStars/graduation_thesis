module.exports = function(sequelize, Sequelize) {
 
    var Report = sequelize.define('report', {
 
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        motel_id: {
            type: Sequelize.INTEGER,
            notEmpty: true
        },
        reason_id: {
            type: Sequelize.INTEGER,
            notEmpty: true
        },
        user_id: {
            type: Sequelize.INTEGER,
            notEmpty: true
        },
    });

    return Report;
 
}