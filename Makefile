build:
		docker-compose up --build -d

migrate:
		docker-compose exec -it graphql npx prisma migrate deploy --force

down:
		docker-compose down

createdb:
	docker-compose exec -it postgres createdb --username=root testdb

killdb:
	docker-compose exec -it postgres dropdb testdb

.PHONY: build migrate down killdb