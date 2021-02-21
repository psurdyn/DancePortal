CREATE TABLE [dbo].[Schools]
(
	[Id] UNIQUEIDENTIFIER NOT NULL PRIMARY KEY DEFAULT NewId(), 
    [Name] NVARCHAR(512) NOT NULL UNIQUE, 
    [City] NVARCHAR(128) NOT NULL,
    [PostalCode] NVARCHAR(128) NOT NULL,
    [Street] NVARCHAR(128) NOT NULL,
    [EmailAddress] NVARCHAR(128) NOT NULL, 
    [WebAddress] NVARCHAR(128) NULL, 
    [TelephoneNumber] NVARCHAR(50) NOT NULL, 
    [Description] NVARCHAR(1024) NULL,
    [CreationDate] DATETIME NULL
)

GO

CREATE TRIGGER [dbo].[tSchools_Delete]
    ON [dbo].[Schools]
    FOR DELETE
    AS

    DECLARE @SchoolId UNIQUEIDENTIFIER;
    IF EXISTS (SELECT * FROM DELETED)	
    BEGIN
        SET NoCount ON;

        SELECT @SchoolId = Id FROM DELETED;

        DELETE FROM dbo.Comments WHERE SchoolId = @SchoolId;
        DELETE FROM dbo.Courses WHERE SchoolId = @SchoolId;
        DELETE FROM dbo.StudyGroups WHERE SchoolId = @SchoolId;
    END