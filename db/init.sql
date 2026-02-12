-- Hard Rock Charlie Foundation — Database Schema
-- This file is run by docker-entrypoint.sh on first boot.
-- Follows conventions in docs/database-standards.md

-- User
CREATE TABLE IF NOT EXISTS "user" (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(255),
    -- role: 'user' | 'admin'
    role VARCHAR(50) DEFAULT 'user',
    is_active BOOLEAN DEFAULT TRUE,
    added_at TIMESTAMPTZ DEFAULT NOW(),
    added_by_user_id INTEGER REFERENCES "user"(id) ON DELETE SET NULL,
    modified_at TIMESTAMPTZ DEFAULT NOW(),
    modified_by_user_id INTEGER REFERENCES "user"(id) ON DELETE SET NULL
);

-- Session
CREATE TABLE IF NOT EXISTS session (
    id VARCHAR(255) PRIMARY KEY,
    user_id INTEGER REFERENCES "user"(id) ON DELETE CASCADE,
    expires_at TIMESTAMPTZ NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    added_at TIMESTAMPTZ DEFAULT NOW(),
    added_by_user_id INTEGER REFERENCES "user"(id) ON DELETE SET NULL,
    modified_at TIMESTAMPTZ DEFAULT NOW(),
    modified_by_user_id INTEGER REFERENCES "user"(id) ON DELETE SET NULL
);

-- Event
CREATE TABLE IF NOT EXISTS event (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    date TIMESTAMPTZ,
    location VARCHAR(255),
    image_url VARCHAR(500),
    is_active BOOLEAN DEFAULT TRUE,
    added_at TIMESTAMPTZ DEFAULT NOW(),
    added_by_user_id INTEGER REFERENCES "user"(id) ON DELETE SET NULL,
    modified_at TIMESTAMPTZ DEFAULT NOW(),
    modified_by_user_id INTEGER REFERENCES "user"(id) ON DELETE SET NULL
);

-- Event signup (one signup per user per event)
CREATE TABLE IF NOT EXISTS event_signup (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES "user"(id) ON DELETE CASCADE,
    event_id INTEGER REFERENCES event(id) ON DELETE CASCADE,
    is_active BOOLEAN DEFAULT TRUE,
    added_at TIMESTAMPTZ DEFAULT NOW(),
    added_by_user_id INTEGER REFERENCES "user"(id) ON DELETE SET NULL,
    modified_at TIMESTAMPTZ DEFAULT NOW(),
    modified_by_user_id INTEGER REFERENCES "user"(id) ON DELETE SET NULL,
    UNIQUE(user_id, event_id)
);

-- Donation
CREATE TABLE IF NOT EXISTS donation (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES "user"(id) ON DELETE SET NULL,
    amount_cents INTEGER NOT NULL,
    stripe_payment_id VARCHAR(255),
    donor_email VARCHAR(255),
    donor_name VARCHAR(255),
    -- status: 'pending' | 'completed' | 'failed' | 'refunded'
    status VARCHAR(50) DEFAULT 'pending',
    is_active BOOLEAN DEFAULT TRUE,
    added_at TIMESTAMPTZ DEFAULT NOW(),
    added_by_user_id INTEGER REFERENCES "user"(id) ON DELETE SET NULL,
    modified_at TIMESTAMPTZ DEFAULT NOW(),
    modified_by_user_id INTEGER REFERENCES "user"(id) ON DELETE SET NULL
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_session_user_id ON session(user_id);
CREATE INDEX IF NOT EXISTS idx_session_expires_at ON session(expires_at);
CREATE INDEX IF NOT EXISTS idx_event_signup_user_id ON event_signup(user_id);
CREATE INDEX IF NOT EXISTS idx_event_signup_event_id ON event_signup(event_id);
CREATE INDEX IF NOT EXISTS idx_donation_user_id ON donation(user_id);
CREATE INDEX IF NOT EXISTS idx_donation_status ON donation(status);
CREATE INDEX IF NOT EXISTS idx_event_date ON event(date);
