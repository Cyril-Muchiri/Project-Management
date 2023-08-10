-- complete a project by simply changing the completed to 1

CREATE PROCEDURE completeProject
    @id VARCHAR(250)
AS
BEGIN
    UPDATE projectTable
    SET completed = 1
    WHERE id = @id;
END