CREATE PROCEDURE [dbo].[spPersons_GetByAspNetUser]
	@AspNetUserId UNIQUEIDENTIFIER
AS
BEGIN
	SET NOCOUNT ON;

	SELECT Id, AspNetUserId, FirstName, LastName, Email, Sex, TelephoneNumber
	FROM dbo.Persons
	WHERE AspNetUserId = @AspNetUserId;
END