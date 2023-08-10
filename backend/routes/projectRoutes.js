const {Router} = require('express');
const {createProject , getProjects , updateProject , getProject , deleteProject , completeProject , assignProject} = require('../controllers/projectControler')

const projectRouter = Router();


projectRouter.post('/create',createProject)
projectRouter.get('/',getProjects)
projectRouter.get('/get/:id',getProject)
projectRouter.put('/update/:id',updateProject)
projectRouter.delete('/delete/:id',deleteProject) 
projectRouter.put('/complete/:id',completeProject)  
projectRouter.put('/assign/:id',assignProject)     

module.exports = projectRouter;