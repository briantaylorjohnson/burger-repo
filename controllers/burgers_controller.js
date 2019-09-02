// Required dependencies and packages
var express = require("express");
var router = express.Router();
var db = require("../models");

router.get("/burger", function(req,res)
{
    db.Burger.findAll({}).then(function(dbBurger)
    {
        res.json(dbBurger);
    });
});

router.post("/burger", function(req,res)
{
    db.Burger.create(
    {
        name: req.body.name,

    }).then(function(dbBurger)
    {
        res.json(dbBurger);
    });

});

router.put("/burger", function(req,res)
{
    db.Burger.update(
    {
        devoured: true,
    },
    {
        where:
        {
            id: req.body.id
        }
    })
    .then(function(dbBurger)
    {
        res.json(dbBurger);
    });
});


module.exports = router;
