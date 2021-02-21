CREATE TABLE [dbo].[StudyGroupOrders]
(
	[StudyGrouipId] UNIQUEIDENTIFIER NOT NULL , 
    [OrderId] UNIQUEIDENTIFIER NOT NULL, 

    CONSTRAINT [PK_StudyGroupOrders] PRIMARY KEY ([StudyGrouipId], [OrderId]), 
    CONSTRAINT [FK_StudyGroup] FOREIGN KEY ([StudyGrouipId]) REFERENCES [StudyGroups]([Id]), 
    CONSTRAINT [FK_Order] FOREIGN KEY ([OrderId]) REFERENCES [Orders]([Id])
)
