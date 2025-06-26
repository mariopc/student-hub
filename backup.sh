# !/usr/bin/env bash

BACKUP_DIR="./backups"
if [ ! -d "$BACKUP_DIR" ]; then
    mkdir -p "$BACKUP_DIR"
    echo "Backup directory $BACKUP_DIR created."
fi

# Config variables
HOST="127.0.0.1"
PORT="5432"
DB_NAME="amancay"
USER="amancay"
TABLES=(
    "academics.students"
    "academics.representatives"
    "academics.events"
    "academics.events_students"
)
TIMESTAMP=$(date +'%Y%m%d_%H%M%S')
for table in "${TABLES[@]}"; do
    BACKUP_FILE="backup_${table}_${TIMESTAMP}.sql"
    PGPASSFILE=".pgpass" pg_dump -a -h "${HOST}" -p "${PORT}" -U "${USER}" -d "${DB_NAME}" -t "${table}" -f "${BACKUP_DIR}/${BACKUP_FILE}"
    echo "Backup saved to $BACKUP_FILE"
done

# Tar and compress the ./backend/assets/ directory
ASSETS_DIR="./backend/assets/"
ASSETS_BACKUP="assets_backup_${TIMESTAMP}.tar.xz"

if [ -d "$ASSETS_DIR" ]; then
    tar -cJf "${BACKUP_DIR}/${ASSETS_BACKUP}" -C "$(dirname "${ASSETS_DIR}")" "$(basename "$ASSETS_DIR")"
    echo "Assets directory compressed to $ASSETS_BACKUP"
else
    echo "Assets directory $ASSETS_DIR does not exist. Skipping compression."
fi