// get pet function (read)
const Pet = require('../models/Pet');
const getPets = async (req, res) => {
    try {
        const pets = await Pet.find({ userId: req.user.id });
        res.json(pets);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// add pet function
const addPet = async (req, res) => {
    const { pname, gender, age, type, breed, history, owner } = req.body;
    try {
        const pet = await Pet.create({ userId: req.user.id, pname, gender, age, type, breed, history, owner });
        res.status(201).json(pet);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// update pet
const updatePet = async (req, res) => {
    const { pname, gender, age, type, breed, history, owner } = req.body;
    try {
        const pet = await Pet.findById(req.params.id);
        if (!pet) return res.status(404).json({ message: 'Pet not found' });

        pet.pname = pname || pet.pname;
        pet.gender = gender || pet.gender;
        pet.age = age || pet.age;
        pet.type = type || pet.type;
        pet.breed = breed || pet.breed;
        pet.history = history || pet.history;
        pet.owner = owner || pet.owner;

        const updatedPet = await pet.save();
        res.json(updatedPet);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// delete pet
const deletePet = async (req, res) => {
    try {
        const pet = await Pet.findById(req.params.id);
        if (!pet) return res.status(404).json({ message: 'Pet not found' });
        await pet.remove();
        res.json({ message: 'Pet removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getPets, addPet, updatePet, deletePet };