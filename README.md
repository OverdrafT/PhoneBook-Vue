# Laboratory Work #3: PhoneBook Web Application

### Developer Information
* **Name:** Shcherbatiuk Yevhen
* **Group:** KV-33
* **Institution:** Igor Sikorsky Kyiv Polytechnic Institute (KPI)
* **Course:** Web Design & Front-end Development

---

## Project Overview
This project is a modern Full-stack web application for contact management. In this version (Laboratory Work #3), the application has been migrated from a manual MVC pattern to the Vue.js framework on the frontend and a Node.js (Express) backend with SQLite for persistent data storage.
### Key Features:
* **Reactive Frontend:** Powered by Vue.js 3, providing instant UI updates and seamless data binding.
* **RESTful API Backend:** A Node.js server built with Express.js handles all data requests.
* **Persistent Database:** Contacts and user information are stored in a relational SQLite database (phonebook.db).
* **Full CRUD Lifecycle:**
   * Create: Add new contacts via a reactive modal form.
   * Read: Fetch and display contacts asynchronously using Axios.
   * Update: Edit existing entries with real-time feedback.
   *  Delete: Remove contacts with instant state synchronization.

* **Authentication Logic:** Session management using localStorage to handle Login/Logout states and conditional UI rendering.
* **Responsive Design:** Mobile-first approach using Bootstrap 5.3 and custom Flexbox layouts (including a Sticky Footer).

---

## Technologies Used
* **Frontend:** Vue.js 3 (Options API), Axios, Bootstrap 5.3, Bootstrap Icons.
* **Backend:** Node.js, Express.js, CORS, Body-Parser.
* **Database:** SQLite3 (Relational storage).
* **Styling:** Custom CSS3 with Media Queries for advanced mobile adaptation.

---

## Project Structure
The repository has been optimized to separate client-side and server-side logic:
* `index.html` — Main dashboard (Contacts list).
* `login.html` / `register.html` — Authentication pages powered by Vue.
* `profile.html` — User profile page with dynamic data binding.
* `server.js` — The Express.js backend and API routing.
* `phonebook.db` — SQLite database file.
* `js/vue-app.js` — The centralized Vue.js logic (The "Brain" of the frontend).
* `css/style.css` — Custom styles, including sticky footer and mobile card-view for tables.
* `package.json` — Dependencies and project metadata.

---

## Navigation Flow
1. **Startup:** The backend initializes the SQLite database and creates users and contacts tables.
2. **Client Interaction:** On load, Vue checks localStorage for an active session (isLogged).
  * If authorized, Vue triggers axios.get('/api/contacts') to populate the list.
3. **Data Handling:** All form submissions trigger asynchronous requests to the Express server, which performs SQL queries to update the database.
4. **State Management:** Upon a successful API response, Vue's reactivity system automatically updates the DOM without a page reload.
---

## How to Run
1. **Clone the repository:**
   ```bash
   git clone https://github.com/shche/PhoneBook.git
2. **Install Dependencies::**
   ```bash
   npm install
3. **Start the Server:**
   ```bash
   node server.js
4. **Open the App:**
  Open index.html via Live Server (VS Code) or simply open the file in your browser while the server is running.

   ---

   Report: [Google Docs]([https://docs.google.com/document/d/1hclSB-8W1cqrtn-H-WY6Rx7wAtG-2Zy-/edit?usp=sharing&ouid=113956265273490753946&rtpof=true&sd=true](https://docs.google.com/document/d/1hclSB-8W1cqrtn-H-WY6Rx7wAtG-2Zy-/edit?usp=sharing&ouid=113956265273490753946&rtpof=true&sd=true))
