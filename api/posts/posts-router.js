// implement your posts router here
const express = require("express");
const POST = require("./posts-model");
const router = express.Router();

router.get("/", (req, res) => {
  POST.find()
    .then((found) => {
      res.json(found);
    })
    .catch((err) => {
      res.status(500).json({
        message: "The posts information could not be retrieved",
        err: err.message,
        stack: err.stack,
      });
    });
});
router.get("/:id", (req, res) => {});
router.post("/", (req, res) => {});
router.delete("/:id", (req, res) => {});
router.put("/:id", (req, res) => {});
router.get("/:id", (req, res) => {});

module.exports = router;
