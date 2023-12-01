DROP DATABASE IF EXISTS CHATDB;
CREATE DATABASE IF NOT EXISTS CHATDB;

USE CHATDB;

CREATE TABLE Users(
    UID INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    USERNAME VARCHAR(45),
    PASSWORD VARCHAR(45),
    FIRSTNAME VARCHAR(45),
    LASTNAME VARCHAR(45),
    PREFNAME VARCHAR(45),
    SHORTTERM BOOLEAN,
    LONGTERM BOOLEAN,
    GPA DOUBLE,
    YEAR INT
);

CREATE TABLE Chatrooms(
    CID INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    NAME VARCHAR(45),
    PRIVATE BOOLEAN,
    PASSWORD VARCHAR(45)
);

CREATE TABLE Classes(
    CID INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    NAME VARCHAR(45)
);

CREATE TABLE Enrollments(
    UID INT,
    CID INT,
    FOREIGN KEY (UID) REFERENCES Users(UID),
    FOREIGN KEY (CID) REFERENCES Classes(CID)
);

CREATE TABLE Chatters(
    CID INT,
    UID INT,
    FOREIGN KEY (CID) REFERENCES Chatrooms(CID),
    FOREIGN KEY (UID) REFERENCES Users(UID)
);

CREATE TABLE FriendRequests(
    SENDER INT,
    RECEIVER INT,
    STATUS VARCHAR(20),
    FOREIGN KEY (SENDER) REFERENCES Users(UID),
    FOREIGN KEY (RECEIVER) REFERENCES Users(UID)
);

CREATE TABLE Friends(
    UID INT,
    FUID INT,
    FOREIGN KEY (UID) REFERENCES Users(UID),
    FOREIGN KEY (FUID) REFERENCES Users(UID)
);

--Below is mock data
INSERT INTO Users (USERNAME, PASSWORD, FIRSTNAME, LASTNAME, PREFNAME, SHORTTERM, LONGTERM, GPA, YEAR)
VALUES 
('johndoe', 'password123', 'John', 'Doe', 'Johnny', TRUE, FALSE, 3.5, 2),
('janedoe', 'securepass', 'Jane', 'Doe', 'Janey', FALSE, TRUE, 3.8, 1),
('mikebrown', 'mikepass', 'Michael', 'Brown', 'Mike', TRUE, TRUE, 2.7, 3),
('lucygreen', 'lucy1234', 'Lucy', 'Green', 'Luc', FALSE, TRUE, 3.9, 4),
('davidlee', 'davidpw', 'David', 'Lee', 'Dave', TRUE, FALSE, 2.9, 2),
('emilywhite', 'emilypw', 'Emily', 'White', 'Em', FALSE, TRUE, 3.6, 1),
('samsmith', 'ssmith', 'Samuel', 'Smith', 'Sam', TRUE, FALSE, 3.3, 3),
('lilyevans', 'lilypassword', 'Lily', 'Evans', 'Lils', FALSE, TRUE, 3.7, 4),
('marktwain', 'marktwainpw', 'Mark', 'Twain', 'MarkT', TRUE, TRUE, 2.8, 2),
('sarahconnor', 'sarahcpass', 'Sarah', 'Connor', 'SarahC', FALSE, TRUE, 3.4, 1);

INSERT INTO Classes (NAME) VALUES ('CSCI201'), ('CSCI104'), ('CSCI103'), ('CSCI170'), ('CSCI1270'), ('CSCI310'), ('CSCI401');

INSERT INTO Enrollments (UID, CID) VALUES (1, 1), (2, 1), (2, 2), (3, 2), (3, 3);

INSERT INTO Friends(UID, FUID) VALUES (1,2), (1,4), (1,6), (1, 8), (1,10);

INSERT INTO FriendRequests(SENDER, RECEIVER) VALUES (3, 1), (5, 1), (7, 1), (9, 1);