// "use client"

import Header from "@/components/Dashboard/Header"
import { Trash } from "@phosphor-icons/react"
import { authUserSession } from '@/libs/auth_libs'
import prisma from '@/libs/prisma'
import React from 'react'
import Image from 'next/image'

const page = async () => {
    const user = await authUserSession()
    const comments = await prisma.comment.findMany({ where: { user_email: user.email } })

    return (
        <section className="mt-20 px-4 w-full">
            <Header title={"My Comment"} type={'comment'} userEmail={user.email}/>
            {comments.length === 0 ?
                <div className='flex flex-row justify-center items-center'>
                    <Image src="/curiosity.png" alt='/curiosity.svg' width={350} height={350} />
                    <h3 className="text-color-accent text-4xl font-bold">NO COMMENT FOUND</h3>
                </div>
                :
                <div className='grid grid-cols-1 px-4 pb-8 gap-4'>
                    {comments.map(comment => {
                        return (
                            <div key={comment.id} className='bg-color-primary text-color-dark p-4'>
                                <p className='text-sm'>{comment.anime_title}</p>
                                <p className='italic'>{comment.comment}</p>
                            </div>
                        )
                    })}
                </div>
            }
        </section>
    )
}

export default page