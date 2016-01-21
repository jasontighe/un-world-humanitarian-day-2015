#!/bin/bash
# Start the cron service
cron -f &
cd /app
node build/server.js
