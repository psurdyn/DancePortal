CREATE TABLE [dbo].[Courses]
(
	[Id] UNIQUEIDENTIFIER NOT NULL PRIMARY KEY DEFAULT NewId(),
    [Name] NVARCHAR(256) NOT NULL, 
    [Price] DECIMAL(18, 2) NOT NULL, 
    [KindOfDanceId] UNIQUEIDENTIFIER NOT NULL, 
    [SchoolId] UNIQUEIDENTIFIER NOT NULL
    
    CONSTRAINT [fkCoursesKindOfDance] FOREIGN KEY (KindOfDanceId) REFERENCES [dbo].[KindsOfDances](Id),
    CONSTRAINT [fkCoursesSchool] FOREIGN KEY (SchoolId) REFERENCES [dbo].[Schools](Id)
)

GO

CREATE TRIGGER [dbo].[tCourses_Delete]
    ON [dbo].[Courses]
    FOR DELETE
    AS

    DECLARE @CourseId UNIQUEIDENTIFIER;

    IF EXISTS (SELECT * FROM DELETED)
    BEGIN
        SET NoCount ON;

        SET @CourseId = (SELECT Id FROM DELETED);

        DELETE FROM dbo.CourseAdvancementLevel WHERE CourseId = @CourseId;
        DELETE FROM dbo.StudyGroups WHERE CourseId = @CourseId;

    END