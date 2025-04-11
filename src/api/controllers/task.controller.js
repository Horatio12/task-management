const TaskService = require("../services/task.service")

//GET all Task
const getAll = async(req, res) => {
    try{
        const customers = await CustomerService.getAllTask();
        res.status(200).json (task);   
    }   catch (error){
        res.status(400).json({message: error.message});
    }
};

//create a new task
const create = async (req, res) => {
    try {
       const task = await TaskService.createTask(req.body);
       res.status(201).json({
        message:"task created successfully",
        task,
       });
    }  catch (error) {
        res.status(400).json({message: error.message});
    }
};

//update a task
const update = async ( req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;
        const task = await TaskService.updateTask(id, updatedData);
        res.status(200).json(updatedTask);
    }   catch (error) {
        res.status(400).json ({message: error.message});
    }
};

//delete a task
const remove = async (req, res) => {
    try{
        const { id } = req.params;
       await TaskService.deleteTask(id);

       res.status(204).json ({
        message: "task deleted successfully",
       });

    }  catch (error) {
        res.status(400).json({message: error.message});
    }
    ;
    if (!task) {
        return res.status(404).json ( { message: "task not found"});
    }
}; 

module.exports = { getAll, create, update, remove };