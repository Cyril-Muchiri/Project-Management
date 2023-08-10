CREATE OR ALTER PROCEDURE createAdmin 
    @email VARCHAR(255),
    @userName VARCHAR(255),
    @password VARCHAR(255),
    @role VARCHAR(255)
AS
BEGIN
    INSERT INTO Admin (email, userName, password, role)
    VALUES (@email, @userName, @password, @role);
END