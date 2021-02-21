CREATE PROCEDURE [dbo].[spSchools_Add]
	@Name NVARCHAR(512),
	@City NVARCHAR(128),
	@PostalCode NVARCHAR(128),
	@Street NVARCHAR(128),
	@EmailAddress NVARCHAR(128),
	@WebAddress NVARCHAR(128),
	@TelephoneNumber NVARCHAR(50),
	@Description NVARCHAR(1024),
	@CreationDate DATETIME
AS
BEGIN
	SET NOCOUNT ON;

	INSERT INTO dbo.Schools	
	([Name], [City], PostalCode, Street, EmailAddress, WebAddress, TelephoneNumber, [Description], CreationDate)
	OUTPUT INSERTED.Id
	VALUES (@Name, @City, @PostalCode, @Street, @EmailAddress, @WebAddress, @TelephoneNumber, @Description, @CreationDate);
END