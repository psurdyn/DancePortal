BEGIN

INSERT INTO [dbo].[Levels] ([Id], [Name]) VALUES (N'80373697-9999-111a-a3ca-01bf9808d666', 'Podstawowy')
INSERT INTO [dbo].[Levels] ([Id], [Name]) VALUES (N'2c37c55e-9999-222a-bb63-0973293bd99d', 'Zaawansowany')
INSERT INTO [dbo].[Levels] ([Id], [Name]) VALUES (N'2c37c55e-9999-333a-bb63-0973293bd99d', 'Mistrzowski')

INSERT INTO [dbo].[AspNetUsers] ([Id], [Email], [EmailConfirmed], [PasswordHash], [SecurityStamp], [PhoneNumber], [PhoneNumberConfirmed], [TwoFactorEnabled], [LockoutEndDateUtc], [LockoutEnabled], [AccessFailedCount], [UserName]) VALUES (N'E7973699-6751-1111-8BA3-0D1E315BD633', N'ivan@email.com', 0, N'AHTxtPg4LQx9iY029cOF1qQLpA65XjJjBd9ooh2aKlhTtqga5S/+e0FNRjVjbR66nA==', N'sample1', NULL, 0, 0, NULL, 0, 0, N'ivan@email.com')
INSERT INTO [dbo].[AspNetUsers] ([Id], [Email], [EmailConfirmed], [PasswordHash], [SecurityStamp], [PhoneNumber], [PhoneNumberConfirmed], [TwoFactorEnabled], [LockoutEndDateUtc], [LockoutEnabled], [AccessFailedCount], [UserName]) VALUES (N'E7973699-6751-2222-8BA3-0D1E315BD634', N'aa@aa.aa', 0, N'AHTxtPg4LQx9iY029cOF1qQLpA65XjJjBd9ooh2aKlhTtqga5S/+e0FNRjVjbR66nA==', N'sample2', NULL, 0, 0, NULL, 0, 0, N'aa@aa.aa')
INSERT INTO [dbo].[AspNetUsers] ([Id], [Email], [EmailConfirmed], [PasswordHash], [SecurityStamp], [PhoneNumber], [PhoneNumberConfirmed], [TwoFactorEnabled], [LockoutEndDateUtc], [LockoutEnabled], [AccessFailedCount], [UserName]) VALUES (N'E7973699-6751-3333-8BA3-0D1E315BD635', N'bb@bb.bb', 0, N'AHTxtPg4LQx9iY029cOF1qQLpA65XjJjBd9ooh2aKlhTtqga5S/+e0FNRjVjbR66nA==', N'sample3', NULL, 0, 0, NULL, 0, 0, N'bb@bb.bb')
INSERT INTO [dbo].[AspNetUsers] ([Id], [Email], [EmailConfirmed], [PasswordHash], [SecurityStamp], [PhoneNumber], [PhoneNumberConfirmed], [TwoFactorEnabled], [LockoutEndDateUtc], [LockoutEnabled], [AccessFailedCount], [UserName]) VALUES (N'E7973699-6751-4444-8BA3-0D1E315BD636', N'cc@cc.cc', 0, N'AHTxtPg4LQx9iY029cOF1qQLpA65XjJjBd9ooh2aKlhTtqga5S/+e0FNRjVjbR66nA==', N'sample4', NULL, 0, 0, NULL, 0, 0, N'cc@cc.cc')

INSERT INTO [dbo].[Persons] ([Id], [AspNetUserId], [FirstName], [LastName], [Email], [Sex], [TelephoneNumber]) VALUES (N'fef56095-20e8-45ac-ad12-ddf52e99c570', N'E7973699-6751-1111-8BA3-0D1E315BD633', N'Ivan', N'Delfin', N'ivan@email.com', N'M', '111 111 111')
INSERT INTO [dbo].[Persons] ([Id], [AspNetUserId], [FirstName], [LastName], [Email], [Sex], [TelephoneNumber]) VALUES (N'fef56095-20e8-45ac-ad12-ddf52e99c571', N'E7973699-6751-2222-8BA3-0D1E315BD634', N'Aa', N'Aa', N'aa@aa.aa', N'M', '222 222 222')
INSERT INTO [dbo].[Persons] ([Id], [AspNetUserId], [FirstName], [LastName], [Email], [Sex], [TelephoneNumber]) VALUES (N'fef56095-20e8-45ac-ad12-ddf52e99c572', N'E7973699-6751-3333-8BA3-0D1E315BD635', N'Bb', N'Bb', N'bb@bb.bb', N'M', '333 333 333')
INSERT INTO [dbo].[Persons] ([Id], [AspNetUserId], [FirstName], [LastName], [Email], [Sex], [TelephoneNumber]) VALUES (N'fef56095-20e8-45ac-ad12-ddf52e99c573', N'E7973699-6751-4444-8BA3-0D1E315BD636', N'Cc', N'Cc', N'cc@cc.cc', N'F', '444 444 444')

INSERT INTO [dbo].[Clients] ([PersonId]) VALUES (N'fef56095-20e8-45ac-ad12-ddf52e99c571')
INSERT INTO [dbo].[Clients] ([PersonId]) VALUES (N'fef56095-20e8-45ac-ad12-ddf52e99c572')

INSERT INTO [dbo].[Owners] ([PersonId]) VALUES (N'fef56095-20e8-45ac-ad12-ddf52e99c573')

INSERT INTO [dbo].[Instructors] ([PersonId]) VALUES (N'fef56095-20e8-45ac-ad12-ddf52e99c570')

