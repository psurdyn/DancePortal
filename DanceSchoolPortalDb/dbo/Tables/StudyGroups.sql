CREATE TABLE [dbo].[StudyGroups]
(
	[Id] UNIQUEIDENTIFIER NOT NULL PRIMARY KEY DEFAULT NewId(), 
    [InstructorId] UNIQUEIDENTIFIER NOT NULL, 
    [RoomId] UNIQUEIDENTIFIER NOT NULL, 
    [CourseId] UNIQUEIDENTIFIER NOT NULL, 
    [SchoolId] UNIQUEIDENTIFIER NOT NULL, 
    [KindOfDanceId] UNIQUEIDENTIFIER NOT NULL, 
    [StartDate] DATETIME NOT NULL

    CONSTRAINT [fkStudyGroupsPersons] FOREIGN KEY ([InstructorId]) REFERENCES [dbo].[Persons](Id), 
    CONSTRAINT [fkStudyGroupsRooms] FOREIGN KEY (RoomId) REFERENCES [dbo].[Rooms](Id), 
    CONSTRAINT [fkStudyGroupsCourses] FOREIGN KEY (CourseId) REFERENCES [dbo].[Courses](Id),
    CONSTRAINT [fkSchools] FOREIGN KEY (SchoolId) REFERENCES [dbo].[Schools](Id),
    CONSTRAINT [fkKindOfDances] FOREIGN KEY (KindOfDanceId) REFERENCES [dbo].[KindsOfDances]
)

GO

CREATE TRIGGER [dbo].[tStudyGroups_Delete]
    ON [dbo].[StudyGroups]
    FOR DELETE
    AS

    DECLARE @StudyGroupId UNIQUEIDENTIFIER;

    IF EXISTS (SELECT * FROM DELETED)
    BEGIN
        SET NoCount ON;

        SET @StudyGroupId = (SELECT Id FROM DELETED);

        DELETE FROM dbo.StudyGroupOrders WHERE StudyGrouipId = @StudyGroupId;
        DELETE FROM dbo.ClientGroups WHERE StudyGroupId = @StudyGroupId;
    END