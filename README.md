MyShop

MyShop is a coursework Angular project demonstrating modern frontend development using:

Angular 20 (Standalone Components)

NgRx (Store, Effects, Actions, Reducers)

MSW (Mock Service Worker) for API simulation

Reactive Forms

Storybook

TailwindCSS + Angular Material

It includes a Login page, Products list with filters, and a Product Rating feature using a fully mocked backend.

Features Implemented
✔ Authentication

Login form using Reactive Forms

NgRx state for auth (login, logout, success, failure)

Mock API returning { access, refresh }

✔ Products Page

List of products with filters:

page

pageSize

minRating

ordering

NgRx store for products

NgRx effects for loading products

Product average rating calculated on backend (MSW)

✔ Product Rating Page

Input product ID

Fetch rating from mock API

Display:

Product ID

Average rating

Total reviews

NgRx effects & reducers

✔ Storybook

LoginForm component story

Product components preview

UI component testing in isolation

Development server

To start a local development server, run:

ng serve


Once the server is running, open:

http://localhost:4200/


The app will automatically reload when source files change.

Mock API (MSW)

This project uses Mock Service Worker to simulate backend responses for:

/api/auth/token/

/api/auth/token/refresh/

/api/products/

/api/products/:id/rating/

The mock API starts automatically on ng serve.

Storybook

To start Storybook:

ng run my-shop:storybook


This opens a UI to preview individual components in isolation.

Code scaffolding

To generate a new component:

ng generate component component-name


For all available schematics:

ng generate --help

Building

To build the project for production:

ng build


This compiles the app and places artifacts in the dist/ folder.


(Angular CLI does not include an e2e framework by default. You may choose Cypress, Playwright, etc.)

Project Structure
src/app/
 ├─ state/            → NgRx store (auth, products, rating)
 ├─ features/         → Pages (login, products, rating)
 ├─ ui/               → UI components (login form)
 ├─ app.routes.ts     → Application routes
 ├─ app.ts / app.html → Root component
src/mocks/
 ├─ handlers.ts       → Mock API endpoints
 ├─ browser.ts        → MSW setup