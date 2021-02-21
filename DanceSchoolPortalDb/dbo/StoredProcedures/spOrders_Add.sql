CREATE PROCEDURE [dbo].[spOrders_Add]
	@ClientId UNIQUEIDENTIFIER,
	@WholeAmount DECIMAL(18,2),
	@OrderDate DATETIME2(7),
	@Discount DECIMAL(18,2)
AS
BEGIN
	SET NOCOUNT ON;

	INSERT INTO dbo.Orders
	(ClientId, WholeAmount, OrderDate, Discount)
	VALUES (@ClientId, @WholeAmount, @OrderDate, @Discount);
END