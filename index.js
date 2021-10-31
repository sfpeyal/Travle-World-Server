const express = require('express');
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
require('dotenv').config();
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;


//middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.apvaz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });



async function run() {

    try {
        await client.connect();
        const database = client.db('online_Booking');
        const bookCollection = database.collection('books');


        //GET API
        app.get('/books', async (req, res) => {
            const cursor = bookCollection.find({});
            const books = await cursor.toArray();
            res.send(books);
        });


        //GET API BY SINGLE ID
        app.get('/books/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const books = await bookCollection.findOne(query);
            res.send(books);
        });



    }
    finally {
        // await client.close();
    }
}


run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log('your server is running at port', port);
})