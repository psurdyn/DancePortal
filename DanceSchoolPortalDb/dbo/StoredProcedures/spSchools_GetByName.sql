CREATE PROCEDURE [dbo].[spSchools_GetByName]
	@Name NVARCHAR(512)
AS
BEGIN
	SET NOCOUNT ON;

	SELECT Id, [Name], City, PostalCode, Street, EmailAddress, WebAddress, TelephoneNumber, [Description], CreationDate
	FROM dbo.Schools
	WHERE [Name] = @Name ;
END