CREATE TABLE posts (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id BIGINT REFERENCES users(id),
    title TEXT NOT NULL,
    content TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);
INSERT INTO posts (user_id, title, content)
VALUES
(1, 'First Post', 'This is Ali''s first post'),
(2, 'Second Post', 'This is Sara''s first post'),
(3, 'Third Post', 'This is Usman''s first post'),
(4, 'Fourth Post', 'This is Ayesha''s first post'),
(5, 'Fifth Post', 'This is Hamza''s first post');
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view only their own posts"
ON posts
FOR SELECT
USING (auth.uid()::text = user_id::text);
SELECT * FROM posts;