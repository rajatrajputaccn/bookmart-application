INSERT INTO books (title, author, category, price, stock_quantity, description, created_at, updated_at)
SELECT 'Clean Code', 'Robert C. Martin', 'Programming', 599.00, 15, 'A practical guide to writing clean, readable and maintainable code.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
    WHERE NOT EXISTS (SELECT 1 FROM books WHERE title = 'Clean Code' AND author = 'Robert C. Martin');

INSERT INTO books (title, author, category, price, stock_quantity, description, created_at, updated_at)
SELECT 'The Pragmatic Programmer', 'Andrew Hunt', 'Programming', 699.00, 12, 'A guide to practical software development techniques and professional programming habits.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
    WHERE NOT EXISTS (SELECT 1 FROM books WHERE title = 'The Pragmatic Programmer' AND author = 'Andrew Hunt');

INSERT INTO books (title, author, category, price, stock_quantity, description, created_at, updated_at)
SELECT 'Effective Java', 'Joshua Bloch', 'Programming', 750.00, 10, 'Best practices and techniques for writing robust Java applications.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
    WHERE NOT EXISTS (SELECT 1 FROM books WHERE title = 'Effective Java' AND author = 'Joshua Bloch');

INSERT INTO books (title, author, category, price, stock_quantity, description, created_at, updated_at)
SELECT 'Head First Java', 'Kathy Sierra', 'Programming', 549.00, 20, 'An approachable introduction to Java programming concepts.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
    WHERE NOT EXISTS (SELECT 1 FROM books WHERE title = 'Head First Java' AND author = 'Kathy Sierra');

INSERT INTO books (title, author, category, price, stock_quantity, description, created_at, updated_at)
SELECT 'The Alchemist', 'Paulo Coelho', 'Fiction', 299.00, 25, 'A young shepherd travels in search of treasure and discovers the meaning of following his dreams.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
    WHERE NOT EXISTS (SELECT 1 FROM books WHERE title = 'The Alchemist' AND author = 'Paulo Coelho');

INSERT INTO books (title, author, category, price, stock_quantity, description, created_at, updated_at)
SELECT '1984', 'George Orwell', 'Fiction', 349.00, 18, 'A dystopian novel exploring surveillance, control and individual freedom.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
    WHERE NOT EXISTS (SELECT 1 FROM books WHERE title = '1984' AND author = 'George Orwell');

INSERT INTO books (title, author, category, price, stock_quantity, description, created_at, updated_at)
SELECT 'The Great Gatsby', 'F. Scott Fitzgerald', 'Fiction', 275.00, 14, 'A classic novel about wealth, ambition and the American Dream.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
    WHERE NOT EXISTS (SELECT 1 FROM books WHERE title = 'The Great Gatsby' AND author = 'F. Scott Fitzgerald');

INSERT INTO books (title, author, category, price, stock_quantity, description, created_at, updated_at)
SELECT 'To Kill a Mockingbird', 'Harper Lee', 'Fiction', 399.00, 16, 'A story examining justice, morality and prejudice in a small American town.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
    WHERE NOT EXISTS (SELECT 1 FROM books WHERE title = 'To Kill a Mockingbird' AND author = 'Harper Lee');

INSERT INTO books (title, author, category, price, stock_quantity, description, created_at, updated_at)
SELECT 'A Brief History of Time', 'Stephen Hawking', 'Science', 450.00, 11, 'An introduction to cosmology, black holes and the nature of time.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
    WHERE NOT EXISTS (SELECT 1 FROM books WHERE title = 'A Brief History of Time' AND author = 'Stephen Hawking');

INSERT INTO books (title, author, category, price, stock_quantity, description, created_at, updated_at)
SELECT 'The Selfish Gene', 'Richard Dawkins', 'Science', 520.00, 9, 'An exploration of evolution and natural selection from the perspective of genes.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
    WHERE NOT EXISTS (SELECT 1 FROM books WHERE title = 'The Selfish Gene' AND author = 'Richard Dawkins');

