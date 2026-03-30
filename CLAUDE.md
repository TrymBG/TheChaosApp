# The Chaos App — Claude Context

## What this project is
A web application that visualizes funny/weird algorithms step by step. Built as a learning project to develop full-stack skills and build a GitHub portfolio. The user is returning to coding after a long break — explain things clearly, walk through changes before making them, and encourage the user to write code themselves where possible.

## Collaboration style
- Act as a senior dev mentoring a junior
- Explain the *why* before writing code
- Encourage the user to attempt changes themselves, then review and fix
- Keep explanations clear but not condescending
- The goal is both learning and having something portfolio-worthy on GitHub

## Tech stack
- **Backend:** Java 17, Spring Boot 3.4.4, Maven
- **Frontend:** React 18, Vite, React Router v6
- **Tests:** JUnit 5 (via spring-boot-starter-test)
- **No database yet** — planned next step

## How to run

**Backend** (port 8080):
```bash
mvn spring-boot:run
```
Spring Boot DevTools is enabled — restarts automatically on Java file changes.

**Frontend** (port 5173):
```bash
cd frontend
npm run dev
```
Vite proxies `/api/*` requests to `http://localhost:8080` — no CORS issues in dev.

**Tests:**
```bash
mvn clean test
```

## Project structure
```
TheChaosApp/
├── src/main/java/com/chaos/visualizer/
│   ├── ChaosVisualizerApplication.java   — entry point
│   ├── controller/
│   │   └── AlgorithmController.java      — REST endpoints
│   ├── service/
│   │   └── AlgorithmService.java         — algorithm logic
│   └── model/
│       └── AlgorithmResponse.java        — DTO returned by all endpoints
├── src/test/java/com/chaos/visualizer/
│   ├── ChaosVisualizerApplicationTests.java  — context load check
│   └── service/
│       └── AlgorithmServiceTest.java         — unit tests for AlgorithmService
└── frontend/
    ├── src/
    │   ├── App.jsx                — router setup
    │   ├── components/
    │   │   └── Nav.jsx            — top navigation bar
    │   └── pages/
    │       ├── Home.jsx           — landing page
    │       └── Algorithms.jsx     — algorithm selector + runner
    └── public/
        └── images/
            └── SouthParkBank.png  — used in the bank algorithm
```

## API endpoints

| Method | Path | Params | Description |
|--------|------|--------|-------------|
| GET | `/api/algorithms/cookie-monster` | `input` (comma-separated strings) | Cookie Monster Sort |
| GET | `/api/algorithms/bank-sort` | `amount` (double) | South Park Bank |

All endpoints return an `AlgorithmResponse`:
```json
{
  "algorithm": "Cookie Monster Sort",
  "input": "chocolate, cookie, pizza",
  "steps": ["step 1", "step 2", "..."],
  "result": "Collected 2 cookie(s): [cookie, Cookies]",
  "executedAt": "2026-03-30T00:12:13"
}
```

## Algorithms

### Cookie Monster Sort
Scans a string array for elements containing "cookie" or "Cookie" and collects them. Everything else is ignored. Returns narrated steps.

### South Park Bank
Based on the South Park Margaritaville episode. Deposits an amount, runs it through absurd financial steps, ends at $0. Steps are revealed one per second on the frontend. The "Poof" step is replaced by an image.

## What's been done
- Clean Spring Boot + React setup
- Two algorithms with narrated steps
- Structured API response (DTO pattern)
- Algorithm selector UI (click to select, runner appears below)
- 2 unit tests for AlgorithmService

## Planned next steps (in order)
1. **Database** — H2 locally, save each algorithm run (JPA, entities, repositories)
2. **Error handling** — proper handling of bad input, global exception handler
3. **Auth** — Spring Security + login
4. **More algorithms** — Bogo Sort, Stalin Sort, Sleep Sort, etc.
