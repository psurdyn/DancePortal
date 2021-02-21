CREATE PROCEDURE [dbo].[spClientGroups_GetByClientAndGroup]
	@ClientId UNIQUEIDENTIFIER,
	@StudyGroupId UNIQUEIDENTIFIER
AS
BEGIN
	SET NOCOUNT ON;

	SELECT ClientId, StudyGroupId
	FROM dbo.ClientGroups
	WHERE ClientId = @ClientId AND StudyGroupId = @StudyGroupId;
END