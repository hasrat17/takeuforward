const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();

// connecting to PSQL 
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

console.log("=====connected to db====");


app.use(cors());
app.use(bodyParser.json());

// Retrieve banner data
app.get('/api/banner', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM ineedthisjob where id=1');
        return res.status(200).json(result.rows[0]);
    } catch (err) {
        console.error('getting error in get ', err.message);
        return res.status(500).send('Server Error');
    }
});

// updating banner data
app.put('/api/banner', async (req, res) => {
    
    const { description, timer, link, imageUrl } = req.body;
    
    const client = await pool.connect(); 
    
    try {
        await client.query('BEGIN');

        // here if the db is empty then we will insert data with ID 1 
        const result = await client.query(
            `INSERT INTO ineedthisjob (id, description, timer, link, image_url)
             VALUES (1, $1, $2, $3, $4)
             ON CONFLICT (id)
             DO UPDATE SET description = EXCLUDED.description,
                           timer = EXCLUDED.timer,
                           link = EXCLUDED.link,
                           image_url = EXCLUDED.image_url
             RETURNING *`,
            [description, timer, link, imageUrl]
        );
        
        if (result.rowCount === 0) {
            await client.query('ROLLBACK');
            return res.status(404).send('Banner not found or no update made');
        }

        await client.query('COMMIT');  

        return res.status(200).send('Banner updated successfully');
    } catch (err) {
        await client.query('ROLLBACK');  
        console.error('Error in PUT /api/banner:', err.message);
        return res.status(500).send('Server Error');
    } finally {
        client.release(); 
    }
});


