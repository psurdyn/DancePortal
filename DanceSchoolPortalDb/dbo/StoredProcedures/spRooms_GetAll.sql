CREATE PROCEDURE [dbo].[spRooms_GetAll]
AS
BEGIN
	SET NOCOUNT ON;

	SELECT Id, RoomNumber
	FROM dbo.Rooms;
END