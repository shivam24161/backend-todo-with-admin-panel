const router = require("express").Router();
const TodoModel = require("../models/Todo");
const { verifyToken } = require("./verifyToken");

// add new todoI
router.post("/addTodo", verifyToken, async (req, res) => {
    const { title, desc } = req.body;
    const userId = req.user.id;
    const todo = new TodoModel({
        title,
        desc,
        userId
    });
    try {
        const savedTodo = await todo.save();
        res.status(200).json(savedTodo);
    } catch (error) {
        res.status(500).json(error)
    }
})

// get all todo
router.get("/getAllTodo", verifyToken, async (req, res) => {
    const userId = req.user.id;
    try {
        const todos = await TodoModel.find({ userId });
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json(error);
    }
})

// get todo by id
router.get("/getTodo/:id", async (req, res) => {
    const todoId = req.params.id;
    try {
        const todo = await TodoModel.findById(todoId);
        if (!todo) {
            return res.status(404).json("Todo not found");
        }
        res.status(200).json(todo);
    } catch (error) {
        res.status(500).json(error);
    }
})

// delete todo 
router.delete("/deleteTodo/:id", async (req, res) => {
    const todoId = req.params.id;
    try {
        const deletedTodo = await TodoModel.findByIdAndDelete(todoId);
        const remainingTodos = await TodoModel.find();
        if (!deletedTodo) {
            return res.status(404).json("Todo not found");
        }
        res.status(200).json({
            message: "Todo deleted successfully",
            remainingTodos
        });
    } catch (error) {
        res.status(200).json(error);
    }
})

// edit todo
router.put("/editTodo/:id", async (req, res) => {
    const todoId = req.params.id;
    const { title, desc, completed } = req.body;
    const updatedTodo = {
        title,
        desc,
        completed
    };
    const updateTodo = await TodoModel.findByIdAndUpdate(todoId, updatedTodo);
    if (!updateTodo) {
        return res.status(404).json("Todo not found");
    }
    try {
        const todo = await TodoModel.findById(todoId);
        res.status(200).json({
            message: "Todo updated successfully",
            todo
        })
    } catch (error) {
        res.status(500).json(error);
    }
})

module.exports = router;