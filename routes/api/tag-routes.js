const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// GET all tags with associated Products
router.get('/', async (req, res) => {
    try {
        const tags = await Tag.findAll({
            include: [{ model: Product, through: ProductTag }]
        });
        res.json(tags);
    } catch (error) {
        res.status(500).json(error);
    }
});

// GET a single tag by ID with associated Products
router.get('/:id', async (req, res) => {
    try {
        const tag = await Tag.findOne({
            where: { id: req.params.id },
            include: [{ model: Product, through: ProductTag }]
        });
        if (!tag) {
            res.status(404).json({ message: 'No tag found with this id!' });
            return;
        }
        res.json(tag);
    } catch (error) {
        res.status(500).json(error);
    }
});

// POST to create a new tag
router.post('/', async (req, res) => {
    try {
        const newTag = await Tag.create({
            name: req.body.name
        });
        res.status(201).json(newTag);
    } catch (error) {
        res.status(400).json(error);
    }
});

// PUT to update a tag by its ID
router.put('/:id', async (req, res) => {
    try {
        const updated = await Tag.update({ name: req.body.name }, {
            where: { id: req.params.id }
        });
        if (updated == 0) {
            res.status(404).json({ message: 'No tag found with this id!' });
            return;
        }
        res.json({ message: 'Tag updated successfully!' });
    } catch (error) {
        res.status(400).json(error);
    }
});

// DELETE a tag by its ID
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await Tag.destroy({
            where: { id: req.params.id }
        });
        if (!deleted) {
            res.status(404).json({ message: 'No tag found with this id!' });
            return;
        }
        res.json({ message: 'Tag deleted!' });
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;