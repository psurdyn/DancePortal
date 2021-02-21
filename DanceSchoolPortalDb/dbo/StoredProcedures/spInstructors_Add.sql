CREATE PROCEDURE [dbo].[spInstructors_Add]
	@PersonId UNIQUEIDENTIFIER
AS
BEGIN
	INSERT INTO dbo.Instructors
	(PersonId)
	VALUES (@PersonId);
END