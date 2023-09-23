const router = require("express").Router();
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const dbFile = JSON.parse(fs.readFileSync(path.join(__dirname, "../db/db.json")));

router.get("/notes", (req, res) => {
	try {
		res.status(200).json(dbFile);
	} catch (err) {
		if (err) res.status(500).json(err);
	}
});

router.post("/notes", async (req, res) => {
	try {
		const id = uuidv4();
		const body = { ...req.body, id };
		dbFile.push(body);
		fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(dbFile, null, 2), (err) => {
			if (err) throw new ERROR();
		});
		res.status(200).json(dbFile);
	} catch (err) {
		if (err) res.status(500).json(err);
	}
});

module.exports = router;
