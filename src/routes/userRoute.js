const express=require('express');
const router =new express.Router();

const userController =require('../controller/users');
const checkIfAuthenticated =require('../Middleware/userMiddleware');

//ROUTES
router.post('/user/fetch',checkIfAuthenticated,userController.fetchUser);

router.post('/user/suspend',checkIfAuthenticated,userController.suspendUser);

router.post('/user/activate',checkIfAuthenticated,userController.activateUser);

router.post('/user/delete',checkIfAuthenticated,userController.deleteUser);

router.post('/chat/conversations',checkIfAuthenticated,userController.fetchConversations);

router.post('/chat/notifications',checkIfAuthenticated,userController.sendNotifications);
//EXPORT
module.exports=router;