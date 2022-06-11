const express = require("express");
const { remove } = require("../models/Pets");
const Pets = require("../models/Pets");
const router = express.Router();

router.get("/:petId", async (req, res) => {
    try {
        const pet = await Pets.findById(req.params.petId);

        if (pet === null) {
            res.status(404).json({ message: "Not Found." });
        } else {
            res.status(200).json(pet);
        }
    } catch (err) {
        res.status(400).json({ message: err });
    }
});

router.patch("/:petId", async (req, res) => {
    try {
        const updatedPet = await Pets.updateOne({ _id: req.params.petId }, {
            $set: req.body
        });

        res.status(202).json(updatedPet);
    } catch (err) {
        res.status(400).json({ message: err });
    }
});

router.delete("/:petId", async (req, res) => {
    try {
        const removedPet = await Pets.remove({ _id: req.params.petId });

        res.status(202).json(removedPet);
    } catch (err) {
        res.status(400).json({ message: err });
    }
});

module.exports = router;