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

app.get('/:id', (req, res) => {
    const projectId = req.params.id;
    const project = projects.find(({ id }) => id === +projectId);

    if (project) {
        res.render('project', { project });
    }
    else {
        res.sendStatus(404);
    }
});

app.listen(3000, () => {
    console.log('The application is running on localhost:3000');
});