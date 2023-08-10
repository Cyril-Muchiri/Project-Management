-- deleting a user 
CREATE OR ALTER PROCEDURE deleteUser
@id VARCHAR(250)
AS BEGIN
    DELETE FROM userTable WHERE id = @id
END;
