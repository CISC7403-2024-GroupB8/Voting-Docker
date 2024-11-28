CREATE TABLE IF NOT EXISTS votes (
    option_name VARCHAR(50) PRIMARY KEY,
    vote_number INT NOT NULL,
    last_vote TIMESTAMP NOT NULL
);

INSERT INTO votes (option_name, vote_number, last_vote) VALUES
('Cats', 0, '2024-10-10 00:00:00'),
('Dogs', 0, '2024-10-10 00:00:00');
