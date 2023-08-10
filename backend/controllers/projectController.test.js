import {getProjects} from "./projectControler";
import DB from '../database/dbHelpers/index';


jest.mock(DB, () => ({
    executeProcedure: jest.fn()
  }));

const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis()
}

describe('projectController',()=>{

    describe('getAll projects functionality',()=>{
        it('should get all projects successfully',async()=>{
            const mockProjects = [
                {  name: 'Project A' },
                 {  name: 'Project B' }
                ];

 DB.executeProcedure.mockResolvedValueOnce({ recordset: mockProjects });
    const req = {};
   

        await getProjects(req,res)

        
    expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
    // expect(res.json).toHaveBeenCalledWith({ projects: mockProjects });
    
    
    })



    })
})