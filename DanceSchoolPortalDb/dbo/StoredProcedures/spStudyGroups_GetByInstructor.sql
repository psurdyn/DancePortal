CREATE PROCEDURE [dbo].[spStudyGroups_GetByInstructor]
	@InstructorId UNIQUEIDENTIFIER
AS
BEGIN
	SET NOCOUNT ON;

	SELECT Id, InstructorId, RoomId, CourseId, SchoolId, KindOfDanceId, StartDate
	FROM dbo.StudyGroups
	WHERE InstructorId = @InstructorId;
END