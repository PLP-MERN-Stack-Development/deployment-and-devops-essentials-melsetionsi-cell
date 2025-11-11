#!/bin/bash

# Pull latest images
docker-compose pull

# Start services
docker-compose up -d

# Run database migrations if any
# docker-compose exec backend npm run migrate

# Health check
sleep 30
curl -f http://localhost/health || exit 1

echo "Deployment completed successfully!"