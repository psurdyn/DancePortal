CREATE TABLE [dbo].[Comments]
(
    [Id] UNIQUEIDENTIFIER NOT NULL PRIMARY KEY DEFAULT NewId(), 
	[ClientId] UNIQUEIDENTIFIER NOT NULL , 
    [SchoolId] UNIQUEIDENTIFIER NOT NULL, 
    [Text] NVARCHAR(2048) NOT NULL, 
    
    CONSTRAINT [FK_Comments_Client] FOREIGN KEY ([ClientId]) REFERENCES [Clients]([PersonId]), 
    CONSTRAINT [FK_Comments_School] FOREIGN KEY ([SchoolId]) REFERENCES [Schools]([Id])
)
