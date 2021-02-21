CREATE PROCEDURE [dbo].[spSchools_GetAll]
AS
BEGIN
	SET NOCOUNT ON;

	SELECT Id, [Name], City, PostalCode, Street, EmailAddress, WebAddress, TelephoneNumber, [Description], CreationDate
	FROM dbo.Schools;
END