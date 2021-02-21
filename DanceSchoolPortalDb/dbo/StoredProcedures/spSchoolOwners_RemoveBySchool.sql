CREATE PROCEDURE [dbo].[spSchoolOwners_RemoveBySchool]
	@SchoolId UNIQUEIDENTIFIER
AS
BEGIN
	SET NOCOUNT ON;

	DELETE FROM dbo.SchoolOwners
	WHERE SchoolId = @SchoolId;
END
