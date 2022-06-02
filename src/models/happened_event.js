module.exports = function(sequelize, Sequelize) {
 
    const EventAnnual = sequelize.define('happened_event', {
 
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
        year: {
            type: Sequelize.INTEGER,
            notEmpty: true
        },
 
    });
 
    return EventAnnual;
 
}