const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll({
      include: [{ model: Product }]
    });
    res.json(categories);
  } catch (error) {
    res.status(500).send(error.message);
  }
});


router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findOne({
      where: { id: req.params.id },
      include: [{ model: Product }]
    });
    if (!category) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }
    res.json(category);
  } catch (error) {
    res.status(500).send(error.message);
  }
});


router.post('/', async (req, res) => {
  try {
    const newCategory = await Category.create({
      name: req.body.name
    });
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(400).json(error);
  }
});


router.put('/:id', async (req, res) => {
  try {
    const updated = await Category.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated[0] === 0) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }
    res.json({ message: 'Category updated!' });
  } catch (error) {
    res.status(500).json(error);
  }
});


router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Category.destroy({
      where: { id: req.params.id }
    });
    if (!deleted) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }
    res.json({ message: 'Category deleted!' });
  } catch (error) {
    res.status(500).json(error);
  }
});


module.exports = router;