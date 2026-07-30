-- Create users table
CREATE TABLE users (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    age INT,
    city VARCHAR(100),
    created_at TIMESTAMP DEFAULT NOW()
);


INSERT INTO users (name, email, age, city)
VALUES
('Ali Khan', 'ali@example.com', 22, 'Lahore'),
('Sara Ahmed', 'sara@example.com', 21, 'Karachi'),
('Usman Malik', 'usman@example.com', 24, 'Islamabad'),
('Ayesha Noor', 'ayesha@example.com', 23, 'Faisalabad'),
('Hamza Sheikh', 'hamza@example.com', 25, 'Multan');