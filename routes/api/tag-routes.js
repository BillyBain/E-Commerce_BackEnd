const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    let tagData = await Tag.findAll({ include: [{ model: Product }] })
    if (!tagData) {
      res.status(400).json({ message: "Tags Not Found!"});
    } else {
      res.status(200).json(tagData);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    let tagData = await Tag.findAll(
      {
        include: [{ model: Product}],
        where: { id: req.param.id }
      }
    );
    if (!tagData) {
      res.status(400).json({ message: "Tag with ID Not Found!"});
    } else {
      res.status(200).json(tagData);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create(req.body)
    .then((tag) => {
      res.status(200).json(tag);
    })
    .catch((err) => {
      res.status(500).json(err);
    })
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body,
    {
      where: { id: req.params.id }
    })
    .then((tag) => {
      res.status(200).json(tag);
    })
    .catch((err) => {
      res.status(500).json(err);
    })
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy(
    {
      where: { id: req.params.id }
    })
    .then((tag) => {
      res._construct(200).json(tag);
    })
    .catch((err) => {
      res.status(500).json(err);
    })
});

module.exports = router;
