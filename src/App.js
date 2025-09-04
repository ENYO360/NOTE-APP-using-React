import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from './firebase';
import { 
  collection, 
  addDoc, 
  query, 
  where, 
  onSnapshot, 
  updateDoc, 
  doc,
  deleteDoc,
  serverTimestamp
} from 'firebase/firestore';
import './App.css';
import MainPage from './components/MainPage';
import SideBar from './components/SideBar';
import NewNote from './components/NewNote';
import StoreRecent from './components/StoreRecent';
import MenuBar from './components/MenuBar';
import AuthPage from './components/AuthPage';
import loadingGif from './icons8-iphone-spinner.gif';

function App() {
  const [appContent, setAppContent] = useState('main'); // State to manage the current appContent
  const [noteData, setNoteData] = useState([]); // State to manage notes data
  const [selectedNoteId, setSelectedNoteId] = useState(null); // State to manage selected note ID
  const [openMenu, setOpenMenu] = useState(false); // State to manage the menu visibility
  const [title, setTitle] = useState(""); // State to manage the note title
  const [content, setContent] = useState(""); // State to manage the note content
  const [user, setUser] = useState(null); // State to manage authenticated user
  const [loading, setLoading] = useState(true); // State to manage loading status

  // Watch Firebase auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

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

  // Fetch notes from Firestore when user changes
  useEffect(() => {
    if (!user) return;

    const q = query(collection(db, "notes"), where("uid", "==", user.uid));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const notes = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setNoteData(notes);
    });

    return () => unsubscribe();
  }, [user]);

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

  async function handleSaveNote(newNote) {
    const id = Date.now().toString(); // Generate a unique ID for the note
    const note = { id, ...newNote };
    setNoteData([note, ...noteData]); // Add the new note to the beginning of the notes array
    setSelectedNoteId(id);  // Set the selected note ID to the new note's ID

    // Save the new note to Firestore
    try {
      const docRef = await addDoc(collection(db, "notes"), {
        ...newNote,
        uid: user.uid,
        createdAt: serverTimestamp(),
      });
      setSelectedNoteId(docRef.id);
    } catch(err) {
      console.error("Error adding note:", err);
    }
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

  function handleSelectNote(id) {
    setSelectedNoteId(id); // Set the selected note ID
    setAppContent('recent'); // Switch to RecentNotes component
  }

  async function handleUpdateNote(id, updatedNote) {
    const updatedNotes = noteData.map(note =>
      note.id === id ? { ...note, ...updatedNote } : note
    );
    setNoteData(updatedNotes);

    // Update the note in Firestore
    try {
      const noteRef = doc(db, "notes", id);
      await updateDoc(noteRef, updatedNote);
    } catch (err) {
      console.error("Error updating note:", err);
    }
  }

  async function handleDeleteNote(id) {
    try {
      await deleteDoc(doc(db, "notes", id));

      // update local state so UI refreshes
      setNoteData(prevNotes => prevNotes.filter(note => note.id !== id));
      setAppContent('main'); // Switch back to MainPage after deletion
      setSelectedNoteId(null); // Clear selected note ID
    } catch (err) {
      console.error("Error deleting note:", err);
    }
  }

  function handleOpenMenu() {
    setOpenMenu(true);
  }

  function handleCloseMenu() {
    setOpenMenu(false);
  }

    const handleLogout = async () => {
      await signOut(auth);
      setUser(null);
    };

    if (loading) {
      return (
      <div className='p-5 h-screen flex justify-center items-center'>
        <img src={loadingGif} alt="Loading..." className="mx-auto" />
      </div>
      );
    }

  return (
    <>
      {!user ? (
        <AuthPage onLogin={() => setUser(auth.currentUser)} />
      ) : (

      <div className="flex bg-stone-300">
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
            handleLogout={handleLogout}
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
            handleDeleteNote={handleDeleteNote}
          />
        }
      </div>
      )}
    </>
  );
}

export default App;
