CREATE PROCEDURE [dbo].[spCourses_Add]
	@Name NVARCHAR(256),
	@Price DECIMAL(18,2),
	@KindOfDanceId UNIQUEIDENTIFIER,
	@SchoolId UNIQUEIDENTIFIER
AS
BEGIN
	SET NOCOUNT ON;

	INSERT INTO dbo.Courses
	([Name], Price, KindOfDanceId, SchoolId)
	OUTPUT INSERTED.Id
	VALUES (@Name, @Price, @KindOfDanceId, @SchoolId);
END