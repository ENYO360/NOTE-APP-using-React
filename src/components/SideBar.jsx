export default function SideBar({ noteData, onSelectNote, handleSelectNote, setAppContent, openMenu, setOpenMenu }) {
    return (
        <div className={`
            sideBar 
            w-1.5/4 max-md:w-2/4 
            h-screen 
            bg-stone-900 
            rounded-md 
            ${openMenu ? 'block' : 'hidden'} 
            md:block
        `}>
            <div className="sideBar-header grid gap-3 justify-center items-center p-4">
                <button
                    onClick={() => {setAppContent('newNote'); setOpenMenu(false)}}
                    className="bg-stone-700 text-white px-4 py-2 max-sm:px-[2px] rounded hover:bg-stone-500 mx-3 max-sm:text-[10px]"
                >
                    New Note
                </button>
                <h2 className="text-xl font-semibold text-stone-100 pt-2 max-sm:text-sm">Recent Notes</h2> <hr />
            </div>

            <ul className="mt-4">
                {noteData.map(note => (
                    <li
                        key={note.id}
                        className="text-stone-100 px-4 py-2 hover:bg-stone-700 cursor-pointer border-b-2 border-stone-500"
                        onClick={() => {
                            onSelectNote(note.id);
                            handleSelectNote(note.id);
                            setOpenMenu(false); // Close the menu when a note is selected
                        }}
                    >
                        <h3 className="font-semibold text-xl w-inherit">{note.title.length > 20 ? note.title.slice(0, 20) + "..." : note.title}</h3>
                        <p className="pt-2">{note.content.length > 20 ? note.content.slice(0, 20) + "..." : note.content}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}