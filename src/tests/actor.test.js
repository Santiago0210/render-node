const request = require('supertest');
const app = require('../app');

let id;

test('Get/actors', async () =>{
    const res = await request(app).get('/actors');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);

});

test('Post/actors', async ()=> {
   const actor ={ 
    firstName: "Ronald",
    lastName: "Perlman",
    nationality: "USA",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Ron_Perlman_Photo_Op_GalaxyCon_Raleigh_2019.jpg/220px-Ron_Perlman_Photo_Op_GalaxyCon_Raleigh_2019.jpg",
    birthday: "04-13-1950"
    }
 const res = await request(app).post('/actors').send(actor);
 id = res.body.id;
expect(res.status).toBe(201);
expect(res.body.id).toBeDefined();
expect(res.body.firstName).toBe(actor.firstName);
});

test("Put/actors/:id", async() =>{
    const actor = {
        firstName: "Ronald",
        lastName: "Perlman",
        nationality: "USA",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Ron_Perlman_Photo_Op_GalaxyCon_Raleigh_2019.jpg/220px-Ron_Perlman_Photo_Op_GalaxyCon_Raleigh_2019.jpg",
        birthday: "04-13-1950"
    }
    const res = await request(app).put(`/actors/${id}`).send(actor);
    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe(actor.firstName);
});

test ("Delete/actors/:id", async () => {
    const res = await request(app).delete('/actors/'+id);
    expect(res.status).toBe(204);
});