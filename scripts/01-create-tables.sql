-- Create the codes table for storing code snippets
CREATE TABLE IF NOT EXISTS codes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  language TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  uploader_name TEXT DEFAULT 'Anonymous'
);

-- Create the users table for storing user information
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Anyone can read codes" ON codes FOR SELECT USING (true);
CREATE POLICY "Anyone can insert codes" ON codes FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can update their own codes" ON codes FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own codes" ON codes FOR DELETE USING (auth.uid() = user_id);

-- Admin can delete any code (you'll need to set up admin role)
CREATE POLICY "Admin can delete any code" ON codes FOR DELETE USING (
  EXISTS (
    SELECT 1 FROM user_profiles 
    WHERE id = auth.uid() AND username = 'admin'
  )
);

-- User profiles policies
CREATE POLICY "Anyone can read user profiles" ON user_profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert their own profile" ON user_profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update their own profile" ON user_profiles FOR UPDATE USING (auth.uid() = id);

-- Insert some sample data
INSERT INTO codes (name, language, content, uploader_name) VALUES
('Hello World JavaScript', 'javascript', 'console.log("Hello, World!");', 'Xvoid'),
('Python Fibonacci', 'python', 'def fibonacci(n):\n    if n <= 1:\n        return n\n    return fibonacci(n-1) + fibonacci(n-2)\n\nprint(fibonacci(10))', 'Xvoid'),
('C++ Quick Sort', 'cpp', '#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid quickSort(vector<int>& arr, int low, int high) {\n    if (low < high) {\n        int pi = partition(arr, low, high);\n        quickSort(arr, low, pi - 1);\n        quickSort(arr, pi + 1, high);\n    }\n}', 'Anonymous');
