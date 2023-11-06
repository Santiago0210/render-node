const actorRouter = require("../routes/actor.router");
const Actor = require("./Actor");
const Director = require("./Director");
const Genre = require("./Genre");
const Movie = require("./Movie");






Movie.belongsToMany(Genre, {through: "movieGenre"});
Genre.belongsToMany(Movie, {through: "movieGenre"});

Movie.belongsToMany(Director, {through: "movieDirector"});
Director.belongsToMany(Movie, {through: "movieDirector"});

Movie.belongsToMany(Actor, {through: "movieActor"});
Actor.belongsToMany(Movie, {through: "movieActor"});