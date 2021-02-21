CREATE PROCEDURE [dbo].[spOrders_GetById]
	@Id UNIQUEIDENTIFIER
AS
BEGIN
	SET NOCOUNT ON;

	SELECT Id, ClientId, WholeAmount, OrderDate, Discount
	FROM dbo.Orders
	WHERE Id = @Id;
END
