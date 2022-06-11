//EXPRESS
const express = require("express");
const app = express();

//DB
const Pets = require("../models/Pets");

//Multer: File handler
const multer = require("multer")
const upload = multer()

//XLSX
const XLSX = require("xlsx");

//Import routes
const petIdRoutes = require("./petId");

//Routes
app.post("/", upload.single("petsExcel"), async (req, res) => {
    try {
        //Extracting data from excel
        const excelFile = XLSX.read(req.file.buffer);
        const nameList = excelFile.SheetNames;
        var savedData = new Array();

        for (let i = 0; i < nameList.length; i++) {
            const jsonData = XLSX.utils.sheet_to_json(
                excelFile.Sheets[nameList[i]]
            );

            savedData.push(await Pets.create(jsonData));
        }

        return res.status(201).json(savedData);
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
});

app.get("/", async (req, res) => {
    try {
        const pets = await Pets.find();
        res.status(200).json(pets);
    } catch (err) {
        res.status(400).json({ message: err });
    }
});

app.use("/", petIdRoutes);

module.exports = app;