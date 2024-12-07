const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 4000;
// middleware
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.user_DB}:${process.env.user_Pass}@cluster0.o0hep.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {

    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // database add
        const movies_DB = client.db("movies_DB");
        const movies = movies_DB.collection("movies");
        const users = movies_DB.collection("users");
        const favMovies = movies_DB.collection("favMovies");


         // movies sereverside
        // read movies
        app.get('/movies', async (req, res) => {
            const cursor = movies.find();
            const result = await cursor.toArray();
            res.send(result);
        })
         //read movies by id
         app.get('/movies/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const result = await movies.findOne(query);
            res.send(result);
        })
        // add movie
        app.post('/movies', async (req, res) => {
            const newMovie = req.body;
            console.log(newMovie);
            const result = await movies.insertOne(newMovie)
            res.send(result)
        })
         // edit movies
         app.put('/movies/:id', async (req, res) => {
            const id = req.params.id;
            const updateCoffee = req.body;
            const filter = { _id: new ObjectId(id) }
            const options = { upsert: true };
            const coffee = {
                $set: {
                    title: updateCoffee.title,
                    poster: updateCoffee.poster,
                    duration: updateCoffee.duration,
                    release_year: updateCoffee.release_year,
                    genre: updateCoffee.genre,
                    ratingValue: updateCoffee.ratingValue,
                    summary: updateCoffee.summary,

                }
            }
            const result = await movies.updateOne(filter, coffee, options);
            res.send(result);
        })
        // delete movie
        app.delete('/movies/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const result = await movies.deleteOne(query)
            res.send(result)
        })

        // users server side
        // read user
        app.get('/users', async (req, res) => {
            const cursor = users.find();
            const result = await cursor.toArray();
            res.send(result);
        })
        //create user
        app.post('/users', async (req, res) => {
            const newUser = req.body;
            console.log(newUser);
            const result = await users.insertOne(newUser)
            res.send(result)
        })

         // Favorite Movie Server
        // read favorite movies
        app.get('/favorite', async (req, res) => {
            const cursor = favMovies.find();
            const result = await cursor.toArray();
            res.send(result);
        })
        // create favorite movies
        app.post('/favorite', async (req, res) => {
            const newFav = req.body;
            console.log(newFav);
            const result = await favMovies.insertOne(newFav)
            res.send(result)
        })



        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);



app.get('/', async (req, res) => {
    res.send("Orchid Movie Server is Running")
})

app.listen(port, () => {
    console.log("Coffe serever is running on Port:", port)
})