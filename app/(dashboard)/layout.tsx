import { UserButton } from "@clerk/nextjs"


const DashboardLayout = ({children}) =>{
return(
    // this is vw/vh
    <div className="h-screen w-screen relative">
        <aside className="absolute w-[200px] top-0 left-0 h-full border-r border-black/10">
        Mood
        </aside>
        {/* margin left to offset the 200px width of aside */}
        <div className="ml-[200px] h-full">
        <header className="h-[60px] border-b border-black/10">
            <div className="h-full w-full px-6 flex items-center justify-end">
                <UserButton/>
            </div>
            </header>
            <div className="h-[calc(100vh-60px)]">{children}</div>
        </div>
    </div>
)

}

export default DashboardLayout