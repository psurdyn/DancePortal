CREATE PROCEDURE [dbo].[spClientGroups_Remove]
	@GroupId UNIQUEIDENTIFIER,
	@ClientId UNIQUEIDENTIFIER
AS
BEGIN
	SET NOCOUNT ON;

	IF(@ClientId != null)
		DELETE FROM dbo.ClientGroups
		WHERE StudyGroupId = @GroupId AND ClientId = @ClientId;
	ELSE
		DELETE FROM dbo.ClientGroups
		WHERE StudyGroupId = @GroupId;		
END
