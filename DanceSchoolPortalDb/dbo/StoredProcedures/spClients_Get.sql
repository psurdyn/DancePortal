CREATE PROCEDURE [dbo].[spClients_GetById]
	@PersonId UNIQUEIDENTIFIER
AS
BEGIN
	SELECT PersonId
	FROM dbo.Clients
	WHERE PersonId = @PersonId;
END