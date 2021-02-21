CREATE PROCEDURE [dbo].[spPersons_Update]
	@Id UNIQUEIDENTIFIER,
	@AspNetUserId NVARCHAR(128),
	@FirstName NVARCHAR(100),
	@LastName NVARCHAR(100),
	@Email NVARCHAR(100),
	@Sex NVARCHAR(10),
	@TelephoneNumber NVARCHAR(50)
AS
BEGIN
	SET NOCOUNT ON;

	UPDATE dbo.Persons 
	SET AspNetUserId = IsNull(@AspNetUserId, AspNetUserId),
		FirstName = IsNull(@FirstName, FirstName),
		LastName = IsNull(@LastName, LastName),
		Email = IsNull(@Email, Email),
		Sex = IsNull(@Sex, Sex),
		TelephoneNumber = IsNull(@TelephoneNumber, TelephoneNumber)
	WHERE Id = @Id;
END
