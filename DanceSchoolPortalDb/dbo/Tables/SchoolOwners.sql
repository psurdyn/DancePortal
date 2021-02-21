CREATE TABLE [dbo].[SchoolOwners]
(
	[SchoolId] UNIQUEIDENTIFIER NOT NULL,
	[OwnerId] UNIQUEIDENTIFIER NOT NULL

    CONSTRAINT [pk_SchoolOwners] PRIMARY KEY ([SchoolId], [OwnerId]), 
    CONSTRAINT [FK_SchoolOwners_Owner] FOREIGN KEY ([OwnerId]) REFERENCES [Owners]([PersonId]), 
    CONSTRAINT [FK_SchoolOwners_School] FOREIGN KEY ([SchoolId]) REFERENCES [Schools]([Id])
)

GO
