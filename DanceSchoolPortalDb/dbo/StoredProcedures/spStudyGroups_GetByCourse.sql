CREATE PROCEDURE [dbo].[spStudyGroups_GetByCourse]
	@CourseId UNIQUEIDENTIFIER
AS
BEGIN
	SET NOCOUNT ON;

	SELECT Id, InstructorId, RoomId, CourseId, SchoolId, KindOfDanceId, StartDate
	FROM dbo.StudyGroups
	WHERE CourseId = @CourseId;
END