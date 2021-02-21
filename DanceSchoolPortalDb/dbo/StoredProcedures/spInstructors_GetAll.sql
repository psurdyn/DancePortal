CREATE PROCEDURE [dbo].[spInstructos_GetAll]
AS
BEGIN
	SELECT PersonId
	FROM dbo.Instructors;
END