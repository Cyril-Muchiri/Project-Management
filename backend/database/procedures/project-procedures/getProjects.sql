-- Fetch all projects 


CREATE OR ALTER PROCEDURE getProjects

AS BEGIN

    SELECT * FROM projectTable;

END;