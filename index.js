const express=require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const ObjectId =require('mongodb').ObjectId;

const cors = require('cors');
require('dotenv').config()

const app=express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

 const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.o8wmq35.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//   const collection = client.db("addProduct").collection("product");
//   console.log("hitting the databage");


// collection.insertOne(user)
// .then(()=>{
//     console.log("insert success");
// })

// //   client.close();
// });
async function run(){
    try{
        await client.connect();
        const databage = client.db("addProduct");
        const usersCollection=databage.collection("product");

        //Get Api
        app.get('/users', async(req, res)=>{
            const getUser = usersCollection.find({});
            const users = await getUser.toArray();
            res.send(users)
        })

        // Post Api
        app.post('/users', async(req, res)=>{
            const newUser = req.body;
            const result = await usersCollection.insertOne(newUser);
            console.log("hit the post", req.body)
            console.log("addUser", result)
            res.json(result)
        });

        // Delete Api
        app.delete('/users/:id', async(req, res)=>{
            const id =req.params.id;
            const query= {_id: ObjectId(id)};
            const result =await usersCollection.deleteOne(query);

            console.log("delete id", result);
            res.json(result)
        })
            
    }
    
    finally{
        // await client.close();
    }
    
    
}
run().catch(console.dir)



app.get('/', (req, res)=>{
    res.send("my 2d serverd  g site");
});


// const users=[
//     {id:1, name:'shoman', email:'shoman@gmail.com'},
//     {id:2, name:'jahid', email:'shoman@gmail.com'},
//     {id:3, name:'sg', email:'shoman@gmail.com'},
//     {id:4, name:'fsd', email:'shoman@gmail.com'},
//     {id:5, name:'sg', email:'shoman@gmail.com'},
//     {id:6, name:'gsf', email:'shoman@gmail.com'},
// ]

// app.get('/users', (req,res)=>{
//     const search=req.query.search;
//     //use query parameter
//     if(search){
//         const searchResult=users.filter(user=>user.name.toLocaleLowerCase().includes(search));
//         res.send(searchResult);
//     }
//     else{
//         res.send(users)
//     }
   
// });


//app.Method
// app.post('/users',(req, res)=>{
//     const newUser=req.body;
//     newUser.id=users.length;
//     users.push(newUser);
//     res.json(newUser)
//     console.log("hitting the post", req.body);
//     // res.send("inside post")
// })
// dynamic api
// app.get('/users/:id',(req,res)=>{
//     const id=req.params.id;
//     const user =users[id]
//     res.send(user);
//     // console.log(req.params.id)
// })
app.listen(port,()=>{
    console.log('listen tto ',port);
})