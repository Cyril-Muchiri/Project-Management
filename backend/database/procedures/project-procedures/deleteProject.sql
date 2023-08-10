 CREATE OR ALTER PROCEDURE deleteProject
        @id VARCHAR(250)
AS BEGIN

    DELETE FROM projectTable WHERE id = @id

END;