INSERT INTO [dbo].[KindsOfDances] ([Id], [Name]) VALUES (N'fef56095-20e8-45ac-aaaa-ddf52e99c570', N'Polish disco dance')
INSERT INTO [dbo].[KindsOfDances] ([Id], [Name]) VALUES (N'fef56095-20e8-45ac-cccc-ddf52e99c570', N'Wygibasy 1')
INSERT INTO [dbo].[KindsOfDances] ([Id], [Name]) VALUES (N'fef56095-20e8-45ac-dddd-ddf52e99c570', N'Wygibasy 2')
INSERT INTO [dbo].[KindsOfDances] ([Id], [Name]) VALUES (N'fef56095-20e8-45ac-eeee-ddf52e99c570', N'Wygibasy 3')

INSERT INTO [dbo].[Schools] ([Id], [Name], [City], [PostalCode], [Street], [EmailAddress], [WebAddress], [TelephoneNumber], [Description], [CreationDate]) VALUES (N'44bf029e-154e-4ccb-bbbb-1f6d5fc433cc', N'Studiox Zabek', N'Kraków', N'03-777', N'Zabowska 99', N'taniec@zabek.pl', N'www.studiozabek.pl', N'789123456', NULL, NULL)
INSERT INTO [dbo].[Schools] ([Id], [Name], [City], [PostalCode], [Street], [EmailAddress], [WebAddress], [TelephoneNumber], [Description], [CreationDate]) VALUES (N'44bf029e-154e-4ccb-cccc-1f6d5fc433cc', N'Studiox Praga', N'Warszawa', N'03-712', N'Targowa 81', N'taniec123@praga.pl', N'www.studio-praga.pl', N'456123789', NULL, NULL)

INSERT INTO [dbo].[Courses] ([Id], [Name], [Price], [KindOfDanceId], [SchoolId]) VALUES (N'fd20f819-42b1-42ee-9ba1-a72fbb9ab883', N'Painting Stair-Rods', CAST(14.00 AS Decimal(18, 2)), N'fef56095-20e8-45ac-aaaa-ddf52e99c570', N'44bf029e-154e-4ccb-bbbb-1f6d5fc433cc')
INSERT INTO [dbo].[Courses] ([Id], [Name], [Price], [KindOfDanceId], [SchoolId]) VALUES (N'090f24eb-d4ee-4e25-8c89-d7165348aadf', N'Zumba for the king', CAST(23.00 AS Decimal(18, 2)), N'fef56095-20e8-45ac-cccc-ddf52e99c570', N'44bf029e-154e-4ccb-cccc-1f6d5fc433cc')

INSERT INTO [dbo].[Rooms] ([Id], [RoomNumber]) VALUES (N'80373697-b62e-419f-a3ca-01bf9808d666', 66)
INSERT INTO [dbo].[Rooms] ([Id], [RoomNumber]) VALUES (N'2c37c55e-1363-44c6-bb63-0973293bd99d', 99)

INSERT INTO [dbo].[StudyGroups] ([Id], [InstructorId], [RoomId], [CourseId], [SchoolId], [KindOfDanceId], [StartDate]) VALUES (N'9471bb38-fddc-4ad3-9c45-40ab34f2854f', N'fef56095-20e8-45ac-ad12-ddf52e99c570', N'80373697-b62e-419f-a3ca-01bf9808d666', N'fd20f819-42b1-42ee-9ba1-a72fbb9ab883', N'44bf029e-154e-4ccb-bbbb-1f6d5fc433cc', N'fef56095-20e8-45ac-aaaa-ddf52e99c570', N'2021-01-13 00:00:00')
INSERT INTO [dbo].[StudyGroups] ([Id], [InstructorId], [RoomId], [CourseId], [SchoolId], [KindOfDanceId], [StartDate]) VALUES (N'c0f696f3-2530-4202-848d-7e5c35f1f448', N'fef56095-20e8-45ac-ad12-ddf52e99c570', N'80373697-b62e-419f-a3ca-01bf9808d666', N'fd20f819-42b1-42ee-9ba1-a72fbb9ab883', N'44bf029e-154e-4ccb-bbbb-1f6d5fc433cc', N'fef56095-20e8-45ac-cccc-ddf52e99c570', N'2021-01-11 00:00:00')
INSERT INTO [dbo].[StudyGroups] ([Id], [InstructorId], [RoomId], [CourseId], [SchoolId], [KindOfDanceId], [StartDate]) VALUES (N'8e9a5f34-9531-4ab9-aec4-b4e1c115184c', N'fef56095-20e8-45ac-ad12-ddf52e99c570', N'2c37c55e-1363-44c6-bb63-0973293bd99d', N'090f24eb-d4ee-4e25-8c89-d7165348aadf', N'44bf029e-154e-4ccb-cccc-1f6d5fc433cc', N'fef56095-20e8-45ac-dddd-ddf52e99c570', N'2021-01-08 00:00:00')
INSERT INTO [dbo].[StudyGroups] ([Id], [InstructorId], [RoomId], [CourseId], [SchoolId], [KindOfDanceId], [StartDate]) VALUES (N'5eeab5d2-6299-4a04-b3b6-fcbfbda78716', N'fef56095-20e8-45ac-ad12-ddf52e99c570', N'2c37c55e-1363-44c6-bb63-0973293bd99d', N'090f24eb-d4ee-4e25-8c89-d7165348aadf', N'44bf029e-154e-4ccb-cccc-1f6d5fc433cc', N'fef56095-20e8-45ac-eeee-ddf52e99c570', N'2021-01-13 00:00:00')

END
