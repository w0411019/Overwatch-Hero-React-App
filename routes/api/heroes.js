var express = require('express');
var router = express.Router();

var Hero = require('../../models/hero');

var validateToken = require('../../middleware/validateToken')

// work with data

//GET ALL HEROES
router.get('/',(req, res)=>{ //these are called endpoints

    Hero.find({},(err, heroes)=>{

        if(err) return res.status(400).send("error");

        res.send(heroes);
    })
})

//GET ONE HERO
router.get('/:id',(req, res)=>{

    Hero.findById(req.params.id, (err, hero)=>{

        if(err) return res.status(400).send(`Error: ${err.message}`); //Error could be logged

        if(!hero) return res.status(404).send(); //id was not found

        res.send(hero);
    })
})


//CREATE HERO
router.post('/',(req, res)=>{

    Hero.create(req.body, (err, savedHero)=>{
        if(err){
            return res.status(400).send();
        }

        res.status(201).send(savedHero);
    })
})


//UPDATE HERO
router.put('/:id',(req, res)=>{
    Hero.findByIdAndUpdate(req.params.id, req.body, (err, updatedHero)=>{

            if(err) return res.status(400).send(`Error: ${err.message}`);

            if(!updatedHero) return res.status(404).send();

            res.status(204).send();
    })
})


//DELETE HERO
router.delete('/:id',(req, res)=>{ //these are called endpoints

    Hero.findByIdAndDelete(req.params.id, (err, deletedHero)=>{

        if(err) return res.status(400).send(`Error: ${err.message}`);

        if(!deletedHero) return res.status(404).send();

        res.status(204).send();
    })
})



module.exports = router;