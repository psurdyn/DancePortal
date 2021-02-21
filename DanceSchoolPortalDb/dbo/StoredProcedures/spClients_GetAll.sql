CREATE PROCEDURE [dbo].[spClients_GetAll]
AS
BEGIN
	SET NOCOUNT ON;

	SELECT PersonId
	FROM dbo.Clients;
END 