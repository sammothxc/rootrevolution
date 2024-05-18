const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const WebSocket = require('ws');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('startup');
const userCollection = db.collection('userInfo');
//const seedCollection = db.collection('seed');

// This will asynchronously test the connection and exit the process if it fails
(async function testConnection() {
    await client.connect();
    await db.command({ ping: 1 });
})().catch((ex) => {
    console.log(`Unable to connect to database with ${url} because ${ex.message}`);
    process.exit(1);
});

function getUser(username) {
    return userCollection.findOne({ username: username });
}

function getUserByToken(token) {
    return userCollection.findOne({ token: token });
}

async function createUser(username, password, fullname, email, location, membersince, seeedsdonated, seedsreceived) {
    // Hash the password before we insert it into the database
    const passwordHash = await bcrypt.hash(password, 10);
    // FELUPMSST
    const user = {
        fullname: fullname,
        email: email,
        location: location,
        username: username,
        password: passwordHash,
        membersince: membersince,
        seedsdonated: seeedsdonated,
        seedsreceived: seedsreceived,
        token: uuid.v4(),
    };
    await userCollection.insertOne(user);
    return user;
}

// function deleteUser(username) {
//     return userCollection.deleteOne({username: username});
// }

async function deleteUser(username) {
    return await userCollection.deleteOne({ username: username });
}

module.exports = {
    getUser,
    getUserByToken,
    createUser,
    deleteUser
};