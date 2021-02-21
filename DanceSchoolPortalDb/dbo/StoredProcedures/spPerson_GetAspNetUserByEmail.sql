CREATE PROCEDURE [dbo].[spPerson_GetAspNetUserByEmail]
	@Email NVARCHAR(128)
AS
BEGIN
	SELECT Id
	FROM dbo.AspNetUsers
	WHERE Email = @Email;
END