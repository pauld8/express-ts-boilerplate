develop:
	COMPOSE_HTTP_TIMEOUT=120 docker-compose -f docker-compose.dev.yml up -d
	npm run dev

down:
	COMPOSE_HTTP_TIMEOUT=120 docker-compose down -v --remove-orphans

production-build:
	make down
	COMPOSE_HTTP_TIMEOUT=120 docker-compose -f docker-compose.yml up -d --build

production:
	COMPOSE_HTTP_TIMEOUT=120 docker-compose -f docker-compose.yml up -d

restart:
	COMPOSE_HTTP_TIMEOUT=120 docker-compose down
	make production

restart-build:
	COMPOSE_HTTP_TIMEOUT=120 docker-compose down
	make production-build
