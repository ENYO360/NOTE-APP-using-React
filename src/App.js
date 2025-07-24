import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import MainPage from './components/MainPage';
import SideBar from './components/SideBar';
import NewNote from './components/NewNote';
import StoreRecent from './components/StoreRecent';
import MenuBar from './components/MenuBar';

function App() {
  const [appContent, setAppContent] = useState('main'); // State to manage the current appContent
  const [noteData, setNoteData] = useState([]); // State to manage notes data
  const [selectedNoteId, setSelectedNoteId] = useState(null); // State to manage selected note ID
  const [openMenu, setOpenMenu] = useState(false); // State to manage the menu visibility
  const [title, setTitle] = useState(""); // State to manage the note title
  const [content, setContent] = useState(""); // State to manage the note content


  function handleCreateNote() {
    setAppContent('newNote'); // Switch to NewNote component
    setOpenMenu(false); // Close the menu when creating a new note
  }

  function handleCancelNote() {
    setAppContent('main'); // Switch back to MainPage without saving
  }

  function checkInput() {
    if (title.trim() === "" || content.trim() === "") {
      alert("Both Title and content cannot be empty!"); // Alert if title or content is empty
      return false; // Return false to prevent saving
    }
    return true; // Return true if inputs are valid
  }

  function handleSaveNote(newNote) {
    const id = Date.now().toString(); // Generate a unique ID for the note
    const note = { id, ...newNote };
    setNoteData([note, ...noteData]); // Add the new note to the beginning of the notes array
    setSelectedNoteId(id); // Set the selected note ID to the new note's ID
  }

  const handleSave = (e) => {
    e.preventDefault();             // Prevent the default form submission
    if (!checkInput()) return;      // Check input validity
    handleSaveNote({ title, content }); // Call the onSaveNote function with the current title and content
    // Reset the title and content after saving
    setTitle("");
    setContent("");

    setTimeout(() => {
      handleCancelNote();
    }, 0);
  }

  const selectedNote = noteData.find(note => note.id === selectedNoteId); // Find the selected note by ID

  useEffect(() => {
    if (appContent !== 'newNote' && selectedNote) {
      setTitle(selectedNote.title);      // Set the title from the note prop
      setContent(selectedNote.content);   // Set the content from the note prop
    } else if (appContent === 'newNote') {
      setTitle("");         // Reset title if no note is provided
      setContent("");        // Reset content if no note is provided
    }
  }, [selectedNote, appContent]);

  function handleSelectNote(id) {
    setSelectedNoteId(id); // Set the selected note ID
    setAppContent('recent'); // Switch to RecentNotes component
  }
  

  function handleUpdateNote(id, updatedNote) {
    const updatedNotes = noteData.map(note =>
      note.id === id ? { ...note, ...updatedNote } : note
    );
    setNoteData(updatedNotes);
  }

  function handleOpenMenu() {
    setOpenMenu(true);
  }

  function handleCloseMenu() {
    setOpenMenu(false);
  }

  return (
    <div className="App flex">
      <MenuBar
        openMenu={openMenu}
        onOpenMenu={handleOpenMenu}
        onCloseMenu={handleCloseMenu}
      />
      <SideBar
        noteData={noteData}
        onSelectNote={setSelectedNoteId}
        handleSelectNote={handleSelectNote}
        setAppContent={setAppContent}
        openMenu={openMenu}
        setOpenMenu={setOpenMenu}
      />
      {appContent === 'main' &&
        <MainPage
          onCreateNote={handleCreateNote}
          selectedNote={selectedNote}
          onUpdateNote={handleUpdateNote}
        />
      }
      {appContent === 'newNote' &&
        <NewNote
          key={selectedNoteId} // Ensure the component re-renders when a new note is created
          handleSave={handleSave}
          note={selectedNote}
          onCancelNote={handleCancelNote}
          setTitle={setTitle}
          setContent={setContent}
          title={title}
          content={content}
        />
      }
      {appContent === 'recent' &&
        <StoreRecent
          noteData={noteData}
          selectedNoteId={selectedNoteId}
          selectedNote={selectedNote}
          onUpdateNote={handleUpdateNote}
          setAppContent={setAppContent}
          handleCancelNote={handleCancelNote}
          checkInput={checkInput}
        />
      }
    </div>
  );
}

export default App;
