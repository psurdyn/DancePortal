CREATE PROCEDURE [dbo].[spCourseLevels_GetAll]
AS
BEGIN
	SET NOCOUNT ON;

	SELECT CourseId, LevelId
	FROM dbo.CourseAdvancementLevel;
END