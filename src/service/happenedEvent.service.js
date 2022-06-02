const { happened_event } = require('../models');

const happenedEventService = module.exports

happenedEventService.findEventByTimeAndTitle = async(action_time, title) => happened_event.findOne({
    where: {
        action_time,
        title
    }
});

happenedEventService.findAll = async() => happened_event.findAll();

happenedEventService.filter = async(condition) => happened_event.findAll({
    where: condition
});

happenedEventService.createOne = async (event) => happened_event.create(event);
