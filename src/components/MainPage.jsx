import React, { useEffect, useState } from 'react';
import NoteImage from '../no-project.png'

export default function MainPage({ onCreateNote }) {

    return (

        <div className="MainPage w-3/4 max-md:w-full h-screen flex justify-center items-center">
            <div className="flex flex-col justify-center items-center mx-auto">
                <h1 className="welcome text-2xl font-medium text-stone-500 pb-5">Welcome to the Note App</h1>
                <div>
                    <img src={NoteImage} alt="A note" className='note mx-auto mb-5' />
                    <button onClick={onCreateNote} className="createBtn bg-stone-700 text-white px-4 py-2 rounded hover:bg-stone-500">Create New Note</button>
                </div>
            </div>
        </div>
    );
}
