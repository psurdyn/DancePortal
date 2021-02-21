CREATE PROCEDURE [dbo].[spClientGroups_GetAll]
AS
BEGIN
	SELECT ClientId, StudyGroupId
	FROM dbo.ClientGroups;
END