const Task = require("../model/Task");

const taskController = {};

taskController.createTask = async (req, res) => {
    try {
        const { task, isComplete } = req.body;
        const {userId} = req
        const newTask = new Task({ task, isComplete, author:userId});
        await newTask.save();
        res.status(200).json({ status: "ok", data: newTask });
    } catch (error) {
        res.status(400).json({status: 'post fail', error:error})
    }
};
taskController.getTask = async (req,res) =>{
    try {
        const taskList = await Task.find({}).populate("author").select("-__v") //populate 다른 컬렉션 참조된것 갖고옴/ 모든 데이터 select제외
        res.status(200).json({status:"ok", data:taskList})
    } catch (error) {
        res.status(400).json({status:'get fail',error: error})
    }
}
taskController.updateTask = async (req,res) =>{
    try {
        const { id } = req.params; 
        const { task, isComplete } = req.body; 

        const taskUpdate = await Task.updateOne(
            { _id: id }, 
            { $set: { task, isComplete } } 
        );
        res.status(200).json({status: "ok", data: taskUpdate});
    } catch (error) {
        res.status(400).json({status: 'update fail', error: error});
    }
}
taskController.deleteTask = async (req,res) =>{
    try {
        const { id } = req.params;
        const taskDelete = await Task.deleteOne({ _id: id });
        res.status(200).json({status:"ok",data: taskDelete})
    } catch (error) {
        res.status(400).json({status: 'delete fail', error:error})
    }
}
module.exports = taskController;
