CREATE PROCEDURE [dbo].[spOwners_GetAll]
AS
BEGIN 
	SET NOCOUNT ON;

	SELECT PersonId
	FROM dbo.Owners;
END