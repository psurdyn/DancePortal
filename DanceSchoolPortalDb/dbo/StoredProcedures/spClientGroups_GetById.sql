CREATE PROCEDURE [dbo].[spClientGroups_GetById]
	@GroupId UNIQUEIDENTIFIER
AS
BEGIN
	SET NOCOUNT ON;

	SELECT ClientId, StudyGroupId
	FROM dbo.ClientGroups
	WHERE StudyGroupId = @GroupId;
END