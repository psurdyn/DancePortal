CREATE TABLE [dbo].[ClientGroups]
(
    [StudyGroupId] UNIQUEIDENTIFIER NOT NULL, 
    [ClientId] UNIQUEIDENTIFIER NOT NULL

    CONSTRAINT [fkClientGroupsStudyGroups] FOREIGN KEY (StudyGroupId) REFERENCES [dbo].[StudyGroups](Id), 
    CONSTRAINT [PK_ClientGroups] PRIMARY KEY ([StudyGroupId], [ClientId])
)
