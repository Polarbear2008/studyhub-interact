-- First, let's see all users and their roles
SELECT au.id as user_id, au.email, ur.role
FROM auth.users au
LEFT JOIN user_roles ur ON au.id = ur.user_id;