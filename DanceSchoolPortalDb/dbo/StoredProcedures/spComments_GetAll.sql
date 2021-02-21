CREATE PROCEDURE [dbo].[spComments_GetAll]
AS
BEGIN
	SET NOCOUNT ON;

	SELECT * FROM dbo.Comments;
END
