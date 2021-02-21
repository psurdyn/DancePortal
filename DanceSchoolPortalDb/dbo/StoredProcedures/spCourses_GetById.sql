CREATE PROCEDURE [dbo].[spCourses_GetById]
	@Id UNIQUEIDENTIFIER
AS
BEGIN
	SET NOCOUNT ON;

	SELECT Id, Price, [Name], KindOfDanceId, SchoolId
	FROM dbo.Courses
	WHERE Id = @Id;
END