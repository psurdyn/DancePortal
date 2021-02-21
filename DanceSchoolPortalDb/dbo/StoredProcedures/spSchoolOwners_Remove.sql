CREATE PROCEDURE [dbo].[spSchoolOwners_Remove]
	@SchoolId UNIQUEIDENTIFIER,
	@OwnerId UNIQUEIDENTIFIER
AS
BEGIN
	SET NOCOUNT ON;

	DELETE FROM dbo.SchoolOwners
	WHERE SchoolId = @SchoolId AND OwnerId = @OwnerId;
END
