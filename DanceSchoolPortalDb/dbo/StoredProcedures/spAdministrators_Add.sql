CREATE PROCEDURE [dbo].[spAdministrators_Add]
	@PersonId UNIQUEIDENTIFIER
AS
BEGIN
	SET NOCOUNT ON;

	INSERT INTO dbo.Administrators
	(PersonId)
	VALUES (@PersonId);
END