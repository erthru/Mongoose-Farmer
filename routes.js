const express = require("express");
const team = require("./schemas/team");
const player = require("./schemas/player");

const router = express.Router();

// get //
router.get("/teams", async (req, res, next) => {
    const teams = await team.find();
    res.json(teams);
});

router.get("/team/:id", async (req, res, next) => {
    const _team = await team.findById(req.params.id).populate("members");
    res.json(_team);
});

router.get("/players", async (req, res, next) => {
    const players = await player.find().populate("team");
    res.json(players);
});

router.get("/player/:id", async (req, res, next) => {
    const _player = await player.findById(req.params.id).populate("team");
    res.json(_player);
});

// post //
router.post("/team", async (req, res, next) => {
    const _team = await team({
        name: req.body.name,
        description: req.body.description,
    }).save();

    res.json(_team);
});

router.post("/team/:id/player", async (req, res, next) => {
    const _player = await player({
        username: req.body.username,
        role: req.body.role,
        teamId: req.params.id,
    }).save();

    res.json(_player);
});

// put //
router.put("/team/:id", async (req, res, next) => {
    const _team = await team.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        description: req.body.description,
    },
    {
        new: true
    });

    res.json(_team);
});

router.put("/team/:id/player/:playerId", async (req, res, next) => {
    const _player = await player.findByIdAndUpdate(req.params.playerId, {
        username: req.body.username,
        role: req.body.role,
    }, 
    {
        new: true
    });

    res.json(_player);
});

// delete//
router.delete("/team/:id", async (req, res, next) => {
    const _team = await team.findByIdAndDelete(req.params.id);
    res.json(_team);
});

router.delete("/player/:id", async (req, res, next) => {
    const _player = await player.findByIdAndDelete(req.params.id);
    res.json(_player);
});

module.exports = router;
