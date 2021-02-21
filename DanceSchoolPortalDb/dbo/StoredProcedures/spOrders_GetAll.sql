CREATE PROCEDURE [dbo].[spOrders_GetAll]
AS
BEGIN
	SET NOCOUNT ON;

	SELECT Id, ClientId, WholeAmount, OrderDate, Discount
	FROM dbo.Orders;
END