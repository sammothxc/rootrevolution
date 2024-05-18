const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const express = require('express');
const app = express();
const DB = require('./database.js');
const authCookieName = 'token';
const { peerProxy } = require('./peerProxy.js');

const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json());
app.use(express.static('public'));
app.use(cookieParser());
app.set('trust proxy', true);

const apiRouter = express.Router();
app.use(`/api`, apiRouter);

apiRouter.post('/auth/create', async (req, res) => {
    if (await DB.getUser(req.body.username)) {
        res.status(409).send({ msg: 'Existing user' });
    } else {
        const user = await DB.createUser(req.body.username, req.body.password, req.body.fullname, req.body.email, req.body.location, req.body.membersince, req.body.seedsdonated, req.body.seedsreceived);

        setAuthCookie(res, user.token);

        res.send({
            id: user._id,
        });
    }
});

apiRouter.post('/auth/login', async (req, res) => {
    const user = await DB.getUser(req.body.username);
    if (user) {
        if (await bcrypt.compare(req.body.password, user.password)) {
        setAuthCookie(res, user.token);
        res.send({ id: user._id });
        return;
        }
    }
    res.status(401).send({ msg: 'Unauthorized' });
});

apiRouter.delete('/auth/logout', (_req, res) => {
    res.clearCookie(authCookieName);
    res.status(204).end();
});

apiRouter.get('/user/:username', async (req, res) => {
    const user = await DB.getUser(req.params.username);
    if (user) {
        const token = req?.cookies.token;
        res.send({ username: user.username, authenticated: token === user.token });
        return;
    }
    res.status(404).send({ msg: 'Unknown' });
});

apiRouter.get('/uinfo', async (req, res) => {
    const authToken = req.cookies.token;
    const user = await DB.getUserByToken(authToken);
    if (user) {
        // FELUPMSST
        res.send({
            fullname: user.fullname,
            email: user.email,
            location: user.location,
            username: user.username,
            membersince: user.membersince,
            seedsdonated: user.seedsdonated,
            seedsreceived: user.seedsreceived
        });
    } else {
        res.status(401).send({ msg: 'Unauthorized' });
    }
});

var secureApiRouter = express.Router();
apiRouter.use(secureApiRouter);

secureApiRouter.use(async (req, res, next) => {
    authToken = req.cookies[authCookieName];
    const user = await DB.getUserByToken(authToken);
    if (user) {
        next();
    } else {
        res.status(401).send({ msg: 'Unauthorized' });
    }
});

app.use(function (err, req, res, next) {
    res.status(500).send({ type: err.name, message: err.message });
});

function setAuthCookie(res, authToken) {
    res.cookie(authCookieName, authToken, {
        secure: true,
        httpOnly: true,
        sameSite: 'strict',
    });
}

app.use((_req, res) => {
    res.sendFile('index.html', { root: 'public' });
});

apiRouter.delete('/del/:username', async (req, res) => {
    try {
        const username = req.params.username;
        const result = await DB.deleteUser(username);

        if (result.deletedCount === 1) {
            res.status(200).send({ msg: 'User account deleted successfully' });
            return 0;
        } else {
            res.status(404).send({ msg: 'User account not found' });
            return 2;
        }
    } catch (error) {
        console.error('Error deleting user account:', error);
        res.status(500).send({ msg: 'Internal server error' });
        return 1;
    }
});

const httpService = app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
peerProxy(httpService);