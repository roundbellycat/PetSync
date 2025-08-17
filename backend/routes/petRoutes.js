
const express = require('express');
const { getPets, addPet, updatePet, deletePet } = require('../controllers/petController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/').get(getPets).post(addPet);
router.route('/:id').put(protect, updatePet).delete(protect, deletePet);

module.exports = router;
