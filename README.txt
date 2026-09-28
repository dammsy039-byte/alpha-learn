ALPHA LEARN v16 — WEBSITE-READY PROJECT

WHAT THIS VERSION DOES
- Responsive public website
- Home, Subjects, Quiz, Premium and Student Dashboard
- Free/Premium feature gating
- Local demo Premium mode
- Express backend
- Registration/login API foundation
- Online progress API
- Subscription API structure
- Payment and webhook placeholders
- Single-server deployment structure

FOLDER STRUCTURE
public/
  index.html
  style.css
  app.js
backend/
  server.js
database/
  db.json
package.json

RUN LOCALLY
1. Install Node.js on a computer/server.
2. Open the project folder in a terminal.
3. Run: npm install
4. Run: npm start
5. Visit: http://localhost:3000

DEPLOYMENT
This project is structured so the Node/Express server can host the website and API together.
Choose a Node.js hosting service, upload the project, install dependencies and start with:
npm start
Set the PORT environment variable if the host requires it.

IMPORTANT PRODUCTION WORK
Before accepting real accounts or payments:
- Use a real database instead of JSON.
- Use secure password hashing such as Argon2id or scrypt with per-user salts.
- Add sessions/JWT with secure expiration and refresh strategy.
- Add rate limiting, validation, CSRF protection where applicable and HTTPS.
- Protect admin endpoints with server-side authorization.
- Store secrets only in environment variables.
- Connect a payment provider on the server.
- Verify payment webhooks cryptographically before changing a student's plan.
- Add backups, logging and monitoring.

PAYMENTS
v16 deliberately contains NO real payment processing and charges NO money.
The payment routes are placeholders so the real provider can be added safely later.
