import React, { useState, useEffect } from 'react';

export default function StoreRecent({ 
    noteData, 
    selectedNoteId, 
    selectedNote, 
    onUpdateNote, 
    setAppContent, 
    handleCancelNote,
    checkInput 
}) {
    const selectedNotes = noteData.find(note => note.id === selectedNoteId); // Find the selected note by ID
    const [editable, setEditable] = useState(false); // State to manage if the note is editable
    const [editedNote, setEditedNote] = useState({ title: '', content: '' }); // State to manage the edited note

    useEffect(() => {
        if (selectedNote) {
            setEditedNote({
                title: selectedNotes.title,      // Set the title from the selected note
                content: selectedNotes.content       // Set the content from the selected note
            });
        }
    }, [selectedNote]);

    function handleEditClick() {
        setEditable(true);      // Set editable to true when edit button is clicked
    }

    function handleSaveClick() {
        if (!checkInput()) return; // Check input validity before saving
        onUpdateNote(selectedNote.id, editedNote); // Call the onUpdateNote function with the current edited note
        setEditable(false);    // Set editable to false after saving
        setAppContent('main'); // Switch back to MainPage after saving
    }

    return (
        <div className='w-3/4 max-md:w-full h-screen p-4 bg-stone-100 rounded-md max-md:flex max-md:flex-col max-md:justify-center'>
            <div className="flex justify-end items-center mb-2 gap-2">
                <button onClick={handleCancelNote}>Close</button>
                {!editable ? (
                    <button onClick={handleEditClick} className="bg-stone-700 text-white px-4 py-2 rounded hover:bg-stone-500">Edit</button>
                ) : (
                    <button onClick={handleSaveClick} className="bg-stone-700 text-white px-4 py-2 rounded hover:bg-stone-500">Save</button>
                )}
            </div>

            <input
                className="w-full text-xl font-bold mb-2 p-2 border border-stone-300 rounded"
                value={editedNote.title}
                onChange={(e) => setEditedNote({ ...editedNote, title: e.target.value })}
                readOnly={!editable}
            />
            <textarea
                className="w-full h-64 p-2 border border-stone-300 rounded"
                value={editedNote.content}
                onChange={(e) => setEditedNote({ ...editedNote, content: e.target.value })}
                readOnly={!editable}
            />
        </div>
    );
}