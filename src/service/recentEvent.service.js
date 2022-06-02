const { recent_event } = require('../models');

const recentEventService = module.exports;

recentEventService.findAll = async () => recent_event.findAll();

recentEventService.createOne = async (event) => recent_event.create(event);

recentEventService.findByTitle = async(title) => recent_event.findOne({
    where: {
        title
    }
});

recentEventService.findById = async(id) => recent_event.findOne({
    where: {
        id
    }
});

recentEventService.removeEventByTitle = async (title) => recent_event.destroy({
    where: {
        title
    },
  });