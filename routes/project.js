const router = require("express").Router();
const Project = require('../models/Project');
const verify = require("../verifyToken");

// add
router.post("/", verify, async (req, res) => {
    if(req.user.isAdmin){
        const newProject = new Project(req.body);

        try{
            const savedProject = await newProject.save();
            res.status(201).json(savedProject);
        }catch(err){
            res.status(500).json(err);
        }
    } else{
        res.status(403).json("You are not admin")
    }
})

// update
router.put("/:id", verify, async (req, res) => {
    if(req.user.isAdmin){
        try{
            const updateProject = await Project.findByIdAndUpdate(req.params.body,{
                $set: req.body,
            }, {new: true});
            res.status(200).json(updateProject);
        }catch(err){
            res.status(500).json(err);
        }
    } else{
        res.status(403).json("You are not admin")
    }
})

module.exports = router;