CREATE PROCEDURE [dbo].[spAdministrators_Get]
	@PersonId UNIQUEIDENTIFIER
AS
BEGIN
	SET NOCOUNT ON;

	SELECT PersonId
	FROM dbo.Administrators	
	WHERE PersonId = @PersonId;
END