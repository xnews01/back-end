const express = require('express');
const bodyParser = require('body-parser');

const path = require('path');

const enabledCors = require('./middlewares/cors');

const quoteRoutes = require('./routes/quotes.routes');
const res = require('express/lib/response');

const app = express();

app.use(enabledCors);

app.use(bodyParser.json());

app.use('/data/images', express.static(path.join('data','images')));


app.use('/api', quoteRoutes);

app.use((error, req, res, next) => {
    if(res.headerSent) {
        return next(error);
    }
    res.status(error.code | 500).json({message: error.message || 'No sure what happened'});
});

app.listen(3000, () => {
    console.log('Listening on port 3000')
});


// app.get('/quote', (req, res, next) => {
//     res.json({
//         quote: 'Suck My Dinner'
//     });
//     });