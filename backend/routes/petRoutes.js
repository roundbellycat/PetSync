
const express = require('express');
const { getPets, addPet, updatePet, deletePet } = require('../controllers/petController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

// router.route('/', protect, aaaPet).get(getPets).post(addPet);
// router.route('/:id').put(protect, updatePet).delete(protect, deletePet);

router.post('/', protect, addPet)
router.get('/', protect, getPets)
router.put('/:id', protect, updatePet)
router.delete('/:id', protect, deletePet)

module.exports = router;
