// Required dependencies and packages
var express = require("express");
var router = express.Router();
var db = require("../models");


// This route performs a GET request to retrieve all burgers in the database
router.get("/burger", function(req,res)
{
    db.Burger.findAll({}).then(function(dbBurger)
    {
        res.json(dbBurger); // Returns a JSON array of all burger objects in the database
    });
});

// This route performs a POST request to add a new burger to the database 
router.post("/burger", function(req,res)
{
    db.Burger.create(
    {
        name: req.body.name, // Name of new burger is required in the request

    }).then(function(dbBurger)
    {
        res.json(dbBurger); // Returns a JSON object of the burger added to the databsae
    });
});


// This route performs a PUT request to update the devoured boolean for a given burger
router.put("/burger", function(req,res)
{
    db.Burger.update(
    {
        devoured: true,
    },
    {
        where:
        {
            id: req.body.id // ID of burger to be updated is required in the request
        }
    })
    .then(function(dbBurger)
    {
        res.json(dbBurger); // Returns the updated devoured value in binary form (0 = false; 1 = true)
    });
});

// Exports the burger routes
module.exports = router;
