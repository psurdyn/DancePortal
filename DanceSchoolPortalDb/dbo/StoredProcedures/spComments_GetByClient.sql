CREATE PROCEDURE [dbo].[spComments_GetByClient]
	@ClientId UNIQUEIDENTIFIER
AS
BEGIN
	SET NOCOUNT ON;

	SELECT * FROM dbo.Comments
	WHERE ClientId = @ClientId;
END