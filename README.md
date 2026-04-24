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
The application follows a logical user journey:
1. **Initial State:** On first load, the Model populates the list with default IT-industry contacts.
2. **Contact Management:** Clicking "Add Contact" opens a modal.
* The View handles form validation before passing data to the Controller.
* The Model performs a "Type-Casting" check (ID Numbering) to decide whether to Update or Insert a record.
3. **Synchronization:** Every data change triggers an automatic re-render of the View and updates the LocalStorage.
---

## How to Run
1. **Clone the repository:**
   ```bash
   git clone https://github.com/shche/PhoneBook.git
2. **Open the project:**
   Simply open index.html via Live Server in VS Code or any modern browser.

3. **Live Demo:**
   Alternatively, visit the live demo via [GitHub Pages](https://overdraft.github.io/PhoneBook-JS/index.html).

   ---

   Report: [Google Docs](https://docs.google.com/document/d/1hclSB-8W1cqrtn-H-WY6Rx7wAtG-2Zy-/edit?usp=sharing&ouid=113956265273490753946&rtpof=true&sd=true)
