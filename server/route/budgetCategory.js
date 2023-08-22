const express = require("express");

const router = express.Router();

router.get('/', (req, res) => {
    res.json({
        "test": "get all"
    });
});

router.get('/:id', (req, res) => {
    res.json({
        "test": "get single"
    });
});

router.post('/', (req, res) => {
    res.json({
        "test": "post single"
    });
});

router.delete('/:id', (req, res) => {
    res.json({
        "test": "delete single"
    });
});

router.patch('/:id', (req, res) => {
    res.json({
        "test": "patcj single"
    });
});

module.exports = router;