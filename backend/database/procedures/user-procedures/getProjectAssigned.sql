CREATE OR ALTER PROCEDURE getProjectAssigned
    @id VARCHAR(250)
    AS BEGIN
        SELECT * FROM projectTable WHERE user_Id = @id AND isAssigned = 1;
    END