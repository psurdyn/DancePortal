CREATE PROCEDURE [dbo].[spCourseLevels_Remove]
	@CourseId UNIQUEIDENTIFIER,
	@LevelId UNIQUEIDENTIFIER
AS
BEGIN
	SET NOCOUNT ON;

	DELETE FROM dbo.CourseAdvancementLevel
	WHERE CourseId = @CourseId
	OR LevelId = @LevelId;
END
