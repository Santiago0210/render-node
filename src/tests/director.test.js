const request = require('supertest');
const app = require('../app');

let id;

test('Get/directors', async () =>{
    const res = await request(app).get('/directors');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);

});

test('Post/directors', async ()=> {
   const director ={ 
    "firstName": "Guillermo",
        "lastName": "del Toro",
        "nationality": "Mexico",
        "image": "https://media.vogue.mx/photos/639dffb4032129c563966a05/2:3/w_1600,c_limit/guillermo-del-toro.jpg",
        "birthday": "09-10-1969",
    }
 const res = await request(app).post('/directors').send(director);
 id = res.body.id;
expect(res.status).toBe(201);
expect(res.body.id).toBeDefined();
expect(res.body.firstName).toBe(director.firstName);
});

test("Put/directors/:id", async() =>{
    const director = {
        "firstName": "Guillermo",
        "lastName": "del Toro",
        "nationality": "Mexico",
        "image": "https://media.vogue.mx/photos/639dffb4032129c563966a05/2:3/w_1600,c_limit/guillermo-del-toro.jpg",
        "birthday": "09-10-1969",
    }
    const res = await request(app).put(`/directors/${id}`).send(director);
    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe(director.firstName);
});

test ("Delete/directors/:id", async () => {
    const res = await request(app).delete('/directors/'+id);
    expect(res.status).toBe(204);
});