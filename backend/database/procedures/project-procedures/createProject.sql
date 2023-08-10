-- create a project 


CREATE OR ALTER PROCEDURE createProject
    @id VARCHAR(250),
    @project_name VARCHAR(250),
    @project_description VARCHAR(500)

    AS BEGIN
        INSERT INTO projectTable (id, project_name, project_description)
        VALUES (@id, @project_name, @project_description);
    END;

    