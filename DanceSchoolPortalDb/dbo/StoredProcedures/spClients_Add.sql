﻿CREATE PROCEDURE [dbo].[spClients_Add]
	@PersonId UNIQUEIDENTIFIER
AS
BEGIN
	SET NOCOUNT ON;

	INSERT INTO dbo.Clients
	(PersonId)
	VALUES (@PersonId);
END