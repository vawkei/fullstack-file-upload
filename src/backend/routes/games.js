const express = require("express");
const router = express.Router();
const {
  getAllGames,
  createGame,
  getSingleGame,
  updateGame,
  deleteGame,
} = require("../controllers/games");
const {uploadImage} = require("../controllers/uploadImage");

const authMiddleware = require("../middlewares/authentication");


router.get("/", authMiddleware,getAllGames);

router.post("/", authMiddleware,createGame);

router.get("/:id", authMiddleware,getSingleGame);

router.patch("/:id", authMiddleware,updateGame);

router.delete("/:id", authMiddleware,deleteGame);

router.post("/upload",authMiddleware,uploadImage);

module.exports = router;
