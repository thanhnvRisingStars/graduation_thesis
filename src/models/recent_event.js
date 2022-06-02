module.exports = function(sequelize, Sequelize) {
 
    const recentEvent = sequelize.define('recent_event', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
 
        title: {
            type: Sequelize.STRING,
            notEmpty: true
        },
 
        description: {
            type: Sequelize.TEXT('long'),
            notEmpty: true
        },
        image_name: {
            type: Sequelize.STRING,
            notEmpty: true
        },
        action_time: {
            type: Sequelize.STRING,
            notEmpty: true
        },
    });
 
    return recentEvent;
 
}