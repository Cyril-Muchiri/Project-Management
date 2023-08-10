const { StatusCodes } = require('http-status-codes');
const { getProjects } = require('./your-module'); // Replace with the actual module path
const DB = require('./your-db-module'); // Replace with the actual DB module path

// Mock the DB module
jest.mock('./your-db-module', () => ({
  executeProcedure: jest.fn()
}));

describe('getProjects', () => {
  it('should return a list of projects on successful execution', async () => {
    // Arrange
    const mockProjects = [{ id: 1, name: 'Project A' }, { id: 2, name: 'Project B' }];
    DB.executeProcedure.mockResolvedValueOnce({ recordset: mockProjects });
    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    // Act
    await getProjects(req, res);

    // Assert
    expect(DB.executeProcedure).toHaveBeenCalledWith('getProjects');
    expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
    expect(res.json).toHaveBeenCalledWith({ projects: mockProjects });
  });

  it('should handle internal server error and return appropriate response', async () => {
    // Arrange
    const errorMsg = 'Database connection error';
    DB.executeProcedure.mockRejectedValueOnce(new Error(errorMsg));
    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    // Act
    await getProjects(req, res);

    // Assert
    expect(DB.executeProcedure).toHaveBeenCalledWith('getProjects');
    expect(res.status).toHaveBeenCalledWith(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res.json).toHaveBeenCalledWith({ msg: 'Server Error' });
  });
});
