BEGIN
	--Adding roles
	INSERT INTO dbo.AspNetRoles VALUES (NEWID(), 'Administrator');
	INSERT INTO dbo.AspNetRoles VALUES (NEWID(), 'Client');
	INSERT INTO dbo.AspNetRoles VALUES (NEWID(), 'DanceSchool');
	INSERT INTO dbo.AspNetRoles VALUES (NEWID(), 'DanceInstructor');	
	--Adding Admin
	INSERT INTO dbo.AspNetUsers
	(Id, Email, PasswordHash, EmailConfirmed, SecurityStamp, PhoneNumberConfirmed, TwoFactorEnabled, LockoutEnabled, AccessFailedCount, UserName)
	VALUES (NEWID(), 'admin@email.com', 'AHTxtPg4LQx9iY029cOF1qQLpA65XjJjBd9ooh2aKlhTtqga5S/+e0FNRjVjbR66nA==', 0, 'sample', 0, 0, 0, 0, 'admin@email.com');

	DECLARE @adminUserId NVARCHAR(128);
	DECLARE @adminRoleId NVARCHAR(128);

	SET @adminUserId = (SELECT TOP 1  Id FROM dbo.AspNetUsers
		WHERE UserName = 'admin@email.com');
	SET @adminRoleId = (SELECT TOP 1 Id FROM dbo.AspNetRoles
		WHERE Name = 'Administrator');

		INSERT INTO dbo.Persons
	(AspNetUserId, FirstName, LastName, Email, Sex)
	VALUES (@adminUserId, 'Jakub', 'Admin', 'admin@email.com', 'M');

	DECLARE @adminPersonId UNIQUEIDENTIFIER;
	SET @adminPersonId = (SELECT TOP 1 Id FROM dbo.Persons WHERE Email = 'admin@email.com');

	INSERT INTO dbo.Administrators
	(PersonId)
	VALUES (@adminPersonId);

	--Adding rooms
	INSERT INTO dbo.Rooms (RoomNumber)
	VALUES (1);
	INSERT INTO dbo.Rooms (RoomNumber)
	VALUES (2);
	INSERT INTO dbo.Rooms (RoomNumber)
	VALUES (3);
	INSERT INTO dbo.Rooms (RoomNumber)
	VALUES (4);
	INSERT INTO dbo.Rooms (RoomNumber)
	VALUES (5);
	INSERT INTO dbo.Rooms (RoomNumber)
	VALUES (6);
	INSERT INTO dbo.Rooms (RoomNumber)
	VALUES (7);
	INSERT INTO dbo.Rooms (RoomNumber)
	VALUES (8);
	--Adding mocked schools
	INSERT INTO dbo.Schools ([Street], [City], EmailAddress, [Name], TelephoneNumber, WebAddress, PostalCode)
	VALUES ('Kasprzaka 15', 'Kraków', 'studio@taniec.pl', 'Studio Tanca', '123456789', 'www.studio-tanca.pl', '03-777');
	INSERT INTO dbo.Schools ([Street], [City], EmailAddress, [Name], TelephoneNumber, WebAddress, PostalCode)
	VALUES ('Polna 18','Kraków', 'rytm@rytm.pl', 'Rytm', '987654321', 'www.rytm.pl', '03-777');
	INSERT INTO dbo.Schools ([Street], [City], EmailAddress, [Name], TelephoneNumber, WebAddress, PostalCode)
	VALUES ('Targowa 81', 'Kraków','taniec@praga.pl', 'Studio Praga', '456123789', 'www.studio-praga.pl', '03-777');
	INSERT INTO dbo.Schools ([Street], [City], EmailAddress, [Name], TelephoneNumber, WebAddress, PostalCode)
	VALUES ('Ząbowska 99','Kraków', 'taniec@zabek.pl', 'Studio Ząbek', '789123456', 'www.studiozabek.pl', '03-777');
	INSERT INTO dbo.Schools ([Street], [City], EmailAddress, [Name], TelephoneNumber, WebAddress, PostalCode)
	VALUES ('Marszałkowska 17/24', 'Kraków','centrum@taniec.pl', 'Centrum Taniec', '975123456', 'www.taniec-centrum.pl', '03-777');
	INSERT INTO dbo.Schools ([Street], [City], EmailAddress, [Name], TelephoneNumber, WebAddress, PostalCode)
	VALUES ('Towarowa 88/76', 'Kraków','pierwszykrok@szkola.pl', 'Szkoła Pierwszy Krok', '908562134', 'www.pierwszy-krok.pl', '03-777');
	INSERT INTO dbo.Schools ([Street], [City], EmailAddress, [Name], TelephoneNumber, WebAddress, PostalCode)
	VALUES ('Jan Olbrachta 8', 'Kraków','meduza@meduza.pl', 'Meduza', '109208307', 'www.meduza.pl', '03-777');
	--Adding kind of dances
	INSERT INTO dbo.KindsOfDances ([Name])
	VALUES ('Tango');
	INSERT INTO dbo.KindsOfDances ([Name])
	VALUES ('English waltz');
	INSERT INTO dbo.KindsOfDances ([Name])
	VALUES ('Vienna waltz');
	INSERT INTO dbo.KindsOfDances ([Name])
	VALUES ('Salsa');
	INSERT INTO dbo.KindsOfDances ([Name])
	VALUES ('Cuban salsa');
	INSERT INTO dbo.KindsOfDances ([Name])
	VALUES ('Cha-cha');
	INSERT INTO dbo.KindsOfDances ([Name])
	VALUES ('Rumba');
	INSERT INTO dbo.KindsOfDances ([Name])
	VALUES ('Disco-samba');
	INSERT INTO dbo.KindsOfDances ([Name])
	VALUES ('Samba');
	INSERT INTO dbo.KindsOfDances ([Name])
	VALUES ('Jive');
	--Adding advancment levels
	INSERT INTO dbo.Levels ([Name]) VALUES ('Początkujący');
	INSERT INTO dbo.Levels ([Name]) VALUES ('Średnio-zawaansowany');
	INSERT INTO dbo.Levels ([Name]) VALUES ('Zawaansowany');

END
