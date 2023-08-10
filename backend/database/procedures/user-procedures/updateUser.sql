CREATE OR ALTER PROCEDURE updateUser
    @id VARCHAR(255),
    @email VARCHAR(250) = NULL,
    @userName VARCHAR(250) = NULL,
    @password VARCHAR(250) = NULL,
    @about VARCHAR(500) = NULL,
    @isAssigned Bit = NULL,
    @project_Id VARCHAR(250) = NULL,
    @profile_pic VARCHAR(500) = NULL
    AS BEGIN

    UPDATE userTable SET 
    userName = COALESCE (@userName,userName),
    password = COALESCE (@password,password), 
    about = COALESCE (@about,about),
    isAssigned = COALESCE (@isAssigned,isAssigned),
    profile_pic = COALESCE (@profile_pic,profile_pic),
    project_id = @project_Id
    
    WHERE id = @id
    END;