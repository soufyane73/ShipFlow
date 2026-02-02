# ShipFlow Backend (Laravel + JWT + PostgreSQL)

API backend for the ShipFlow shipment project. Built with Laravel 11, JWT authentication, and PostgreSQL.

## Requirements

- PHP 8.2+
- Composer
- PostgreSQL 14+
- Extensions: `pdo_pgsql`, `mbstring`, `openssl`, `tokenizer`, `xml`, `ctype`, `json`, `bcmath`

## Setup

### 1. Install dependencies

```bash
cd backend
composer install
```

### 2. Environment

```bash
cp .env.example .env
php artisan key:generate
php artisan jwt:secret
```

Edit `.env` and set your PostgreSQL credentials:

```env
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=shipflow
DB_USERNAME=postgres
DB_PASSWORD=your_password
```

For the frontend (Vite on port 3000):

```env
CORS_ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
```

### 3. Database

Create the PostgreSQL database, then run migrations:

```bash
php artisan migrate
```

Optional – seed an admin user and sample data:

```bash
php artisan db:seed
```

### 4. Run the API

```bash
php artisan serve
```

API base URL: `http://localhost:8000`  
Health: `http://localhost:8000/up`

## Authentication (JWT)

- **Register:** `POST /api/auth/register`
- **Login:** `POST /api/auth/login`
- **Me:** `GET /api/auth/me` (requires `Authorization: Bearer <token>`)
- **Refresh:** `POST /api/auth/refresh`
- **Logout:** `POST /api/auth/logout`

### Register body example

```json
{
  "nom": "Admin User",
  "email": "admin@shipflow.test",
  "password": "password123",
  "password_confirmation": "password123",
  "role": "admin",
  "telephone": "+33 6 00 00 00 00"
}
```

### Login body example

```json
{
  "email": "admin@shipflow.test",
  "password": "password123"
}
```

Response includes `token` and `user`. Send the token in subsequent requests:

```
Authorization: Bearer <your_jwt_token>
```

## API Resources (all under `/api`, JWT required except login/register)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | `/dashboard/stats` | Dashboard statistics |
| GET    | `/dashboard/recent` | Recent colis activity |
| GET/POST | `/colis` | List / create colis |
| GET/PUT/DELETE | `/colis/{id}` | Show / update / delete colis |
| GET/POST | `/produits` | List / create products |
| GET/PUT/DELETE | `/produits/{id}` | Show / update / delete product |
| GET/POST | `/villes` | List / create cities |
| GET/PUT/DELETE | `/villes/{id}` | Show / update / delete city |
| GET/POST | `/clients` | List / create clients |
| GET/PUT/DELETE | `/clients/{id}` | Show / update / delete client |
| GET/POST | `/categories` | List / create categories |
| GET/PUT/DELETE | `/categories/{id}` | Show / update / delete category |
| GET/POST | `/profiles` | List / create profiles (livreurs, etc.) |
| GET/PUT/DELETE | `/profiles/{id}` | Show / update / delete profile |
| GET/POST | `/factures` | List / create invoices |
| GET/PUT/DELETE | `/factures/{id}` | Show / update / delete invoice |
| GET/POST | `/bons-livraison` | List / create delivery notes |
| GET/PUT/DELETE | `/bons-livraison/{id}` | Show / update / delete delivery note |
| GET/POST | `/reclamations` | List / create claims |
| GET/PUT/DELETE | `/reclamations/{id}` | Show / update / delete claim |

List endpoints support query params: `?search=...`, `?per_page=15`, and resource-specific filters (e.g. `?statut=...`, `?ville_id=...`).

## Project structure (ERD)

- **Ville** → Secteurs, Clients, GrilleTarif
- **Secteur** → Ville, Clients
- **Client** → Ville, Secteur, Reclamations, Factures, Livreurs (Profile.entreprise_id)
- **Profile** (users) → Entreprise (Client), Courses; roles: admin, entreprise, livreur
- **Categorie** → Produits
- **Produit** → Categorie, Colis (pivot colis_produit), MouvementStock
- **Colis** → Expediteur/Destinataire/Entreprise (Client), Ville/Secteur, Produits, Reclamations, Paiements, BonLivraison, Facture, BonReception, Courses
- **GrilleTarif** → Ville depart/arrivee
- **Reclamation** → Colis, Client
- **Paiement** → Colis
- **BonLivraison** → Colis (1:1)
- **Facture** → Client, Colis (1:1)
- **BonReception** → Colis (1:1, PK = colis_id)
- **Course** → Profile (livreur), Colis (pivot course_colis)

## Connecting the frontend

Point your frontend (e.g. Vite on port 3000) to:

- Base URL: `http://localhost:8000/api`
- Store the JWT from login/register and send it as `Authorization: Bearer <token>` on each request.
