# 8640 — Web Services and Applications

**Lecturer:** Andrew Beatty  
**Student Name:** Andre Hoarau  
**Student ID:** G00439332  
**Contact:** G00439332@atu.ie
**Project:** Web-Based Fish Tracker (Full-Stack CRUD Application)

---

## Project Overview
This project is a full-stack web application developed as part of the HDIP in Computing Data Analytics. The application serves as a digital logbook for anglers to track and manage catch data. It demonstrates the integration of a **Python Flask** backend, an **SQLite** database, and a **jQuery/AJAX** frontend to create a seamless Single Page Application (SPA).

---

## Project Structure
```text
C:.
├── static_pages/
│    ├── fish.js            # jQuery/AJAX logic and local state management
│    ├── index.html         # Main User Interface (SPA)
│    └── styles.css         # Application styling
├── .gitignore             # Configuration to exclude venv and local DB from Git
├── bigprojectdb           # SQLite database file (local only)
├── requirements.txt       # Python dependencies for deployment
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

### 4. External Image Integration
The application supports visual logging by integrating external image hosting services (e.g., Imgur).
* **Lightweight Persistence:** Stores only the image URL in the database, keeping the SQLite file size small and efficient.
* **Referrer Policy Optimization:** Implements a no-referrer meta-tag to ensure reliable image rendering across different hosting platforms.
* **Visual Data Validation:** Provides immediate visual confirmation of catches within the main table, enhancing the user's logbook experience.
---

##  System Architecture
The application follows a standard N-Tier architecture:
1.  **Presentation Layer:** HTML5/CSS3 and jQuery handles user interaction and UI updates via AJAX.
2.  **Service Layer:** Flask (`server.py`) provides a RESTful API and routes requests to the DAO.
3.  **Data Access Layer:** `fishDAO.py` abstracts all SQL operations using the Data Access Object pattern.
4.  **Data Layer:** SQLite provides a persistent, file-based relational database.
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
1. Create and Activate Virtual Environment  
```python -m venv venv```  
```source venv/bin/activate```  # Mac/Linux  
OR ```venv\Scripts\activate``` # Windows

2. Install Dependencies
```pip install -r requirements.txt```

3. Initialize Database
```python createschema.py```

4. Start the Application
```python server.py```  

5.  **View the Application:**  
    Local Development: http://127.0.0.1:5000  
    Production: https://andrehoarau.pythonanywhere.com/
---

## References & Documentation
This project was developed using the following technologies and documentation:

*   **Flask Documentation:** [https://flask.palletsprojects.com/](https://flask.palletsprojects.com/) - Used for backend routing and API development.
*   **jQuery API:** [https://api.jquery.com/](https://api.jquery.com/) - Used for DOM manipulation and AJAX requests.
*   **SQLite3:** [https://www.sqlite.org/docs.html](https://www.sqlite.org/docs.html) - Used for persistent data storage.
*   **PythonAnywhere:** [https://help.pythonanywhere.com/](https://help.pythonanywhere.com/) - Used for deployment and server hosting.
*   **W3Schools SQL:** [https://www.w3schools.com/sql/](https://www.w3schools.com/sql/) - Used as a reference for table schema and queries.

## Development Acknowledgment
This application was developed with the assistance of **Large Language Models (LLMs)** to aid in:
*   Refining the **Data Access Object (DAO)** structure for robust database interactions.
*   Debugging complex **jQuery AJAX** state management issues.
*   Optimizing the **RESTful API** logic for real-time frontend updates.
*   Structuring project documentation and directory organization.
