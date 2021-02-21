CREATE PROCEDURE [dbo].[spSchoolOwners_Add]
	@SchoolId UNIQUEIDENTIFIER,
	@OwnerId UNIQUEIDENTIFIER
AS
BEGIN
	SET NOCOUNT ON;

	INSERT INTO dbo.SchoolOwners
	(SchoolId, OwnerId)
	VALUES (@SchoolId, @OwnerId);
END