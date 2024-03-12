const express = require("express")
const userController = require("../controller/userController")
const TodoController = require("../controller/TodoController")
const Authmiddleware = require("../middleware/AuthMiddleware")

const router = express.Router();

// User profile API List
router.post("/registration", userController.registration)
router.post("/login", userController.login)
router.post("/profileUpdate",Authmiddleware,userController.profileUpdate)
router.get("/profileDetails",Authmiddleware,userController.profileDetails)

// To-do API List
router.post("/CreateTodo",Authmiddleware,TodoController.CreateTodo)
router.get("/TodoRead",Authmiddleware,TodoController.TodoRead)
router.post("/UpdateRead",Authmiddleware,TodoController.UpdateRead)
router.post("/UpdateStatus",Authmiddleware,TodoController.UpdateStatus)
router.post("/TodoDelete",Authmiddleware,TodoController.TodoDelete)

// All module export
module.exports = router;

