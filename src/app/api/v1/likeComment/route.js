import prisma from "@/libs/prisma"

export async function POST(request) {
    const { anime_mal_id, isLike } = await request.json()
    const data = { anime_mal_id, isLike }

    const createComment = await prisma.user.create({data})
    const updateLike = async () => {
        if(isLike == true){
            await prisma.comment.update({
                where: { anime_mal_id: parseInt(anime_mal_id) },
                data: {
                    like: {
                        increment: 1,
                    },
                },
            });
        }else{
            await prisma.comment.update({
                where: { anime_mal_id: parseInt(anime_mal_id) },
                data: {
                    dislike: {
                        increment: 1,
                    },
                },
            });
        }
    } 

    if(!createComment && !updateLike) return Response.json({ status: 500, isCreated: false})
    else return Response.json({ status: 200, isCreated: true })
}