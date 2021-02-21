CREATE PROCEDURE [dbo].[spSchools_GetById]
	@Id UNIQUEIDENTIFIER
AS
BEGIN
	SET NOCOUNT ON;

	SELECT Id, [Name], City, PostalCode, Street, EmailAddress, WebAddress, TelephoneNumber, [Description], CreationDate
	FROM dbo.Schools
	WHERE Id = @Id;
END