# Database Schema Documentation

This file documents the current schema of the Supabase database for the BAA (Business Analysis Academy) project.

## Last Updated
2025-05-31 23:24:53 UTC

## Tables

### `public.profiles`
Stores user profile information.

#### Columns
| Column Name | Data Type | Default | Nullable | Description |
|-------------|-----------|---------|----------|-------------|
| id | UUID | - | NO | Primary key, references `auth.users.id` |
| email | TEXT | - | NO | User's email address |
| full_name | TEXT | NULL | YES | User's full name |
| avatar_url | TEXT | NULL | YES | URL to user's avatar image |
| created_at | TIMESTAMP WITH TIME ZONE | NOW() | YES | When the profile was created |
| updated_at | TIMESTAMP WITH TIME ZONE | NOW() | YES | When the profile was last updated |
| user_type | TEXT | 'user' | NO | User role: 'user', 'contributor', or 'admin' |

#### Indexes
- Primary key on `id`
- Unique constraint on `email`

#### Row Level Security (RLS)
- Users can view their own profile
- Users can update their own profile
- Authenticated users can create their profile

## Enums

### `public.user_role_type`
*Note: This ENUM type is planned but not yet created in the database.*

Planned values:
- 'user' - Regular user with basic access
- 'contributor' - User with content contribution permissions
- 'admin' - Administrator with full access

## Migration History

### 20250531183553_create_profiles.sql
- Initial creation of the `profiles` table
- Set up basic RLS policies
- Created triggers for automatic timestamps

### 20250531190000_update_profiles_table.sql
- Updated the `handle_new_user` function
- Refined RLS policies
- Added proper grants for authenticated users

### 20250531210000_add_demote_user_function.sql
- Added `demote_to_user` function for admin to demote users

## Migration Plan

### Pending: Convert `user_type` to ENUM
```sql
-- 1. Create the ENUM type
CREATE TYPE public.user_role_type AS ENUM (
  'user',
  'contributor',
  'admin'
);

-- 2. Add a new column with the ENUM type
ALTER TABLE public.profiles
ADD COLUMN user_role public.user_role_type;

-- 3. Copy data from old column to new column
UPDATE public.profiles
SET user_role = user_type::public.user_role_type;

-- 4. Drop the old column
ALTER TABLE public.profiles DROP COLUMN user_type;

-- 5. Rename the new column to the original name
ALTER TABLE public.profiles RENAME COLUMN user_role TO user_type;

-- 6. Add NOT NULL constraint
ALTER TABLE public.profiles ALTER COLUMN user_type SET NOT NULL;

-- 7. Set default value
ALTER TABLE public.profiles ALTER COLUMN user_type SET DEFAULT 'user'::public.user_role_type;
```

## How to Update This Document
1. After making schema changes, update the relevant sections above
2. Update the "Last Updated" timestamp
3. Add a new entry in the Migration History section
4. If adding a new table, create a new section under "Tables" with its schema
5. Document any new enums, functions, or policies added
