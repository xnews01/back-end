// const mongoose = require('mongoose');
// mongoose.connect('mongodb://10.0.1.114:27017/noteDB')
// .then (() => console.log ('connected to mongodb..'))
// .catch(err => console.log('error', err))

const { ObjectId } = require('mongodb');




const MongoClient = require('mongodb').MongoClient;
const url2 = 'mongodb://10.0.1.114:27017/noteDB';
const url = 'mongodb://10.0.1.114:27017/noteDB';
const uri = "mongodb+srv://darko1:EgdtQIWU5Zzsz1uc@cluster0.zssrv.mongodb.net/?retryWrites=true&w=majority";

const DummyP = [
    {
        id: "1",
        title: 'To Do',
        body: 'Plan Dinner'
        
    },
    {
        id: "2",
        title: 'To Do',
        body: 'Plan Dinner'
        
    }
]

// async function getNotes() {
//     const Notes69= await 
// }


function getRandomQuote(req, res, next) {
res.json( {
    quote: 'A Sucker is born everyday'
} )
};

let clothes2;
const clothes = async (req, res, next) =>{
    const client = new MongoClient(url);

    try{
        await client.connect();
        const db = client.db();
        clothes2 = await db.collection('clothes_test2').find().toArray();
    } catch(error) {
        return res.json({message:'nice two error'})
    }
    client.close();
    res.json({clothes2});
    console.log(clothes2);
}

let products2;
const getSide = async (req, res, next) =>{
    const client = new MongoClient(url);
    try{
        await client.connect();
        const db = client.db();
        products2 = await db.collection('notes').find({ 'rating':{$gt:2}}).toArray();
    } catch(error) {
        return res.json({message:'nice two error'})
    }
    client.close();
    res.json({products2});
    console.log(products2);
}


let products;
const getQuote2 = async (req,res,next) =>{
    const client = new MongoClient(url);
    try {
        await client.connect();
        const db = client.db();
        products = await db.collection('notes').find().toArray();
        

    } catch (error) {
        return res.json({message:'nice one error'})
    }
    client.close();
    res.json({products});
    
}

const getQuote = (req, res, next) => {
    const placeId = req.params.pid;
    const place = DummyP.find(p=> {
        console.log(p.id)
        return p.id == placeId
    });
    
    if(!place) {
        const error = new Error('Not found test1');
        error.code = 404;
        return next(error);
    }
    
    res.json({ place });
};


function createQuote(req, res, next) {
    const{ id, title, body } = req.body;

    const createQ = {id, title, body};

    DummyP.push(createQ);
    
    res.status(201).json({createQ})


};

const deleteNote = async(req, res, next) => {

    console.log('testing')
    
    const delNote = req.params.pid;
    
    const client = new MongoClient(url);

    
    

    try {
        await client.connect();
        const db = client.db();
        db.collection('notes').deleteOne( {'_id':ObjectId(delNote)});
        console.log(delNote);

    } catch(error) {
        return res.json({message: 'not connect'});
    };

};




const createClothes = async(req, res, next) => {
    const egg = req.file;
    const newNote = {
        colorCode: req.body.colorCode,
        clothesType: req.body.clothesType,
        location: req.body.location,
        season: req.body.season,
        details: req.body.details,
        rating: req.body.rating1,
        image: 'http://10.0.1.109:3000/'+ egg.path
        //changed title and body to title and content
    };
    const client = new MongoClient(url);
    

    try {
        await client.connect();
        const db = client.db();
        const result = db.collection('clothes_test2').insertOne(newNote);
        

    } catch(error) {
        return res.json({message: 'not connect'});
    };
    
    
    
};


const createNote = async(req, res, next) => {
    const newNote = {
        title: req.body.title,
        body: req.body.body,
        date: req.body.date1,
        rating: req.body.rating1
        //changed title and body to title and content
    };
    const client = new MongoClient(url);
    

    try {
        await client.connect();
        const db = client.db();
        const result = db.collection('notes').insertOne(newNote);
        console.log(newNote.rating );

    } catch(error) {
        return res.json({message: 'not connect'});
    };
    
    res.json(newNote);
    
};


const findClothes = async(req, res, next) => {

    console.log('testing')
    
    const fndClothes = req.params.pid;
    
    const client = new MongoClient(url);

    
    

    try {
        await client.connect();
        const db = client.db();
        db.collection('clothes_test2').find( {'clothesType':fndClothes});
        console.log(delNote);

    } catch(error) {
        return res.json({message: 'not connect'});
    };

};



exports.getRandomQuote = getRandomQuote;
exports.createQuote = createQuote;
exports.getQuote = getQuote;
exports.getQuote2 = getQuote2;
exports.createNote = createNote;
exports.deleteNote = deleteNote;
exports.getSide = getSide;
exports.clothes = clothes;
exports.createClothes = createClothes;
exports.findClothes = findClothes;
