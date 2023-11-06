const { getAll, create, getOne, remove, update, setmoviegenres, setmovieactors, setmoviedirectors } = require('../controllers/movie.controllers');
const express = require('express');

const movieRouter = express.Router();

movieRouter.route('/')
    .get(getAll)
    .post(create);

movieRouter.route('/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

movieRouter.route('/:id/genres')
        .post(setmoviegenres);

movieRouter.route('/:id/actors')
        .post(setmovieactors);

movieRouter.route('/:id/directors')
        .post(setmoviedirectors);

module.exports = movieRouter;