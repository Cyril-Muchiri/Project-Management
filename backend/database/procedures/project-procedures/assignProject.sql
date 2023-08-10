CREATE OR ALTER PROCEDURE assignProject
    @id VARCHAR(250),
    @user_Id VARCHAR(250),
    @deadline DATE
    AS BEGIN

        UPDATE projectTable
        SET isAssigned = 1, user_Id = @user_Id , deadline = @deadline
        WHERE id = @id;

    END