CREATE PROCEDURE [dbo].[spKindsOfDances_Add]
	@Name NVARCHAR(256)
AS
BEGIN
	SET NOCOUNT ON;

	INSERT INTO dbo.KindsOfDances
	([Name])
	VALUES (@Name);
END