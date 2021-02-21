CREATE PROCEDURE [dbo].[spOrders_GetByClient]
	@ClientId UNIQUEIDENTIFIER
AS
BEGIN
	SET NOCOUNT ON;

	SELECT Id, ClientId, WholeAmount, OrderDate, Discount
	FROM dbo.Orders
	WHERE ClientId = @ClientId;
END
