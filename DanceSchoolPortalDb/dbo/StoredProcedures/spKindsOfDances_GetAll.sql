CREATE PROCEDURE [dbo].[spKindsOfDances_GetAll]
AS
BEGIN
	SET NOCOUNT ON;

	SELECT Id, [Name]
	FROM dbo.KindsOfDances;
END