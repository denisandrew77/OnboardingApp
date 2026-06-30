# Meridian Onboarding App

This is a full-stack onboarding application built specifically for new employees hired at Meridian that presents and explain details their role, responsabilities, connecting the new employee with his colleagues and fully integrating them in the Company.

## Prerequisites

Install the following tools before running the application:

- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- [.NET 9 SDK](https://dotnet.microsoft.com/download/dotnet/9.0)
- [Node.js 22.12 or newer](https://nodejs.org/) and npm

## Run locally

### 1. Configure the environment

From the repository root, create your local environment file:

```bash
cp .env.example .env
```

Replace the password placeholders in `.env` with local development passwords.
The `.env` file contains local credentials and must not be committed.

### 2. Start PostgreSQL and pgAdmin

Make sure Docker Desktop is running, then execute:

```bash
docker compose up -d
```

Verify the containers:

```bash
docker compose ps
```

PostgreSQL is exposed on the `POSTGRES_PORT` configured in `.env` (5432 by
default). pgAdmin is available at [http://localhost:5050](http://localhost:5050),
or the port configured through `PGADMIN_PORT`. Sign in using the
`PGADMIN_DEFAULT_EMAIL` and `PGADMIN_DEFAULT_PASSWORD` values from `.env`.

The PostgreSQL server is registered automatically in pgAdmin. When prompted for
its password, use `POSTGRES_PASSWORD` from `.env`.

### 3. Start the backend

In a new terminal, from the repository root, restore the dependencies and local
EF Core tool:

```bash
dotnet restore OnboardingBackend/OnboardingBackend.csproj
dotnet tool restore
```

Store the local PostgreSQL connection string using the same database credentials
configured in `.env`:

```bash
dotnet user-secrets set \
  "ConnectionStrings:DefaultConnection" \
  "Host=localhost;Port=5432;Database=onboarding_db;Username=onboarding_user;Password=YOUR_POSTGRES_PASSWORD" \
  --project OnboardingBackend
```

Apply the existing database migrations and start the backend:

```bash
dotnet ef database update --project OnboardingBackend
dotnet run --project OnboardingBackend --launch-profile http
```

The backend runs at [http://localhost:5213](http://localhost:5213). Its OpenAPI
document is available at
[http://localhost:5213/openapi/v1.json](http://localhost:5213/openapi/v1.json).

### 4. Start the frontend

In another terminal, run:

```bash
cd OnboardingFrontend
npm install
npm run dev
```

Vite prints the frontend URL when it starts; by default it is
[http://localhost:5173](http://localhost:5173).

## Stop the application

Stop the frontend and backend with `Ctrl+C` in their respective terminals. Stop
the Docker services with:

```bash
docker compose down
```

The database data is retained in a Docker volume. To delete the local data as
well, run `docker compose down -v`.
