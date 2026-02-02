# Testing ShipFlow API with Postman

Base URL: **`http://localhost:8000/api`** (with `php artisan serve` running)

---

## 1. Get a JWT token

### Option A: Register

- **Method:** POST  
- **URL:** `http://localhost:8000/api/auth/register`  
- **Headers:** `Content-Type: application/json`  
- **Body (raw, JSON):**

```json
{
  "nom": "Test User",
  "email": "test@shipflow.test",
  "password": "password123",
  "password_confirmation": "password123",
  "role": "admin",
  "telephone": "+33 6 00 00 00 00"
}
```

### Option B: Login (if you already ran `php artisan db:seed`)

- **Method:** POST  
- **URL:** `http://localhost:8000/api/auth/login`  
- **Headers:** `Content-Type: application/json`  
- **Body (raw, JSON):**

```json
{
  "email": "admin@shipflow.test",
  "password": "password"
}
```

**Copy the `token` from the response.** You will use it for all protected routes below.

---

## 2. Use the token in Postman

1. Open any **protected** request (e.g. GET `/api/colis`).
2. Go to the **Authorization** tab.
3. **Type:** Bearer Token.
4. **Token:** paste the token you copied (no `Bearer ` prefix; Postman adds it).

Alternatively, in the **Headers** tab add:

- **Key:** `Authorization`  
- **Value:** `Bearer YOUR_TOKEN_HERE`

---

## 3. Quick test order

| Step | Method | URL | Auth | Body |
|------|--------|-----|------|------|
| 1 | POST | `/api/auth/login` | No | `{"email":"admin@shipflow.test","password":"password"}` |
| 2 | GET | `/api/auth/me` | Bearer token | - |
| 3 | GET | `/api/dashboard/stats` | Bearer token | - |
| 4 | GET | `/api/colis` | Bearer token | - |
| 5 | GET | `/api/produits` | Bearer token | - |
| 6 | GET | `/api/villes` | Bearer token | - |

---

## 4. Example protected requests (all need Bearer token)

**Dashboard**

- `GET /api/dashboard/stats` – stats (total colis, en transit, etc.)
- `GET /api/dashboard/recent` – recent colis activity

**Colis**

- `GET /api/colis` – list (optional: `?search=...&statut=...&per_page=15`)
- `POST /api/colis` – create (see README for body)
- `GET /api/colis/{id}` – show one
- `PUT /api/colis/{id}` – update
- `DELETE /api/colis/{id}` – delete

**Produits**

- `GET /api/produits` – list
- `POST /api/produits` – create  
  Body: `{"nom":"Produit 1","reference":"REF-001","categorie_id":"uuid","poids_moyen":1.5}`

**Villes**

- `GET /api/villes` – list
- `POST /api/villes` – create  
  Body: `{"nom":"Paris","pays":"France"}`

**Clients**

- `GET /api/clients` – list
- `POST /api/clients` – create  
  Body: `{"nom":"Acme Corp","telephone":"+33 1 00 00 00 00","type_client":"entreprise"}`

**Auth (with token)**

- `GET /api/auth/me` – current user
- `POST /api/auth/refresh` – new token
- `POST /api/auth/logout` – logout

---

## 5. Import as Postman collection (optional)

1. In Postman: **Import** → **Raw text**.
2. Paste this minimal collection (replace `YOUR_TOKEN` after login):

```json
{
  "info": { "name": "ShipFlow API", "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json" },
  "variable": [{ "key": "base", "value": "http://localhost:8000/api" }, { "key": "token", "value": "YOUR_TOKEN" }],
  "item": [
    { "name": "Login", "request": { "method": "POST", "url": "{{base}}/auth/login", "body": { "mode": "raw", "raw": "{\"email\":\"admin@shipflow.test\",\"password\":\"password\"}" } } },
    { "name": "Me", "request": { "method": "GET", "url": "{{base}}/auth/me", "header": [{ "key": "Authorization", "value": "Bearer {{token}}" }] } },
    { "name": "Dashboard Stats", "request": { "method": "GET", "url": "{{base}}/dashboard/stats", "header": [{ "key": "Authorization", "value": "Bearer {{token}}" }] } },
    { "name": "List Colis", "request": { "method": "GET", "url": "{{base}}/colis", "header": [{ "key": "Authorization", "value": "Bearer {{token}}" }] } }
  ]
}
```

3. After **Login**, copy the `token` from the response and set the collection variable `token` to that value so **Me**, **Dashboard Stats**, and **List Colis** work.

---

## 6. Troubleshooting

- **401 Unauthorized:** Token missing, wrong, or expired. Login again and set the new token.
- **404:** Check URL (must include `/api`) and that `php artisan serve` is running.
- **422 Validation error:** Check the JSON body and required fields in the README.
- **500:** Check `storage/logs/laravel.log` and that DB migrations have run (`php artisan migrate`).
