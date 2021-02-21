CREATE PROCEDURE [dbo].[spCourseLevels_GetById]
	@CourseId UNIQUEIDENTIFIER
AS
BEGIN
	SET NOCOUNT ON;

	SELECT	CourseId, LevelId
	FROM dbo.CourseAdvancementLevel
	WHERE CourseId = @CourseId;
END