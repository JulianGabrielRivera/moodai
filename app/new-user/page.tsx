import { prisma } from "@/utils/db"
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from "next/navigation"

const createNewUser = async() =>{
    const user = await currentUser()
    
    if (!user || !user.id) {
        redirect(process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL || '/sign-up')
    }
    
    const match = await prisma.user.findUnique({
        where:{
            clerkId: user.id,
        },
    })

    if(!match){
        const email = user.emailAddresses?.[0]?.emailAddress
        if (!email) {
            throw new Error('User email not found')
        }
        
        await prisma.user.create({
            data:{
                clerkId: user.id,
                email: email,
            }
        })
    }

    redirect('/journal')
}


const NewUser = async() =>{

    await createNewUser()

    return (
        <div>...loading</div>
    )
}

export default NewUser