﻿CREATE PROCEDURE [dbo].[spCourses_Remove]
	@Id UNIQUEIDENTIFIER
AS
BEGIN
	SET NOCOUNT ON;

	DELETE FROM dbo.Courses
	WHERE Id = @Id;
END;
