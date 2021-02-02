const { Router } = require('express');
const router = Router();
const Subscriber = require('../models/Subscriber');

router
  .route('/')
  .get(async (req, res) => {
    try {
      const foundSubscribers = await Subscriber.find({});
      res.json(foundSubscribers);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  })
  .post(async (req, res) => {
    const { name, subscribedToChannel } = req.body;
    const subscriber = new Subscriber({
      name,
      subscribedToChannel,
    });

    try {
      const savedSubscriber = await subscriber.save();
      res.status(201).send(savedSubscriber);
    } catch (err) {
      res.status(400).send({ message: err.message });
    }
  });

const getSubscriber = async (req, res, next) => {
  let { id } = req.params;
  let foundSubscriber;
  try {
    foundSubscriber = await Subscriber.findById(id);
    if (!foundSubscriber) return res.status(404).send('no subscriber found');
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  req.foundSubscriber = foundSubscriber;
  next();
};

router.use('/:id', getSubscriber);

router
  .route('/:id')
  .get((req, res) => {
    let { foundSubscriber } = req;
    res.send(foundSubscriber);
  })
  .patch(async (req, res) => {
    let { foundSubscriber } = req;
    if (req.body.name) foundSubscriber.name = req.body.name;
    if (req.body.subscribedToChannel)
      foundSubscriber.subscribedToChannel = req.body.subscribedToChannel;

    try {
      await foundSubscriber.save();
      res.json({ message: 'updated subscriber' });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  })
  .delete(async (req, res) => {
    try {
      await req.foundSubscriber.remove();
      res.json({ message: 'deleted subscriber' });
    } catch (error) {
      res.status(500).json({ message: err.message });
    }
  });

module.exports = router;
