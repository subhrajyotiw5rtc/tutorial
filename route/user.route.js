const express = require('express');
const router = express.Router();
const controller = require('../controller/user.controller');





class Userrouter {
    
    getRouter() {
        try{
            router.get('/', controller.checkApi.bind(controller));
            router.get('/getRecord', controller.getRecord.bind(controller));
            router.post('/addRecord', controller.addRecord.bind(controller));
            router.put('/updateRecord/:id', controller.updateRecord.bind(controller));
            router.post('/searchRecord', controller.searchRecord.bind(controller));
            router.post('/pagiRecord', controller.pagiRecord.bind(controller));
            router.get('/sortRecord', controller.sortRecord.bind(controller));
        }catch(error) {
            console.log('Error::', error);
        }

        return router;
    }
}

module.exports = new Userrouter();