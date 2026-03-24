# Real Estate Listing API

## How to Run the Project

### 1. Install dependencies

npm install

### 2. Setup PostgreSQL Database

Create a PostgreSQL database and update your environment variables.

### 3. Start the backend server

npm run start:dev

## 🌱 Seed the Database

Run the following command to populate the database with sample data:

npm run seed

## Environment Variables

Create a `.env` file inside the `api` folder and configure:

DB_HOST=YOUR_DB_HOST
DB_PORT=5432
DB_USERNAME=YOUR_DB_USERNAME
DB_PASSWORD=YOUR_DB_PASSWORD
DB_NAME=YOUR_DB_NAME

## Example API Calls

### 1. Get Listings (with Filters & Pagination)

**Endpoint:**

GET /listings

**Example Request:**

curl -X GET "http://localhost:4000/listings?page=1&limit=12&price_min=100000&beds=2&baths=2&suburb=kathmandu&propertyType=apartment" \
-H "role: user"

**Example Response:**

```json
{
  "items": [
    {
      "id": 22,
      "title": "Property 1",
      "suburb": "Lalitpur",
      "price": 50000,
      "beds": 2,
      "baths": 2,
      "propertyType": "house",
      "description": "Nice property number 1",
      "agent": {
        "id": 6,
        "name": "Praksh Shrestha",
        "email": "prakash@gmail.com"
      }
    }
  ],
  "total": 12
}
```

### 2. Get Listing Details

**Endpoint:**

GET /listings/:id

**Example Request:**

curl -X GET "http://localhost:4000/listings/22" \
-H "role: admin"

## Role-Based Access

- Send header:

role: admin

- Admin users can see:
  - `internalNotes` field

- Regular users:
  - Cannot see `internalNotes`

## Notes

- Pagination is supported via `page` and `limit`
- Filters supported:
  - `price_min`, `price_max`
  - `beds`, `baths`
  - `suburb`
  - `propertyType`
  - `keyword`

- Case-insensitive search is implemented

---

## Testing

Run tests using:

```bash
npm run test
```

---

## Tech Stack

- Backend: NestJS + TypeORM
- Database: PostgreSQL
- Testing: Jest

---
