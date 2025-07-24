import React, { useState, useEffect } from 'react';

export default function NewNote({ handleSave, note, onCancelNote, setTitle, setContent, title, content }) {


    return (
        <div className="NewNote w-3/4 h-screen flex justify-center items-center max-md:w-full">
            <div className="">
                <form onSubmit={handleSave} className="flex flex-col space-y-4">
                    <div className="flex gap-4 justify-end">
                        <button type='button' onClick={onCancelNote} className="text-stone-900 font-medium hover:text-stone-500">Cancel</button>
                        <button type='submit' className="bg-stone-700 text-white px-4 py-2 rounded hover:bg-stone-500">Save</button>
                    </div>
                    <input 
                        type="text" 
                        placeholder="Note Title" 
                        className="px-4 py-2 text-xl rounded border border-stone-300 w-[30rem] max-md:w-full "
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <textarea 
                        placeholder="Note Content" 
                        className="px-4 py-2 rounded border border-stone-300 h-32"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    ></textarea>
                </form>
            </div>
        </div>
    );
}