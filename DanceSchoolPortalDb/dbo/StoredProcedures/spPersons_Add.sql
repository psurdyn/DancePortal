CREATE PROCEDURE [dbo].[spPersons_Add]
	@AspNetUserId NVARCHAR(128),
	@FirstName NVARCHAR(100),
	@LastName NVARCHAR(100),
	@Email NVARCHAR(100),
	@Sex NVARCHAR(10),
	@TelephoneNumber NVARCHAR(50)
AS
BEGIN
	SET NOCOUNT ON;

	INSERT INTO dbo.Persons
	(AspNetUserId, FirstName, LastName, Email, Sex, TelephoneNumber)
	OUTPUT INSERTED.Id
	VALUES (@AspNetUserId, @FirstName, @LastName, @Email, @Sex, @TelephoneNumber);
END