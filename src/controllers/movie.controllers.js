const catchError = require('../utils/catchError');
const Movie = require('../models/Movie');
const Genre = require('../models/Genre');
const Actor = require('../models/Actor');
const Director = require('../models/Director');

const getAll = catchError(async(req, res) => {
    const results = await Movie.findAll({include:[Director, Actor, Genre]});
    return res.json(results);
});

const create = catchError(async(req, res) =>{
    const results = await Movie.create(req.body);
    return res.status(201).json(results);
})

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Movie.findByPk(id);
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    await Movie.destroy({ where: {id} });
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Movie.update(
        req.body,
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

const setmoviegenres = catchError(async(req, res) => {
    const {id} = req.params;
    const movie = await Movie.findByPk(id);
    if(!movie) return res.status(404).json({message: "genre not found"});
    await movie.setGenres(req.body);
    const genres = await movie.getGenres();
    return res.json(genres);
});
const setmovieactors = catchError(async(req, res) => {
    const {id} = req.params;
    const movie = await Movie.findByPk(id);
    if(!movie) return res.status(404).json({message: "actor not found"});
    await movie.setActors(req.body);
    const actors = await movie.getActors();
    return res.json(actors);
})
const setmoviedirectors = catchError(async(req, res) => {
    const {id} = req.params;
    const movie = await Movie.findByPk(id);
    if(!movie) return res.status(404).json({message: "director not found"});
    await movie.setDirectors(req.body);
    const directors = await movie.getDirectors();
    return res.json(directors);
})

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update,
    setmoviegenres,
    setmovieactors,
    setmoviedirectors
}