INSERT INTO books (title, author, category, price, stock_quantity, description, created_at, updated_at)
SELECT 'Cosmos', 'Carl Sagan', 'Science', 480.00, 13, 'A journey through the universe, astronomy and humanitys place in the cosmos.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
    WHERE NOT EXISTS (SELECT 1 FROM books WHERE title = 'Cosmos' AND author = 'Carl Sagan');

INSERT INTO books (title, author, category, price, stock_quantity, description, created_at, updated_at)
SELECT 'The Gene', 'Siddhartha Mukherjee', 'Science', 650.00, 8, 'A history of genetics and humanitys understanding of heredity.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
    WHERE NOT EXISTS (SELECT 1 FROM books WHERE title = 'The Gene' AND author = 'Siddhartha Mukherjee');

INSERT INTO books (title, author, category, price, stock_quantity, description, created_at, updated_at)
SELECT 'The Lean Startup', 'Eric Ries', 'Business', 499.00, 17, 'A framework for building businesses through experimentation and continuous learning.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
    WHERE NOT EXISTS (SELECT 1 FROM books WHERE title = 'The Lean Startup' AND author = 'Eric Ries');

INSERT INTO books (title, author, category, price, stock_quantity, description, created_at, updated_at)
SELECT 'Zero to One', 'Peter Thiel', 'Business', 399.00, 19, 'A perspective on innovation, startups and creating new opportunities.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
    WHERE NOT EXISTS (SELECT 1 FROM books WHERE title = 'Zero to One' AND author = 'Peter Thiel');

INSERT INTO books (title, author, category, price, stock_quantity, description, created_at, updated_at)
SELECT 'Good to Great', 'Jim Collins', 'Business', 550.00, 10, 'An examination of how companies achieve and sustain exceptional performance.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
    WHERE NOT EXISTS (SELECT 1 FROM books WHERE title = 'Good to Great' AND author = 'Jim Collins');

INSERT INTO books (title, author, category, price, stock_quantity, description, created_at, updated_at)
SELECT 'The Psychology of Money', 'Morgan Housel', 'Business', 350.00, 22, 'Lessons about wealth, financial behaviour and making better money decisions.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
    WHERE NOT EXISTS (SELECT 1 FROM books WHERE title = 'The Psychology of Money' AND author = 'Morgan Housel');

INSERT INTO books (title, author, category, price, stock_quantity, description, created_at, updated_at)
SELECT 'Atomic Habits', 'James Clear', 'Self-Help', 450.00, 30, 'A practical approach to building good habits and breaking bad ones.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
    WHERE NOT EXISTS (SELECT 1 FROM books WHERE title = 'Atomic Habits' AND author = 'James Clear');

INSERT INTO books (title, author, category, price, stock_quantity, description, created_at, updated_at)
SELECT 'Deep Work', 'Cal Newport', 'Self-Help', 399.00, 15, 'Strategies for improving focus and producing valuable work without distractions.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
    WHERE NOT EXISTS (SELECT 1 FROM books WHERE title = 'Deep Work' AND author = 'Cal Newport');

INSERT INTO books (title, author, category, price, stock_quantity, description, created_at, updated_at)
SELECT 'The 7 Habits of Highly Effective People', 'Stephen R. Covey', 'Self-Help', 499.00, 12, 'A framework for personal and professional effectiveness.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
    WHERE NOT EXISTS (SELECT 1 FROM books WHERE title = 'The 7 Habits of Highly Effective People' AND author = 'Stephen R. Covey');

INSERT INTO books (title, author, category, price, stock_quantity, description, created_at, updated_at)
SELECT 'Think and Grow Rich', 'Napoleon Hill', 'Self-Help', 299.00, 20, 'A classic book about mindset, goals and personal achievement.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
    WHERE NOT EXISTS (SELECT 1 FROM books WHERE title = 'Think and Grow Rich' AND author = 'Napoleon Hill');