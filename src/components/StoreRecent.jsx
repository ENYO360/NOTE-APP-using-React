import React, { useState, useEffect } from 'react';
import { Trash2, NotebookPen, Check, X } from 'lucide-react';

export default function StoreRecent({
    noteData,
    selectedNoteId,
    selectedNote,
    onUpdateNote,
    setAppContent,
    handleCancelNote,
    checkInput,
    handleDeleteNote
}) {
    const selectedNotes = noteData.find(note => note.id === selectedNoteId); // Find the selected note by ID
    const [editable, setEditable] = useState(false); // State to manage if the note is editable
    const [editedNote, setEditedNote] = useState({ title: '', content: '' }); // State to manage the edited note
    const [isHovered, setIsHovered] = useState(null); // State to manage hover effect

    // definning icons + their tooltips
    const icons = [
        { id: 'trash', label: 'Delete Note', Icon: Trash2 },
        { id: 'edit', label: 'Edit Note', Icon: NotebookPen },
        { id: 'done', label: 'Save Note', Icon: Check },
        { id: 'close', label: 'Close Note', Icon: X }
    ]

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
                <button
                    onClick={() => handleDeleteNote(selectedNote.id)}
                    className='px-4'
                >
                    <div
                        className='cursor-pointer text-blue-600'
                        onMouseEnter={() => setIsHovered(icons[0].id)}
                        onMouseLeave={() => setIsHovered(null)}
                    >
                        {(() => {
                            const IconComp = icons[0].Icon;
                            return <IconComp size={32} className="cursor-pointer text-gray-700" />;
                        })()}
                    </div>

                    {isHovered === icons[0].id && (
                        <p className='absolute bg-white text-black text-xs rounded-md p-1 shadow-md'>{icons[0].label}</p>
                    )}
                </button>
                <button onClick={handleCancelNote}>
                    <div
                        className='cursor-pointer text-blue-600'
                        onMouseEnter={() => setIsHovered(icons[3].id)}
                        onMouseLeave={() => setIsHovered(null)}
                    >
                        {(() => {
                            const IconCancel = icons[3].Icon;
                            return <IconCancel size={32} className="cursor-pointer text-gray-700" />;
                        })()}
                    </div>

                    {isHovered === icons[3].id && (
                        <p className='absolute bg-white text-black text-xs rounded-md p-1 shadow-md'>{icons[3].label}</p>
                    )}
                </button>
                {!editable ? (
                    <button onClick={handleEditClick} className="px-4 py-2">
                        <div
                            className='cursor-pointer text-blue-600'
                            onMouseEnter={() => setIsHovered(icons[1].id)}
                            onMouseLeave={() => setIsHovered(null)}
                        >
                            {(() => {
                                const IconEdit = icons[1].Icon;
                                return <IconEdit size={32} className="cursor-pointer text-gray-700" />;
                            })()}
                        </div>

                        {isHovered === icons[1].id && (
                            <p className='absolute bg-white text-black text-xs rounded-md p-1 shadow-md'>{icons[1].label}</p>
                        )}
                    </button>
                ) : (
                    <button onClick={handleSaveClick} className="px-4 py-2">
                        <div
                            className='cursor-pointer text-blue-600'
                            onMouseEnter={() => setIsHovered(icons[2].id)}
                            onMouseLeave={() => setIsHovered(null)}
                        >
                            {(() => {
                                const IconDone = icons[2].Icon;
                                return <IconDone size={32} className="cursor-pointer text-gray-700" />;
                            })()}
                        </div>

                        {isHovered === icons[2].id && (
                            <p className='absolute bg-white text-black text-xs rounded-md p-1 shadow-md'>{icons[2].label}</p>
                        )}
                    </button>
                )}
            </div>

            <input
                className="w-full text-xl font-bold mb-2 p-2 border border-stone-300 rounded-t-2xl"
                value={editedNote.title}
                onChange={(e) => setEditedNote({ ...editedNote, title: e.target.value })}
                readOnly={!editable}
            />
            <textarea
                className="w-full h-64 p-2 border border-stone-300 rounded-b-2xl"
                value={editedNote.content}
                onChange={(e) => setEditedNote({ ...editedNote, content: e.target.value })}
                readOnly={!editable}
            />
        </div>
    );
}