CREATE PROCEDURE [dbo].[spComments_GetBySchool]
	@SchoolId UNIQUEIDENTIFIER
AS
BEGIN
	SET NOCOUNT ON;

	SELECT * FROM dbo.Comments
	WHERE SchoolId = @SchoolId;
END