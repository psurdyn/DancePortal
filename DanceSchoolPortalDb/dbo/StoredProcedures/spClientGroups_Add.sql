CREATE PROCEDURE [dbo].[spClientGroups_Add]
	@ClientId UNIQUEIDENTIFIER,
	@StudyGroupId UNIQUEIDENTIFIER
AS
BEGIN
	SET NOCOUNT ON;

	INSERT INTO dbo.ClientGroups
	(ClientId, StudyGroupId)
	VALUES (@ClientId, @StudyGroupId);
END