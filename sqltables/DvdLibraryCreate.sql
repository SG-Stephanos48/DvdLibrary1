USE master
GO

IF EXISTS(SELECT * FROM sys.databases WHERE name='DvdLibrary')
DROP DATABASE DvdLibrary
GO

CREATE DATABASE DvdLibrary
GO

USE DvdLibrary
GO

IF EXISTS(SELECT * FROM sys.tables WHERE name='Dvds')
	DROP TABLE Dvds
GO

CREATE TABLE Dvds (
	DvdId int identity(1,1) not null primary key,
	Title nvarchar(128) not null,
	RealeaseYear nvarchar(50) not null,
	Director nvarchar(50) not null,
	Rating nvarchar(50) not null,
	Notes nvarchar(100) null
)