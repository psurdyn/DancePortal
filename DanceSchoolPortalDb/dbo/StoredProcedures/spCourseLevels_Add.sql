CREATE PROCEDURE [dbo].[spCourseLevels_Add]
	@CourseId UNIQUEIDENTIFIER,
	@LevelId UNIQUEIDENTIFIER
AS
BEGIN
	SET NOCOUNT ON;

	INSERT INTO dbo.CourseAdvancementLevel
	(CourseId, LevelId)
	VALUES (@CourseId, @LevelId);
END