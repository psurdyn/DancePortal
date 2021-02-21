CREATE PROCEDURE [dbo].[spSchoolOwners_GetAll]
AS
BEGIN
	SET NOCOUNT ON;

	SELECT SchoolId, OwnerId
	FROM dbo.SchoolOwners;
END