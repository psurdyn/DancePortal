CREATE PROCEDURE [dbo].[spComments_Add]
	@ClientId UNIQUEIDENTIFIER,
	@SchoolId UNIQUEIDENTIFIER,
	@Text NVARCHAR(2048)
AS
BEGIN
	SET NOCOUNT ON;

	INSERT INTO dbo.Comments (ClientId, SchoolId, [Text])
	VALUES (@ClientId, @SchoolId, @Text);
END
