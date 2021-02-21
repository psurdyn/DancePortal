CREATE PROCEDURE [dbo].[spStudyGroups_Add]
	@InstructorId UNIQUEIDENTIFIER,
	@RoomId UNIQUEIDENTIFIER,
	@CourseId UNIQUEIDENTIFIER,
	@SchoolId UNIQUEIDENTIFIER,
	@KindOfDanceId UNIQUEIDENTIFIER,
	@StartDate DATETIME
AS
BEGIN
	SET NOCOUNT ON;

	INSERT INTO dbo.StudyGroups
	(InstructorId, RoomId, CourseId, SchoolId, KindOfDanceId, StartDate)
	VALUES (@InstructorId, @RoomId, @CourseId, @SchoolId, @KindOfDanceId, @StartDate);
END