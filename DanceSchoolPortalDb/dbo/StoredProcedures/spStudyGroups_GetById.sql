CREATE PROCEDURE [dbo].[spStudyGroups_GetById]
	@Id UNIQUEIDENTIFIER
AS
BEGIN
	SET NOCOUNT ON;

	SELECT Id, InstructorId, RoomId, CourseId, SchoolId, KindOfDanceId, StartDate
	FROM dbo.StudyGroups
	WHERE Id = @Id;
END