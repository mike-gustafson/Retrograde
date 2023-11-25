'use strict'

const rng = require('../utils/random-number-generator.util');
const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');


router.get('/', async (req, res) => {
    const filePath = path.join('__dirname ', '..', 'data', 'quotes.json');
    let quotes = await fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
            console.log(err);
        } else {
            quotes = JSON.parse(data);
            let random = rng(1, quotes.length);
            res.json({ quote: quotes[random].quote, attrib: quotes[random].attrib });
        }
    });
});

module.exports = router;