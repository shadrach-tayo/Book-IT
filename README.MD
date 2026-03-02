# Book-IT

A hotel booking API and web application built with Node.js and Express. Users can browse hotels and rooms, make reservations, and manage accounts. Admins can manage hotels, rooms, and reservations.

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express 4.x
- **Database:** MongoDB (Mongoose)
- **Auth:** JWT (jsonwebtoken), role-based access (accesscontrol)
- **Views:** Jade (Pug)
- **Testing:** Jest, Supertest
- **Dev:** Nodemon, cross-env, Husky (pre-commit/pre-push hooks)

## Prerequisites

- Node.js (v12+)
- MongoDB (local or remote instance)
- npm or yarn

## Setup

### 1. Clone and install

```bash
git clone <repository-url>
cd Book-IT
npm install
```

### 2. Environment

Create a `.env` file in the project root (optional; config can use defaults per environment):

```env
PORT=3000
NODE_ENV=development
```

Database and JWT settings are defined in `src/config/` per environment (see [Configuration](#configuration)).

### 3. Start MongoDB

Ensure MongoDB is running (e.g. `mongod` or a cloud URI in config).

### 4. Run the app

**Development (with auto-reload):**

```bash
npm run dev
```

**Production:**

```bash
npm start
```

The server runs at `http://localhost:3000` (or the value of `PORT`).

## Scripts

| Script               | Description                        |
| -------------------- | ---------------------------------- |
| `npm start`          | Start production server            |
| `npm run dev`        | Start development server (nodemon) |
| `npm test`           | Run Jest test suite                |
| `npm run test:watch` | Run Jest in watch mode             |

Husky runs tests on pre-commit and pre-push.

## Project Architecture

Layered structure: **Routes → Controllers → Services → Domain / Data Access → Models**.

```
Book-IT/
├── bin/
│   └── www                 # HTTP server entry (port, listen)
├── public/
│   └── stylesheets/        # Static CSS
├── src/
│   ├── app.js              # Express app, dotenv, loaders
│   ├── loaders/
│   │   ├── index.js        # Orchestrates mongoose + express loaders
│   │   ├── mongoose.js     # MongoDB connection
│   │   └── express.js      # Middleware, routes, views, error handling
│   ├── config/
│   │   ├── index.js        # Picks config by NODE_ENV
│   │   ├── dev.js          # Development (DB, JWT)
│   │   ├── prod.js         # Production
│   │   └── tests.js        # Test environment
│   ├── routes/             # HTTP route definitions
│   │   ├── index.js        # Wires all route modules + callback
│   │   ├── callback.js     # Standardized controller callback wrapper
│   │   ├── auth.js
│   │   ├── users.js
│   │   ├── admin.js
│   │   ├── hotel.js
│   │   ├── room.js
│   │   └── reservation.js
│   ├── controllers/        # Request/response handling
│   │   ├── index.js
│   │   ├── authController.js
│   │   ├── usersController.js
│   │   ├── adminController.js
│   │   ├── hotelController.js
│   │   ├── roomController.js
│   │   └── reservationController.js
│   ├── services/           # Business logic
│   │   ├── index.js
│   │   ├── auth.js
│   │   ├── user.js
│   │   ├── admin.js
│   │   ├── hotel.js
│   │   ├── room.js
│   │   └── reservation.js
│   ├── domain/             # Domain entities / validation
│   │   ├── User.js
│   │   ├── Admin.js
│   │   ├── Hotel.js
│   │   ├── Room.js
│   │   └── Reservation.js
│   ├── data-access/        # Database operations
│   │   ├── index.js
│   │   ├── userDb.js
│   │   └── adminDb.js
│   ├── models/             # Mongoose schemas
│   │   ├── User.js
│   │   ├── Admin.js
│   │   ├── Hotel.js
│   │   ├── Room.js
│   │   └── Reservation.js
│   ├── authorization/      # Auth middlewares
│   │   └── middlewares/
│   │       ├── index.js
│   │       └── verify.user.middleware.js
│   ├── common/
│   │   ├── roles.js        # Role definitions (accesscontrol)
│   │   └── middlewares/   # Validation & permissions
│   ├── utils/
│   │   └── index.js
│   └── views/              # Jade templates
│       ├── layout.jade
│       ├── index.jade
│       └── error.jade
├── test/
│   ├── mocks/              # Test fixtures (user, hotel, room)
│   ├── domain/             # Domain unit tests
│   └── services/           # Service unit tests
├── .env                    # Local env (not committed)
├── .gitignore
├── package.json
└── README.MD
```

### Flow

1. **bin/www** – Creates HTTP server, uses **src/app.js**.
2. **app.js** – Loads env, then **loaders** (DB + Express).
3. **loaders** – Connect MongoDB; register middleware, **routes**, and error handlers.
4. **routes** – Map URLs to controllers via **callback** and use **authorization** and **common** middlewares (auth, validation, permissions).
5. **controllers** – Parse input, call **services**, send responses.
6. **services** – Use **domain** and **data-access** (and **models**) to implement use cases.
7. **models** – Mongoose schemas for User, Admin, Hotel, Room, Reservation.

## Configuration

- **Development:** `src/config/dev.js` (e.g. `MONGODB_URI`, `jwtSecret`).
- **Production:** `src/config/prod.js`.
- **Test:** `src/config/tests.js` (used when `NODE_ENV=test`).

Override by changing the corresponding config file or extending the loader to use env vars (e.g. `process.env.MONGODB_URI`).

## Testing

```bash
npm test
```

Uses Jest; test DB is set via `NODE_ENV=test` and `src/config/tests.js`. Tests live under `test/domain/` and `test/services/` with mocks in `test/mocks/`.
