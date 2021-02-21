CREATE PROCEDURE [dbo].[spClientGroups_GetByClient]
	@ClientId UNIQUEIDENTIFIER
AS
BEGIN
	SET NOCOUNT ON;

	SELECT ClientId, StudyGroupId
	FROM dbo.ClientGroups
	WHERE ClientId = @ClientId;
END