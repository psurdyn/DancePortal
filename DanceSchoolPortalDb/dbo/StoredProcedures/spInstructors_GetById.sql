CREATE PROCEDURE [dbo].[spInstructors_GetById]
	@PersonId UNIQUEIDENTIFIER
AS
BEGIN
SET NOCOUNT ON;

SELECT PersonId
FROM dbo.Instructors
WHERE PersonId = @PersonId;

END
