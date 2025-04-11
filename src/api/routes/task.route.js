const { getAll, create } = require('../controllers/task.controller');
const express = require("express");
const router = express.Router();
const createTaskSchema = require("../validations/task.validation");
const validate = require("../middlewares/validate");

router.get("/", (req, res) => getAll(req, res));


 router.post('/', validate(createTaskSchema), create);

router.put("/:id", (req, res) => update(req, res));

router.delete('/:id', (req, res) => remove(req, res));


module.exports = router;