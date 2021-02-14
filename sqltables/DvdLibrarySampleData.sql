IF EXISTS(SELECT * FROM INFORMATION_SCHEMA.ROUTINES
	WHERE ROUTINE_NAME = 'DvdLibrarySampleData')
		DROP PROCEDURE DvdLibrarySampleData
GO

CREATE PROCEDURE DvdLibrarySampleData AS
BEGIN
	DELETE FROM Dvds;

	DBCC CHECKIDENT ('Dvds', RESEED, 0)

	INSERT INTO Dvds (Title, RealeaseYear, Director, Rating, Notes)
	VALUES ('Nemo', '1993', 'Sam Smith', 'G', ''),
		   ('Die Hard', '1986', 'Gaylord Munchen', 'R', ''),
		   ('Goonies', '1985', 'Steven Spielberg', 'G', 'Best movie ever!');

END

