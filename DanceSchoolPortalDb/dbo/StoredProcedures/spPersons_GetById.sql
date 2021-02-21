CREATE PROCEDURE [dbo].[spPersons_GetById]
	@Id UNIQUEIDENTIFIER
AS
BEGIN
	SET NOCOUNT ON;

	SELECT Id, AspNetUserId, FirstName, LastName, Email, Sex, TelephoneNumber
	FROM dbo.Persons
	WHERE Id = @Id;
END