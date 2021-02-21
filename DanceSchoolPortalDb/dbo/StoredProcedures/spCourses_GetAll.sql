CREATE PROCEDURE [dbo].[spCourses_GetAll]
AS
BEGIN
	SET NOCOUNT ON;

	SELECT Id, Price, [Name], KindOfDanceId, SchoolId
	FROM dbo.Courses;
END