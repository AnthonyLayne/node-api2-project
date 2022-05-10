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

router.get("/:id", async (req, res) => {
  try {
    const post = await POST.findById(req.params.id);
    if (!post) {
      res.status(404).json({
        message: "The post with the specified ID does not exist",
      });
    } else {
      res.json(post);
    }
  } catch (err) {
    res.status(500).json({
      message: "The post information could not be retrieved",
      err: err.message,
      stack: err.stack,
    });
  }
});

router.post("/", (req, res) => {
  const { title, contents } = req.body;
  if (!title || !contents) {
    res.status(400).json({
      message: "Please provide title and contents for the post",
    });
  } else {
    POST.insert({ title, contents })
      .then(({ id }) => {
        return POST.findById(id);
      })
      .then((post) => {
        res.status(201).json(post);
      })
      .catch((err) => {
        res.status(500).json({
          message: "There was an error while saving the post to the database",
          err: err.message,
          stack: err.stack,
        });
      });
  }
});

router.put("/:id", (req, res) => {
  const { title, contents } = req.body;
  if (!title || !contents) {
    res.status(400).json({
      message: "Please provide title and contents for the post",
    });
  } else {
    POST.findById(req.params.id)
      .then((post) => {
        if (!post) {
          res.status(404).json({
            message: "The post with the specified ID does not exist",
          });
        } else {
          return POST.update(req.params.id, req.body);
        }
      })
      .then((data) => {
        if (data) {
          return POST.findById(req.params.id);
        }
      })
      .then((post) => {
        if (post) {
          res.json(post);
        }
      })
      .catch((err) => {
        res.status(500).json({
          message: "The post information could not be modified",
          err: err.message,
          stack: err.stack,
        });
      });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const delPost = await POST.findById(req.params.id);
    if (!delPost) {
      res.status(404).json({
        message: "The post with the specified ID does not exist",
      });
    } else {
      await POST.remove(req.params.id);
      res.json(delPost);
    }
  } catch (err) {
    res.status(500).json({
      message: "The post could not be removed",
      err: err.message,
      stack: err.stack,
    });
  }
});
router.get("/:id", (req, res) => {});

module.exports = router;
