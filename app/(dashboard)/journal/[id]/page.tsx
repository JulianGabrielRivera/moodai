import Editor from "@/components/Editor"
import { analyze } from "@/utils/ai"
import { getUserByClerkID } from "@/utils/auth"
import { prisma } from "@/utils/db"

const getEntry = async (id) => {
    const user = await getUserByClerkID()
    // if we use unique here, everything we query in here has to be also unique in our schema
    const entry = await prisma.journalEntry.findUnique({
        where:{
            // when you do compound index the property in which you query from is a combination of the two of them in the order in which you pass into the array seperated by the underscore
          userId_id:{
            userId:user.id,
            id,
          }
        },
        
            include:{
                analysis:true
            },
    })

    // if (!entry.analysis) {
    //     const analysis = await analyze(entry.content)
    //     console.log(analysis);
    //   entry =  await prisma.analysis.create({
    //         data:{
    //             entryId: entry.id,
    //             ...analysis
    //         },
    //     })
    // }
    return entry
}
const EntryPage = async ({params}) =>{
    const {id} = await params
    const entry = await getEntry(id)
 
    return <div className="h-full w-full">
        <Editor entry={entry}/>
        </div>
        
  

}

export default EntryPage