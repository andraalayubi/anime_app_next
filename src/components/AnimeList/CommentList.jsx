import prisma from '@/libs/prisma'
import React from 'react'
import Image from 'next/image'

const CommentList = async ({ anime_mal_id }) => {

    const comments = await prisma.comment.findMany({ where: { anime_mal_id } })

    return (
        <div className='gap-4 mt-4 mb-6'>
            {comments.map(comment => {
                return (
                    <section className='flex' key={comment.id}>
                        <Image className='mt-2 mb-6 rounded' src={comment.user_image} alt='' width={50} height={50}/>
                        <div className='w-full text-color-primary bg-color-dark p-4'>
                            <p>@{comment.username}</p>
                            <p>{comment.comment}</p>
                            <div>
                                
                            </div>
                        </div>
                    </section>
                )
            })}
        </div>
    )
}

export default CommentList