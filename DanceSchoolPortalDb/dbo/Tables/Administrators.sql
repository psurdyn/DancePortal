CREATE TABLE [dbo].[Administrators]
( 
    [PersonId] UNIQUEIDENTIFIER NOT NULL PRIMARY KEY

    CONSTRAINT [fkAdministratorsPersons] FOREIGN KEY (PersonId) REFERENCES [dbo].[Persons](Id)
)

GO

CREATE TRIGGER [dbo].[tAdministratorsAddOrRemoveRole]
    ON [dbo].[Administrators]
    FOR INSERT, DELETE, UPDATE
    AS
        SET NOCOUNT ON;

		DECLARE @UserId NVARCHAR(128);
		DECLARE @PersonId UNIQUEIDENTIFIER;
		DECLARE @RoleId UNIQUEIDENTIFIER;

		SELECT @RoleId = Id
			FROM dbo.AspNetRoles
			WHERE Name = 'Administrator';

		IF EXISTS (SELECT * FROM INSERTED)	
		BEGIN	
		SELECT @PersonId =  PersonId FROM INSERTED

		SELECT @UserId = AspNetUserId 
			FROM dbo.Persons
			WHERE Id = @PersonId	
	
			INSERT INTO dbo.AspNetUserRoles	
			(UserId, RoleId)
			VALUES (@UserId, @RoleId)
		END;
		ELSE IF EXISTS (SELECT * FROM DELETED)
		BEGIN
			SELECT @PersonId =  PersonId FROM DELETED

			SELECT @UserId = AspNetUserId 
			FROM dbo.Persons
			WHERE Id = @PersonId

			DELETE FROM dbo.AspNetUserRoles
			WHERE UserId = @UserId AND RoleId = @RoleId
		END;