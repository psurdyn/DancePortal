﻿CREATE TABLE [dbo].[Rooms]
(
	[Id] UNIQUEIDENTIFIER NOT NULL PRIMARY KEY DEFAULT NewId(), 
    [RoomNumber] INT NOT NULL
)
