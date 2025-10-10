import { analyze } from "@/utils/ai"
import { getUserByClerkID } from "@/utils/auth"
import { prisma } from "@/utils/db"
import { revalidatePath } from "next/cache"
import { NextResponse } from "next/server"

export const PATCH = async(request,{params})=>{
    // this is how we get the body like req.body
        const { id } = await params
    const {content} = await request.json()
    //
    const user = await getUserByClerkID()
    const updatedEntry = await prisma.journalEntry.update({
        where:{
            userId_id:{
                userId: user.id,
                // we know its params.id because thats what we called the folder [id]
                id:id,
            }
        },
        data:{
            content
        }
    })

    const analysis = await analyze(updatedEntry.content)
// update if you find it, if not then create it
   const updated = await prisma.analysis.upsert({
        where:{
            entryId: updatedEntry.id,
        },
        create:{
            entryId:updatedEntry.id,
            ...analysis
        },
        update:analysis,
        
    })

    return NextResponse.json({data: {...updatedEntry, analysis:updated}})
}