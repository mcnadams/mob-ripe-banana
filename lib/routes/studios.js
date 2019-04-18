const { Router } = require('express');
const Studio = require('../models/Studio');

module.exports = Router()
  .post('/', (req, res, next) => {
    const {
      name,
      address: {
        city, 
        state,
        country
      }
    } = req.body;

    Studio
      .create({ name, address: { city, state, country } })
      .then(studio => res.send(studio))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Studio
      .find()
      .select({
        _id: true,
        name: true
      })
      .lean()
      .then(listOfStudios => res.send(listOfStudios))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Studio
      .findById(req.params.id)
      .select({
        __v: false
      })
      .lean()
      .then(studio => res.send(studio))
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    Studio
      .findByIdAndDelete(req.params.id)
      .select({
        _id: true
      })
      .lean()
      .then(deleted => res.send(deleted));
  });
