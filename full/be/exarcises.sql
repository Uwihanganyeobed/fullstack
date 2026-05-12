create DATABASE level-5-sod use level-5-sod;
CREATE TABLE students(
    id INT AUTO-INCREMENT PRIMARY KEY;
    name VARCHAR(100);
    email VARCHAR(100)UNIQUE
);