BEGIN TRY
    CREATE TABLE projectTable (
        id VARCHAR(250) NOT NULL PRIMARY KEY,
        project_name VARCHAR(250) NOT NULL,
        project_description VARCHAR(500) NULL,
        user_Id VARCHAR(250) NULL,
        isAssigned BIT DEFAULT 0,
        completed BIT DEFAULT 0,
        deadline DATETIME NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        
        -- ALTER TABLE projectTable
        -- ADD CONSTRAINT FK_projectTable_userTable FOREIGN KEY (user_Id) REFERENCES userTable(id) ON DELETE SET NULL;

    );
END TRY
BEGIN CATCH
    THROW 50001, 'An error occurred while creating the projectTable', 1;
END CATCH;
