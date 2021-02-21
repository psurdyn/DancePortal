CREATE PROCEDURE [dbo].[spSchoolOwners_GetOwnersBySchool]
	@SchoolId UNIQUEIDENTIFIER
AS
BEGIN
	SET NOCOUNT ON;

	SELECT OwnerId
	FROM dbo.SchoolOwners
	WHERE SchoolId = @SchoolId;
END