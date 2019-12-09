// REQUIRING files
const express = require('express');
//const router = express.Router();
const { projects } = require('./data.json');



// SETTING view engine
const app = express();
app.set('view engine', 'pug');

// SERVING static
app.use(express.static('public'));

// ROUTES
app.get('/', (req, res) => {
    res.render('index', { projects });
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/:id', (req, res, next) => {
    const projectId = req.params.id;
    const project = projects.find(({ id }) => id === +projectId);

    if (project) {
        res.render('project', { project });
    }
    else {
        console.log("404 Error")
        const err = new Error('The page was not found');
        err.status = 404;
        next(err);
    }
});

// Updated based on: https://teamtreehouse.com/community/rangeerror-invalid-status-code-undefined-when-linking-to-another-page
app.use((err, req, res, next) => {
    res.locals.error = err;
    if (err.status >= 100 && err.status < 600)
        res.status(err.status);
    else
        res.status(500);
    res.render('error', err);
})

app.listen(3000, () => {
    console.log('The application is running on localhost:3000');
});