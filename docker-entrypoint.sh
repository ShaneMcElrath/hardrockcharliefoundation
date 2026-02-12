#!/bin/bash
set -e

PGDATA="/var/lib/postgresql/data"
PGUSER="postgres"
DBNAME="hardrockcharlie"
DBUSER="charlie"
DBPASS="charlie"

# ──────────────────────────────────────────────
# 1. Initialize Postgres data directory if needed
# ──────────────────────────────────────────────
if [ ! -s "$PGDATA/PG_VERSION" ]; then
    echo "==> Initializing PostgreSQL data directory..."
    chown -R postgres:postgres "$PGDATA"
    su - postgres -c "/usr/lib/postgresql/16/bin/initdb -D $PGDATA --encoding=UTF8 --locale=C"

    # Allow local connections with password and external connections (for dev tools)
    echo "host all all 127.0.0.1/32 md5" >> "$PGDATA/pg_hba.conf"
    echo "host all all 0.0.0.0/0 md5" >> "$PGDATA/pg_hba.conf"
    echo "local all all trust" >> "$PGDATA/pg_hba.conf"
fi

# ──────────────────────────────────────────────
# 2. Start Postgres temporarily to run setup
# ──────────────────────────────────────────────
echo "==> Starting PostgreSQL for setup..."
su - postgres -c "/usr/lib/postgresql/16/bin/pg_ctl -D $PGDATA -l /var/log/pg_setup.log start -w"

# ──────────────────────────────────────────────
# 3. Create database and user if they don't exist
# ──────────────────────────────────────────────
echo "==> Creating database and user..."
su - postgres -c "psql -tc \"SELECT 1 FROM pg_roles WHERE rolname='$DBUSER'\" | grep -q 1 || psql -c \"CREATE ROLE $DBUSER WITH LOGIN PASSWORD '$DBPASS';\""
su - postgres -c "psql -tc \"SELECT 1 FROM pg_database WHERE datname='$DBNAME'\" | grep -q 1 || psql -c \"CREATE DATABASE $DBNAME OWNER $DBUSER;\""

# ──────────────────────────────────────────────
# 4. Run schema initialization
# ──────────────────────────────────────────────
echo "==> Running schema initialization..."
su - postgres -c "psql -d $DBNAME -f /app/db/init.sql"

# ──────────────────────────────────────────────
# 4b. Grant all permissions to app user
# ──────────────────────────────────────────────
echo "==> Granting permissions to $DBUSER..."
su - postgres -c "psql -d $DBNAME -c \"GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO $DBUSER;\""
su - postgres -c "psql -d $DBNAME -c \"GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO $DBUSER;\""
su - postgres -c "psql -d $DBNAME -c \"ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO $DBUSER;\""
su - postgres -c "psql -d $DBNAME -c \"ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO $DBUSER;\""

# ──────────────────────────────────────────────
# 5. Stop temporary Postgres (supervisord will manage it)
# ──────────────────────────────────────────────
echo "==> Stopping temporary PostgreSQL..."
su - postgres -c "/usr/lib/postgresql/16/bin/pg_ctl -D $PGDATA stop -w"

# ──────────────────────────────────────────────
# 6. Hand off to supervisord
# ──────────────────────────────────────────────
echo "==> Starting supervisord..."
exec /usr/bin/supervisord -c /etc/supervisor/conf.d/supervisord.conf
