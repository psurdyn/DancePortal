CREATE TABLE [dbo].[CourseAdvancementLevel]
(
	[CourseId] UNIQUEIDENTIFIER NOT NULL, 
    [LevelId] UNIQUEIDENTIFIER NOT NULL, 

    CONSTRAINT [FK_CourseAdvancementLevel_Course] FOREIGN KEY ([CourseId]) REFERENCES [dbo].[Courses]([Id]), 
    CONSTRAINT [FK_CourseAdvancementLevel_Level] FOREIGN KEY ([LevelId]) REFERENCES [dbo].[Levels]([Id]), 
    CONSTRAINT [PK_CourseAdvancementLevel] PRIMARY KEY ([CourseId], [LevelId])
)
