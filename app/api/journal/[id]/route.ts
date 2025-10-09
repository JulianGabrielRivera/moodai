import { getUserByClerkID } from "@/utils/auth"
import { prisma } from "@/utils/db"
import { NextResponse } from "next/server"

export const PATCH = async(request,{params})=>{
    // this is how we get the body like req.body
    const {content} = await request.json
    //
    const user = await getUserByClerkID()
    const updatedEntry = await prisma.journalEntry.update({
        where:{
            userId_id:{
                userId: user.id,
                // we know its params.id because thats what we called the folder [id]
                id:params.id,
            }
        },
        data:{
            content
        }
    })

    return NextResponse.json({data:updatedEntry})
}