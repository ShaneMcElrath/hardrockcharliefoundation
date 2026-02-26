# Database Standards

This document defines the coding standards and conventions for all database work in the Hard Rock Charlie Foundation project. All contributors (human and AI) must follow these rules.

## Table Naming

- **Singular names** — always use the singular form of the noun
  - ✅ `user`, `event`, `donation`, `session`
  - ❌ `users`, `events`, `donations`, `sessions`
- **snake_case** — all lowercase, words separated by underscores
  - ✅ `event_signup`
  - ❌ `EventSignup`, `eventSignup`
- **Junction/join tables** use both singular table names joined by underscore
  - ✅ `event_signup` (user signs up for an event)

## Column Naming

- **snake_case** — all lowercase, words separated by underscores
  - ✅ `first_name`, `added_at`, `stripe_payment_id`
  - ❌ `firstName`, `CreatedAt`
- **VARCHAR lengths** — choose per column based on the specific data. No fixed standard sizes. Use `TEXT` for unbounded content.

## Primary Keys

- Every table must have an `id` column as its primary key
- Use `SERIAL` (auto-incrementing integer) for the `id` column

```sql
id SERIAL PRIMARY KEY
```

## Foreign Keys (Reference IDs)

- Foreign keys must follow the pattern: `{table_name}_id`
  - ✅ `user_id`, `event_id`, `donation_id`
  - ❌ `userId`, `eventID`, `fk_user`
- If a table has multiple references to the same table, use the pattern: `{description}_{table_name}_id`
  - ✅ `added_by_user_id`, `assigned_to_user_id`
  - ❌ `creator_id`, `assignee_id`
- Always define the `REFERENCES` constraint explicitly
- Specify `ON DELETE` behavior for every foreign key:
  - `CASCADE` — when the parent is deleted, delete the child rows too
  - `SET NULL` — when the parent is deleted, set the FK to NULL (preserve the child row)
  - Choose based on business logic. Document the reasoning if not obvious.

```sql
user_id INTEGER REFERENCES user(id) ON DELETE CASCADE,
added_by_user_id INTEGER REFERENCES user(id) ON DELETE SET NULL
```

## Required Columns

**Every table must have all of the following columns:**

| Column | Type | Default | Description |
|--------|------|---------|-------------|
| `id` | `SERIAL PRIMARY KEY` | auto | Primary key |
| `is_active` | `BOOLEAN` | `TRUE` | Soft delete flag. Set to `FALSE` instead of deleting rows. |
| `added_at` | `TIMESTAMPTZ` | `NOW()` | When the row was added |
| `added_by_user_id` | `INTEGER` | — | The user who added this row. References `user(id)`. Nullable for system-generated rows. |
| `modified_at` | `TIMESTAMPTZ` | `NOW()` | When the row was last modified |
| `modified_by_user_id` | `INTEGER` | — | The user who last modified this row. References `user(id)`. Nullable for system-generated rows. |

### Example: Minimum Table Structure

```sql
CREATE TABLE IF NOT EXISTS example (
    id SERIAL PRIMARY KEY,
    -- ... table-specific columns ...
    is_active BOOLEAN DEFAULT TRUE,
    added_at TIMESTAMPTZ DEFAULT NOW(),
    added_by_user_id INTEGER REFERENCES user(id) ON DELETE SET NULL,
    modified_at TIMESTAMPTZ DEFAULT NOW(),
    modified_by_user_id INTEGER REFERENCES user(id) ON DELETE SET NULL
);
```

## Soft Deletes

- **Never hard delete rows.** Set `is_active = FALSE` instead.
- All queries that return data to users must filter: `WHERE is_active = TRUE`
- Admin queries may include inactive rows when explicitly needed (e.g., audit logs, admin views)

## Database Functions

- All custom database functions must be prefixed with `func_`
  - ✅ `func_get_active_event`, `func_update_user_role`
  - ❌ `get_active_event`, `updateUserRole`

## Enum / Status Columns

- Use plain `VARCHAR` for status and enum-like columns
- Enforce allowed values in application code, not in the database
- Document the allowed values in a comment above the column

```sql
-- status: 'pending' | 'completed' | 'failed' | 'refunded'
status VARCHAR(50) DEFAULT 'pending'
```

## Indexes

- Add indexes on a case-by-case basis when performance requires it
- Common candidates for indexing:
  - Foreign key columns used in frequent JOINs
  - Columns used in WHERE clauses for common queries
  - Columns used for sorting (ORDER BY)
- Name indexes descriptively: `idx_{table}_{column}`
  - ✅ `idx_donation_user_id`, `idx_event_date`

## Unique Constraints

- Use `UNIQUE` constraints to enforce business rules at the database level
- Name constraints descriptively when possible
- For compound unique constraints, list columns in logical order

```sql
UNIQUE(user_id, event_id)  -- one signup per user per event
```

## General Rules

- Always use `CREATE TABLE IF NOT EXISTS` to make scripts idempotent
- Always use `CREATE INDEX IF NOT EXISTS` for the same reason
- Use parameterized queries (`$1, $2`) in application code — never concatenate SQL strings
- Store monetary values as integers in cents (`amount_cents INTEGER`), never as floats
- Store all timestamps as `TIMESTAMPTZ` (timezone-aware), never `TIMESTAMP`
- Use `NOW()` as the default for timestamp columns
