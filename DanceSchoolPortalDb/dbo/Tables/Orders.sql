CREATE TABLE [dbo].[Orders]
(
	[Id] UNIQUEIDENTIFIER NOT NULL PRIMARY KEY DEFAULT NewId(), 
    [ClientId] UNIQUEIDENTIFIER NOT NULL, 
    [WholeAmount] DECIMAL(18, 2) NOT NULL, 
    [OrderDate] DATETIME2 NOT NULL, 
    [Discount] DECIMAL(18, 2) NULL

    CONSTRAINT [fkOrdersClients] FOREIGN KEY (ClientId) REFERENCES [dbo].[Clients](PersonId)
)

GO

CREATE TRIGGER [dbo].[tCheckInsertedDiscount]
    ON [dbo].[Orders]
    FOR INSERT, UPDATE
    AS
	DECLARE @insertedDicount decimal

	SELECT @insertedDicount = Discount FROM INSERTED

	IF(@insertedDicount > 100)
    BEGIN
        SET NoCount ON

		UPDATE [dbo].[Orders] SET Discount = 100
		WHERE Id = (SELECT Id FROM INSERTED)
    END
	
	ELSE IF (@insertedDicount < 0)
	BEGIN
		UPDATE [dbo].[Orders] SET Discount = 0
		WHERE Id = (Select Id FROM INSERTED)
	END
GO

CREATE TRIGGER [dbo].[tOrders_Delete]
    ON [dbo].[Orders]
    FOR DELETE
    AS
    DECLARE @OrderId UNIQUEIDENTIFIER;
    IF EXISTS (SELECT * FROM DELETED)	
    BEGIN
        SET NoCount ON;

        SELECT @OrderId = Id FROM DELETED;

        DELETE FROM StudyGroupOrders WHERE OrderId = @OrderId;
    END