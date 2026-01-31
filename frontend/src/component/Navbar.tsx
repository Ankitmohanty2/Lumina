import Todo from "./Todo"

export function Navbar(){
    return(
        <>
        <div className="flex flex-col pl-2 justify-between  h-[70vh]">
            <div>
            <div className="flex items-center gap-2 pb-[4vh]">
            <img src="/luminaalogo.png" alt="Lumina" className="h-9 w-auto" />
            <span className="text-2xl font-bold">Lumina</span>
          </div>
            <ul>
                <li onClick={()=>{return <Todo></Todo>}}>Home</li>
                <li>Understand with AI</li>
                <li>Bookmarked</li>
                <li>Setting</li>
            </ul>
            </div>

            <div>Profile</div>
        </div>
        </>
    )
}