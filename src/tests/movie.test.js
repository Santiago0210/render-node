const request = require('supertest');
const app = require('../app');
const Actor = require('../models/Actor');
const Director = require('../models/Director');
const Genre = require('../models/Genre');
require('../models');

let id;

test('Get/movies', async () =>{
    const res = await request(app).get('/movies');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);

});

test('Post/movies', async ()=> {
   const movie ={ 
    name: "Hellboy",
    image: "https://i.blogs.es/ac7535/hellboy-cartel/1366_2000.jpg",
    synopsis: "At the end of World War II, Nazi officers Karl Ruprecht Kroenen and Ilsa Haupstein start an experiment to raise the forces of Hell through Russian dark mystic Rasputin on a Scottish island, but it's interrupted by an Allied.",
    releaseYear: "2004",
    }
 const res = await request(app).post('/movies').send(movie);
 id = res.body.id;
expect(res.status).toBe(201);
expect(res.body.id).toBeDefined();
expect(res.body.name).toBe(movie.name);
});

test("Put/movies/:id", async() =>{
    const movie = {
        name: "Hellboy",
        image: "https://i.blogs.es/ac7535/hellboy-cartel/1366_2000.jpg",
        synopsis: "At the end of World War II, Nazi officers Karl Ruprecht Kroenen and Ilsa Haupstein start an experiment to raise the forces of Hell through Russian dark mystic Rasputin on a Scottish island, but it's interrupted by an Allied.",
        releaseYear: 2004,
    }
    const res = await request(app).put(`/movies/${id}`).send(movie);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(movie.name);
});

test("Post/movies/:id/actors", async () =>{
    
    const actor = await Actor.create({firstName: "Ronald",
    lastName: "Perlman",
    nationality: "USA",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Ron_Perlman_Photo_Op_GalaxyCon_Raleigh_2019.jpg/220px-Ron_Perlman_Photo_Op_GalaxyCon_Raleigh_2019.jpg",
    birthday: "04-13-1950"});
     const res = await request(app)
     .post(`/movies/${id}/actors`)
     .send([actor.id]);
    await actor.destroy();
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1)
});
test("Post/movies/:id/directors", async () =>{
    
    const director = await Director.create({
        firstName: "Guillermo",
        lastName: "del Toro",
        nationality: "Mexico",
        image: "https://media.vogue.mx/photos/639dffb4032129c563966a05/2:3/w_1600,c_limit/guillermo-del-toro.jpg",
        birthday: "09-10-1969",
    });
     const res = await request(app)
     .post(`/movies/${id}/directors`)
     .send([director.id]);
    await director.destroy();
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1)
});

test("Post/movies/:id/genres", async () =>{
    
    const genre = await Genre.create({
        name: "Action",
    });
     const res = await request(app)
     .post(`/movies/${id}/genres`)
     .send([genre.id]);
    await genre.destroy();
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1)
});


test ("Delete/movies/:id", async () => {
    const res = await request(app).delete('/movies/'+id);
    expect(res.status).toBe(204);
});