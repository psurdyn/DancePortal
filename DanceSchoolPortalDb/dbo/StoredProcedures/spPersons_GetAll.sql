CREATE PROCEDURE [dbo].[spPersons_GetAll]
AS
BEGIN
	SET NOCOUNT ON;

	SELECT Id, AspNetUserId, FirstName, LastName, Email, Sex, TelephoneNumber
	FROM dbo.Persons;
END 