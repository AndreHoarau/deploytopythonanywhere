# 8640 — Web Services and Applications

**Lecturer:** Andrew Beatty  
**Student:** Andre  
**Project:** Web-Based Fish Tracker (Full-Stack CRUD Application)

---

## Project Overview
This project is a full-stack web application developed as part of the HDIP in Computing Data Analytics. The application serves as a digital logbook for anglers to track and manage catch data. It demonstrates the integration of a **Python Flask** backend, an **SQLite** database, and a **jQuery/AJAX** frontend to create a seamless Single Page Application (SPA).

---

## Project Structure
```text
C:.
├── static_pages/
│   ├── fish.js            # jQuery/AJAX logic and local state management
│   ├── index.html         # Main User Interface (SPA)
│   └── styles.css         # Application styling
├── .gitignore             # Files to exclude from version control
├── bigprojectdb           # SQLite database file
├── createschema.py        # Script to initialize/reset the database table
├── dbconfig.py            # Database configuration settings
├── fishDAO.py             # Data Access Object (Database logic abstraction)
├── README.md              # Project documentation
├── schema.sql             # SQL script for table definitions
└── server.py              # Flask server and RESTful API routing
```
## Features & Functionality

### 1. Data Access Layer (`fishDAO.py`)
Utilizes the **DAO Pattern** to encapsulate all SQL interactions. This ensures the database logic is decoupled from the web server logic.
*   **Create:** Handles insertion of catch details into the `andre_fish_log` table.
*   **Read:** Fetches the entire catch history or retrieves a specific entry by its ID.
*   **Update:** Modifies existing catch records with new user-provided data.
*   **Delete:** Permanently removes records from the database.

### 2. REST API (`server.py`)
The backend is built with **Flask**, providing the following RESTful endpoints for the frontend to consume:
*   **GET /fish** — Retrieves all logged catches.
*   **POST /fish** — Submits a new catch to the database.
*   **PUT /fish/`<id>`** — Updates an existing catch record.
*   **DELETE /fish/`<id>`** — Deletes a specific record.

### 3. Frontend Interface (`index.html` & `fish.js`)
The frontend is a **Single Page Application (SPA)** that interacts with the API via **AJAX**.
*   **Asynchronous CRUD:** Users can add, edit, or delete fish without refreshing the page.
*   **State Management:** Uses a local JavaScript array (`allFish`) to mirror the database, ensuring the UI updates instantly.
*   **Dynamic Form:** A single, responsive form that switches context between "Add" and "Update" modes based on user interaction.

---

## Database Schema
The SQLite database stores data in the `andre_fish_log` table with the following schema:

| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| **fishId** | INTEGER | PRIMARY KEY AUTOINCREMENT | Unique identifier for each catch |
| **species** | TEXT | NOT NULL | Type of fish (e.g., Pike, Trout) |
| **sizecm** | REAL | NOT NULL | Length of the fish in cm |
| **weight** | REAL | NOT NULL | Weight of the fish |
| **location_name** | TEXT | NOT NULL | Water body or location name |
| **lure** | TEXT | DEFAULT NULL | Lure or bait used |
| **picture_link** | TEXT | DEFAULT NULL | URL to a photo of the catch |

---

## Deployment & Environment
*   **Hosting:** Configured for deployment on **PythonAnywhere**.
*   **Backend:** Python 3.13 with Flask.
*   **Frontend:** HTML5, CSS3, jQuery 3.6.0.
*   **Database:** SQLite3.

---

## Setup Instructions
1.  **Initialize Database:**
    ```bash
    python createschema.py
    ```
2.  **Start the Application:**
    ```bash
    python server.py
3.  **View the Application:**
    Local Development: http://127.0.0.1:5000
    Production: https://andrehoarau.pythonanywhere.com/
