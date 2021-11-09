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
            const updateProject = await Project.findByIdAndUpdate(req.params.id,{
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

// delete
router.delete("/:id", verify, async (req, res) => {
    if(req.user.isAdmin){
        try{
            await Project.findByIdAndDelete(req.params.id);
            res.status(200).json("Project is deleted"); 
        }catch(err){
            res.status(500).json(err);
        }
    } else{
        res.status(403).json("You are not admin")
    }
})

// get
router.get("/:id", async (req, res) => {
    try{
        const project = await Project.findById(req.params.id);
        res.status(200).json(project);
    }catch(err){
        res.status(500).json(err);
    }
})

// get all
router.get("/", async (req, res) => {
    try{
        const projects = await Project.find();
        res.status(200).json(projects.reverse());
    }catch(err){
        res.status(500).json(err);
    }
})

module.exports = router;