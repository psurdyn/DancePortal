CREATE PROCEDURE [dbo].[spOwners_GetById]
	@PersonId UNIQUEIDENTIFIER
AS
BEGIN
	SET NOCOUNT ON;

	SELECT PersonId
	FROM dbo.Owners
	WHERE PersonId = @PersonId;
END