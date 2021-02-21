CREATE PROCEDURE [dbo].[spRooms_Add]
	@RoomNumber INT
AS
BEGIN
	SET NOCOUNT ON;

	INSERT INTO dbo.Rooms
	(RoomNumber)
	VALUES (@RoomNumber);
END