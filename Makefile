build:
		docker-compose up --build -d

migrate:
		docker-compse exec graphqlschool-graphql-1 npx prisma migrate reset --force

down:
		docker-compose down

killdb:
	docker-compose exec postgres psql -U root -d postgres -c "DROP DATABASE testdb;"

.PHONY: build migrate down killdb