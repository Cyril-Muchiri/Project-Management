CREATE OR ALTER PROCEDURE GETPROJECTASSIGNEDHISTORY 
@ID VARCHAR(250) AS 
	BEGIN
	SELECT *
	FROM projectTable
	WHERE
	    user_Id = @id
	    AND isAssigned = 1
	    AND completed = 1;
END; 