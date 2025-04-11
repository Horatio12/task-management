const TaskModel = require("../models/task.model");


const getAllTask = async ()=> {
    const task = await TaskModel.find();
    return task;
};
const getTaskByEmail = async (email)=>{
    const task = await TaskModel.findOne({email});
    return task;
};
const getTaskById = async (id) => {
    const task = await TaskModel.findById(id);
}

const createTask= async(taskData)=>{
    const tasksExist = await getTaskByEmail(taskData.email);
    if (tasksExist) {
        throw new Error ("Email already exists");
    }
    const task = await TaskModel.create(taskData);
    return task;
};
const updateTask = async (id, taskData)=>{
const taskExist = await getTaskById(id);
if(!taskExist) {
    throw new Error ("task not found");
}
const task = await TaskModel.findByIdAndUpdate(id, taskData, {
    new:true,
});
return task;

};
const deleteTask = async (id) => {
    const taskExist = await getTaskById(id);
    if(!taskExist) {
        throw new Error ("Task not found");
    }
    await TaskModel.findByIdAndDelete(id);
    return "Task deleted successfully";
};

module.exports = {
    getAllTask,
    getTaskByEmail,
    getTaskById,
    createTask,
    updateTask,
    deleteTask,
}