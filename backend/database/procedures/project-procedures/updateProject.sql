CREATE OR ALTER PROCEDURE updateProject
        @id VARCHAR(250),
        @project_name VARCHAR(250) = NULL ,
        @project_description VARCHAR(500) = NULL,
        @user_Id VARCHAR(250) = NULL , -- Use the same data type as the referenced column
        @isAssigned BIT = NULL,
        @completed BIT = NULL,
        @deadline DATETIME = NULL
        AS BEGIN
            update projectTable 
            SET project_name = COALESCE(@project_name, project_name),
                project_description = COALESCE(@project_description, project_description),
                user_Id = COALESCE(@user_Id, user_Id),
                isAssigned = COALESCE(@isAssigned, isAssigned),
                deadline = COALESCE(@deadline, deadline),
                completed = COALESCE(@completed, completed)
            WHERE id = @id;
        END;