CREATE PROCEDURE [dbo].[spPersons_GetByEmail]
	@Email NVARCHAR(256)
AS
BEGIN
	SET NOCOUNT ON;

	DECLARE @AspNetUserId NVARCHAR(128);

	SET @AspNetUserId = (SELECT Id From dbo.AspNetUsers WHERE Email = @Email);

	SELECT * FROM dbo.Persons WHERE AspNetUserId = @AspNetUserId;
END
