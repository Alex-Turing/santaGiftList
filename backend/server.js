/**
 * StAuth10244: I Alexander Hernandez, 000896328 certify 
 * that this material is my original work. No other person's 
 * work has been used without due acknowledgement. 
 * I have not made my work available to anyone else.
 */
require('dotenv').config();
const redis = require('redis');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const REDIS_PWD = process.env.REDIS_PWD;
const REDIS_HOST = process.env.REDIS_HOST;
const REDIS_PORT = process.env.REDIS_PORT;

const app = express();
const PORT = 3001;

app.use(bodyParser.json());

const client = redis.createClient({

    password: REDIS_PWD,
    socket: {
        host: REDIS_HOST,
        port: REDIS_PORT
    }
});

client.connect();

app.use(cors({ origin: 'http://localhost:8081' })); // Allow requests from my frontend

client.on('error', (err) => {
    console.error('Redis error: ', err);
});

async function initializeToDoList(){
    const exists = await client.exists('toDoList');
    
    if(!exists)
    {
        await client.set('toDoList', JSON.stringify([]));
    }
} 

app.get('/load', async function(req, res){
    const toDoList = await client.get('toDoList');
    res.json(JSON.parse(toDoList || []));
});

app.post('/save', async function(req, res){
    try
    {
        const toDoList = req.body;

        if(!Array.isArray(toDoList))
        {
            return res.status(400).json({error: 'Invalid toDoList format'});
        }

        await client.set('toDoList', JSON.stringify(toDoList));
        res.json({status: 'save successful'});
    }
    catch (err)
    {
        console.error('Error saving toDoList:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/clear', async function(req, res){
    await client.set('toDoList', JSON.stringify([]));
    res.json({status: 'clear successful'});
});

app.listen(PORT, async function(){
    await initializeToDoList();
    console.log(`Server running on http://localhost:${PORT}`);
})