const Game = require("../models/games");
const cloudinary = require("cloudinary").v2;

const getAllGames = async (req, res) => {
  try {
    const games = await Game.find({ createdBy: req.user.id }).sort(
      "-createdAt"
    );
    //console.log(games);

    res.status(200).json({ games, nbhits: games.length });
  } catch (error) {
    res.status(500).json(error);
  }
};

const createGame = async (req, res) => {
  //console.log(req.body);

  const { title, consoles, image } = req.body;

  try {
    if (!title.trim() || !consoles.trim() || !image.trim()) {
      return res.status(401).json({ msg: "Inputs must not be EMPTY!!!" });
    }

    req.body.createdBy = req.user.id;
    const game = await Game.create(req.body);
    res.status(201).json(game);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getSingleGame = async (req, res) => {
  // //console.log(req.headers);

  try {
    const { id } = req.params;
    //console.log(id)
    const gameId = id;
    const userId = req.user.id;
    //console.log(userId)

    const game = await Game.findOne({ _id: gameId, createdBy: userId });

    res.status(200).json(game);
  } catch (error) {
    if (error.name === "CastError") {
      return res
        .status(404)
        .json({ msg: `game with id: ${error.value} not found` });
    }
    res.status(500).json(error);
  }
};

const updateGame = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  const data = {
    title: req.body.title,
    consoles: req.body.consoles,
    publicId:req.body.publicId
  };

  try {

    const selectGameObj = await Game.findOne({ _id: id, createdBy: userId });

    if (req.body.image !== "") {
      if (selectGameObj.publicId) {
        await cloudinary.uploader.destroy(selectGameObj.publicId);
      }
    };
  
    const newImage = await cloudinary.uploader.upload(
     req.body.image
    )
  
    data.image = newImage.secure_url;
    console.log(data)
    const game = await Game.findOneAndUpdate(
      { _id: id, createdBy: userId },
      data,
      { new: true, runValidators: true }
    );
    res.status(200).json(game);
  } catch (error) {
    if (error.name === "CastError") {
      return res
        .status(404)
        .json({ msg: `game with id: ${error.value} not found` });
    }
    return res.status(500).json(error);
  }
};

const deleteGame = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const selectGameObj = await Game.findOne({ _id: id, createdBy: userId });
    //console.log(selectGameObj)

    const publicId = selectGameObj.publicId;
    //console.log(publicId)
    await cloudinary.uploader.destroy(publicId);
    const game = await Game.findOneAndRemove({ _id: id, createdBy: userId });
    res.status(200).json({ msg: "Game deleted", game });
  } catch (error) {
    if (error.name === "CastError") {
      return res
        .status(404)
        .json({ msg: `game with id: ${error.value} not found` });
    }
    return res.status(500).json(error);
  }

  //res.send("<h1>Delete game route</h1>");
};

module.exports = {
  getAllGames,
  createGame,
  getSingleGame,
  updateGame,
  deleteGame,
};
