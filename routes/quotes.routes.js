const express = require('express');
const { json } = require('express/lib/response');

const quotesControllers = require('../controllers/quotes.controller');
const fileUploader = require('../middlewares/file-upload');


const router = express.Router();



router.get('/quotes', (req, res, next) => {
    
    res.json({message:'It Works'});
});



router.delete('/:pid', quotesControllers.deleteNote);

router.get('/', quotesControllers.getQuote2);

router.post('/', quotesControllers.createQuote);

router.post('/note', quotesControllers.createNote);

router.get('/sidebar', quotesControllers.getSide );

router.get('/clothes', quotesControllers.clothes);

router.get('/test1/:pid', quotesControllers.findClothes);

router.post('/createclothes', fileUploader.single('image') , quotesControllers.createClothes);


module.exports = router;
