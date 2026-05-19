CREATE SCHEMA ReservasLabs;
USE ReservasLabs;

CREATE TABLE Usuario (
    IdUser INT AUTO_INCREMENT PRIMARY KEY,
    Login VARCHAR(30) NOT NULL UNIQUE,
    Senha VARCHAR(255) NOT NULL,
    StatusADM BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE Laboratorio (
    IdLab INT AUTO_INCREMENT PRIMARY KEY,
    NomeLab VARCHAR(30) NOT NULL UNIQUE,
    HoraEntrada TIME NOT NULL,
    HoraSaida TIME NOT NULL
);

CREATE TABLE Equipamento (
    IdEquip INT AUTO_INCREMENT PRIMARY KEY,
    NomeEquip VARCHAR(30) NOT NULL UNIQUE,
    Durabilidade VARCHAR(12),
    Quantidade INT NOT NULL DEFAULT 1,
    HoraEntrada TIME NOT NULL,
    HoraSaida TIME NOT NULL
);

CREATE TABLE DiasDispo (
    IdDia INT AUTO_INCREMENT PRIMARY KEY,
    NomeDia VARCHAR(3) NOT NULL UNIQUE
);

CREATE TABLE Lab_DiasDispo (
    IdLab INT NOT NULL,
    IdDia INT NOT NULL,

    PRIMARY KEY (IdLab, IdDia),

    FOREIGN KEY (IdLab)
        REFERENCES Laboratorio(IdLab)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    FOREIGN KEY (IdDia)
        REFERENCES DiasDispo(IdDia)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE Equip_DiasDispo (
    IdEquip INT NOT NULL,
    IdDia INT NOT NULL,

    PRIMARY KEY (IdEquip, IdDia),

    FOREIGN KEY (IdEquip)
        REFERENCES Equipamento(IdEquip)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    FOREIGN KEY (IdDia)
        REFERENCES DiasDispo(IdDia)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE ReservaLaboratorio (
    IdReservaLab INT AUTO_INCREMENT PRIMARY KEY,

    IdUser INT NOT NULL,
    IdLab INT NOT NULL,

    DataReserva DATE NOT NULL,

    HoraEntrada TIME NOT NULL,
    HoraSaida TIME NOT NULL,

    QuantidadePessoas INT NOT NULL,

    DataCriacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (IdUser)
        REFERENCES Usuario(IdUser)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    FOREIGN KEY (IdLab)
        REFERENCES Laboratorio(IdLab)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE ReservaEquipamento (
    IdReservaEquip INT AUTO_INCREMENT PRIMARY KEY,

    IdUser INT NOT NULL,

    DataReserva DATE NOT NULL,

    HoraEntrada TIME NOT NULL,
    HoraSaida TIME NOT NULL,

    DataCriacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (IdUser)
        REFERENCES Usuario(IdUser)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE Reserva_Equipamento (
    IdReservaEquip INT NOT NULL,
    IdEquip INT NOT NULL,

    Quantidade INT NOT NULL DEFAULT 1,

    PRIMARY KEY (IdReservaEquip, IdEquip),

    FOREIGN KEY (IdReservaEquip)
        REFERENCES ReservaEquipamento(IdReservaEquip)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    FOREIGN KEY (IdEquip)
        REFERENCES Equipamento(IdEquip)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE Relatorio (
    IdRelatorio INT AUTO_INCREMENT PRIMARY KEY,

    IdUser INT NOT NULL,
    IdReservaLab INT,

    DataGeracao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    Descricao TEXT,

    FOREIGN KEY (IdUser)
        REFERENCES Usuario(IdUser)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    FOREIGN KEY (IdReservaLab)
        REFERENCES ReservaLaboratorio(IdReservaLab)
        ON DELETE SET NULL
        ON UPDATE CASCADE
);

INSERT INTO DiasDispo (NomeDia)
VALUES
('SEG'),
('TER'),
('QUA'),
('QUI'),
('SEX'),
('SAB'),
('DOM');