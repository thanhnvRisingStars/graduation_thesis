module.exports = function(sequelize, Sequelize) {
 
    const EventRegister = sequelize.define('event_register', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        user_id: {
            type: Sequelize.INTEGER,
            notEmpty: true
        },
        event_id: {
            type: Sequelize.INTEGER,
            notEmpty: true
        },
    });
 
    return EventRegister;
 
}