//HUfLi3LHdZNMXiOE
const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');

require('dotenv').config()
const ObjectId = require('mongodb').ObjectId;
const { query } = require('express');
const app = express();
const port =process.env.PORT|| 5000;

// middleware
app.use(cors());
app.use(express.json());

// const uri = ` mongodb+srv://databse:HUfLi3LHdZNMXiOE@cluster0.ow5x2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority  `;
const uri = ` mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ow5x2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority  `;
console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        await client.connect()
        const database = client.db('tourListsT')
        const tourCollection = database.collection('toursist')

        // const database = client.db('travel')
        const dataCollection = database.collection('traveldata')

        //  //get All Products
        app.get('/toursist', async (req, res) => {
            const id = tourCollection.find({})
            const result = await id.toArray()
            res.send(result)
            // console.log(connected);
            // console.log(result);
        })
        app.get('/orders', async (req, res) => {
            const id = tourCollection.find({})
            const result = await id.toArray()
            res.send(result)
        })
        //Add Events
        app.post('/toursist', async (req, res) => {
            const service = req.body;
            // console.log('hit the post api', service);

            const result = await tourCollection.insertOne(service);
            // console.log(result);
            res.send(result)
        });
        //http://stormy-coast-94004.herokuapp.com/toursist
        //order
        app.post('/traveldata', async (req, res) => {
            const order = req.body
            const result = await dataCollection.insertOne(order)
            res.send(result)

        })
        app.get('/traveldata', async (req, res) => {
            const id = dataCollection.find({})
            console.log(id);
            const result = await id.toArray()
            // console.log(result);
            res.send(result)

        })
        app.get('/traveldata/:id', async (req, res) => {
            const user = req.params.id
            const quarry = { _id: ObjectId(user) }
            const result = await dataCollection.findOne(quarry)
            res.send(result)

        })

        app.get('/single/:id', async (req, res) => {

            const user = req.params.id
            const quarry = { _id: ObjectId(user) }
            const result = await tourCollection.findOne(quarry)
            res.send(result)
        })

       

        //delet product
        app.delete('/productD/:id', async (req, res) => {
            const id = req.params.id
            const quarry = { _id: ObjectId(id) }
           
            const deleting = await dataCollection.deleteOne(quarry)
            res.send(deleting)
          
        })
        app.delete('/singledatadelet/:id', async (req, res) => {
           const id=req.params.id
           const quarry={_id:ObjectId(id)}
           const deleteData=await dataCollection.deleteOne(quarry)
           res.send(deleteData)
          
        })
        //orders
        app.get('/order', async (req, res) => {
            const user = tourCollection.find({})
            const result =await user.toArray()
            res.send(result)
        })

    }
    finally {
        // await client.close()
    }
}
run().catch(console.dir)

app.get('/', (req, res) => {
    res.send('Running my CRUD Server');
});

app.listen(port, () => {
    console.log('Running Server on port', port);
})

 
// https://stormy-coast-94004.herokuapp.com/

//https://github.com/programming-hero-web-course1/tourism-or-delivery-website-client-side-alamin7al

//https://github.com/programming-hero-web-course1/tourism-or-delivery-website-server-side-alamin7al.git