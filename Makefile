build:
		docker-compose up --build -d

createdb:
		docker-compose exec -it postgres createdb --username=root testdb

down:
		docker-compose down

dropdb:
		docker-compose exec -it postgres dropdb testdb

migrate:
		docker-compose exec -it graphql npx prisma migrate deploy

seed:
		docker-compose exec -it graphql npx prisma db seed

.PHONY: build createdb down dropdb migrate seed