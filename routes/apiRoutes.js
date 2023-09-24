const router = require("express").Router();
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

router.get("/notes", (req, res) => {
	const dbFile = JSON.parse(fs.readFileSync(path.join(__dirname, "../db/db.json")));
	try {
		res.status(200).json(dbFile);
	} catch (err) {
		if (err) res.status(500).json(err);
	}
});

router.post("/notes", async (req, res) => {
	const dbFile = JSON.parse(fs.readFileSync(path.join(__dirname, "../db/db.json")));
	try {
		const id = uuidv4();
		const body = { ...req.body, id };
		dbFile.push(body);
		fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(dbFile, null, 2), (err) => {
			if (err) throw new ERROR();
		});
		res.status(200).json(dbFile);
	} catch (err) {
		if (err) res.status(400).json(err);
	}
});

router.delete("/notes/:id", (req, res) => {
	const dbFile = JSON.parse(fs.readFileSync(path.join(__dirname, "../db/db.json")));
	try {
		const updatedDB = dbFile.filter((note) => note.id !== req.params.id);
		if (updatedDB.length === dbFile.length) return res.status(200).send("No note with that id was found");
		fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(updatedDB, null, 2), (err) => {
			if (err) throw new ERROR();
		});
		res.status(200).json(updatedDB);
	} catch (err) {
		if (err) res.status(500).json(err);
	}
});

module.exports = router;
