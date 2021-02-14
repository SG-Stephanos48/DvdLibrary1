IF EXISTS(SELECT * FROM INFORMATION_SCHEMA.ROUTINES
	WHERE ROUTINE_NAME = 'DvdsSelectAll')
		DROP PROCEDURE DvdsSelectAll
GO

CREATE PROCEDURE DvdsSelectAll AS 
BEGIN
	SELECT DvdId, Title, RealeaseYear, Director, Rating, Notes
	FROM Dvds
END

GO

IF EXISTS(SELECT * FROM INFORMATION_SCHEMA.ROUTINES
	WHERE ROUTINE_NAME = 'DvdsSelect')
		DROP PROCEDURE DvdsSelect
GO

CREATE PROCEDURE DvdsSelect (
	@dvdId int
)AS 
BEGIN
	SELECT DvdId, Title, RealeaseYear, Director, Rating, Notes
	FROM Dvds
	WHERE DvdId = @dvdId
END

GO

IF EXISTS(SELECT * FROM INFORMATION_SCHEMA.ROUTINES
	WHERE ROUTINE_NAME = 'DvdsInsert')
		DROP PROCEDURE DvdsInsert
GO

CREATE PROCEDURE DvdsInsert (
	@DvdId int output,
	@Title nvarchar(128),
	@RealeaseYear nvarchar(50),
	@Director nvarchar(50),
	@Rating nvarchar(50),
	@Notes nvarchar(100)
) AS
BEGIN
	INSERT INTO Dvds (Title, RealeaseYear, Director, Rating, Notes)
	VALUES (@Title, @RealeaseYear, @Director, @Rating, @Notes);
	
	SET @DvdId = SCOPE_IDENTITY();
END

GO

IF EXISTS(SELECT * FROM INFORMATION_SCHEMA.ROUTINES
	WHERE ROUTINE_NAME = 'DvdsUpdate')
		DROP PROCEDURE DvdsUpdate
GO

CREATE PROCEDURE DvdsUpdate (
	@DvdId int,
	@Title nvarchar(128),
	@RealeaseYear nvarchar(50),
	@Director nvarchar(50),
	@Rating nvarchar(50),
	@Notes nvarchar(100)
) AS
BEGIN
	UPDATE Dvds SET 
		Title = @Title, 
		RealeaseYear = @RealeaseYear,
		Director = @Director,
		Rating = @Rating,
		Notes = @Notes
	WHERE DvdId = @DvdId

END

GO

IF EXISTS(SELECT * FROM INFORMATION_SCHEMA.ROUTINES
	WHERE ROUTINE_NAME = 'DvdsDelete')
		DROP PROCEDURE DvdsDelete
GO

CREATE PROCEDURE DvdsDelete (
	@DvdId int
) AS
BEGIN
	BEGIN TRANSACTION

	DELETE FROM Dvds WHERE DvdId = @DvdId;

	COMMIT TRANSACTION

END
GO

IF EXISTS(SELECT * FROM INFORMATION_SCHEMA.ROUTINES
	WHERE ROUTINE_NAME = 'DvdsSelectRecent')
		DROP PROCEDURE DvdsSelectRecent
GO

CREATE PROCEDURE DvdsSelectRecent AS 
BEGIN
	SELECT TOP 5 DvdId, Title, RealeaseYear, Director, Rating, Notes
	FROM Dvds
	ORDER BY DvdId DESC
END

GO

IF EXISTS(SELECT * FROM INFORMATION_SCHEMA.ROUTINES
	WHERE ROUTINE_NAME = 'DvdsSelectTitle')
		DROP PROCEDURE DvdsSelectTitle
GO

CREATE PROCEDURE DvdsSelectTitle (
	@searchItem nvarchar(128)
)AS 
BEGIN
	SELECT DvdId, Title, RealeaseYear, Director, Rating, Notes
	FROM Dvds
	WHERE Title Like @searchItem
END

GO

IF EXISTS(SELECT * FROM INFORMATION_SCHEMA.ROUTINES
	WHERE ROUTINE_NAME = 'DvdsSelectYear')
		DROP PROCEDURE DvdsSelectYear
GO

CREATE PROCEDURE DvdsSelectYear (
	@searchItem nvarchar(50)
)AS 
BEGIN
	SELECT DvdId, Title, RealeaseYear, Director, Rating, Notes
	FROM Dvds
	WHERE RealeaseYear Like @searchItem
END

GO

IF EXISTS(SELECT * FROM INFORMATION_SCHEMA.ROUTINES
	WHERE ROUTINE_NAME = 'DvdsSelectDirector')
		DROP PROCEDURE DvdsSelectDirector
GO

CREATE PROCEDURE DvdsSelectDirector (
	@searchItem nvarchar(50)
)AS 
BEGIN
	SELECT DvdId, Title, RealeaseYear, Director, Rating, Notes
	FROM Dvds
	WHERE Director Like @searchItem
END

GO

IF EXISTS(SELECT * FROM INFORMATION_SCHEMA.ROUTINES
	WHERE ROUTINE_NAME = 'DvdsSelectRating')
		DROP PROCEDURE DvdsSelectRating
GO

CREATE PROCEDURE DvdsSelectRating (
	@searchItem nvarchar(50)
)AS 
BEGIN
	SELECT DvdId, Title, RealeaseYear, Director, Rating, Notes
	FROM Dvds
	WHERE Rating Like @searchItem
END

GO