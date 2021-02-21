CREATE PROCEDURE [dbo].[spSchoolOwners_GetSchoolsByOwner]
	@OwnerId UNIQUEIDENTIFIER
AS
BEGIN
	SET NOCOUNT ON;

	SELECT SchoolId
	FROM dbo.SchoolOwners
	WHERE OwnerId = @OwnerId;
END 