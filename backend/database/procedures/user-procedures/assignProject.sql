CREATE OR ALTER PROCEDURE assignUserProject
    @id VARCHAR(250),
    @project_Id VARCHAR(250)
    AS BEGIN

        UPDATE userTable
        SET isAssigned = 1, project_Id = @project_Id 
        WHERE id = @id;

    END
