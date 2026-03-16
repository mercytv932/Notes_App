# Notes App (Vanilla JavaScript)

A clean and simple **Notes Application** built using **HTML, CSS, and Vanilla JavaScript**.  
The app allows users to create, edit, delete, search, export, and import notes while storing all data locally in the browser using **localStorage**.

This project demonstrates dynamic DOM manipulation, data persistence, search filtering, and file handling in the browser.

---

## Features

- Create notes with a title and content
- Edit existing notes
- Delete notes
- Search notes by title or content
- Save notes using **localStorage**
- Export notes as a **JSON file**
- Import notes from a **JSON file**
- Keyboard shortcuts (Enter to add notes)
- Simple and responsive user interface
- Clean card-style note layout
- Confirmation before deleting notes

---

## Technologies Used

- **HTML5**
- **CSS3**
- **JavaScript (ES6)**
- **DOM Manipulation**
- **Local Storage API**
- **FileReader API**
- **Blob API**

---

## Project Structure

```
notes-app/
│
├── index.html      # Main application file
├── style.css       # Styling for UI
├── script.js       # Notes logic and functionality
└── README.md       # Project documentation
```

---

## How It Works

### Creating Notes

Users can create notes by entering a **title** and **content**, then clicking the **Add Note** button.

Each note is stored as an object:

```javascript
const note = {
  date: Date.now(),
  title: title,
  content: content
};
```

Notes are saved in an array and stored in the browser using **localStorage**.

---

### Editing Notes

Users can edit notes by clicking the **edit icon (✏️)**.  
The note content loads into the input fields where it can be updated.

---

### Deleting Notes

Clicking the **X button** removes a note after a confirmation prompt.

```javascript
notes = notes.filter(n => n.date !== note.date);
```

---

### Search Notes

Users can search notes by typing into the search field.

The application filters notes based on:

- Title
- Content

Search results update dynamically as the user types.

---

### Data Persistence

Notes are stored locally in the browser using **localStorage**.

```javascript
localStorage.setItem("notes", JSON.stringify(notes));
```

When the page reloads, saved notes are automatically loaded.

---

### Export Notes

Users can download their notes as a **JSON file**.

This allows notes to be backed up or transferred.

```javascript
const blob = new Blob([jsonString], {type: "application/json"});
```

---

### Import Notes

Users can upload a previously exported **JSON file** to restore notes.

The app validates that the file contains a valid array before importing.

---

## User Interface

The interface includes:

- Sticky header navigation
- Card-style note layout
- Hover animations
- Clean form inputs
- Search bar
- Export / Import buttons
- Footer navigation

---

## Learning Goals

This project was built to practice:

- JavaScript DOM manipulation
- Local storage persistence
- Data structures (arrays and objects)
- Event handling
- File handling in the browser
- Search and filtering logic
- Clean UI styling

---

## Possible Future Improvements

- Dark mode toggle
- Tag system for notes
- Categories or folders
- Drag and drop note ordering
- Markdown support
- Cloud storage integration
- User authentication
- Sync across devices

---

## Author

**Yosef Ergano**

Computer Science student focused on building practical web applications and improving programming skills.

---

## License

This project is open source and free to use for educational purposes.
