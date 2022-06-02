module.exports = function(sequelize, Sequelize) {
 
    const EventAnnual = sequelize.define('annual_event', {
 
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
 
    });
 
    return EventAnnual;
 
}