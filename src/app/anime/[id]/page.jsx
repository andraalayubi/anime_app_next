import { getAnimeResponse } from "@/libs/api-libs"
import VideoPlayer from "@/components/Utilities/VideoPlayer"
import Image from "next/image"
import CollectionButton from "@/components/AnimeList/CollectionButton"
import { authUserSession } from "@/libs/auth_libs"
import prisma from "@/libs/prisma"
import CommentInput from "@/components/AnimeList/CommentInput"
import CommentList from "@/components/AnimeList/CommentList"

const Page = async ({ params: { id } }) => {
    const anime = await getAnimeResponse(`anime/${id}`)
    const user = await authUserSession()
    const collection = await prisma.collection.findFirst({
        where: { user_email: user?.email, anime_mal_id: id}
    })
    console.log(anime);

    return (
        <>
            <div className="pt-4 px-4 mt-16 flex justify-between">
                <h3 className="text-color-primary text-4xl">{anime.data.title} - {anime.data.year}</h3>
                { !collection && user && <CollectionButton anime_mal_id={id} user_email={user?.email} anime_image={anime.data.images.webp.image_url} anime_title={anime.data.title}/>
                }
            </div>
            <p className="pt-3 px-4 flex gap-2 text-color-primary text-xl">Aired: {anime.data.aired.string}</p>
            <div className="pt-3 px-4 flex gap-2 text-color-primary overflow-x-auto">
                <div className="w-36 flex-col justify-center items-center rounded border border-color-primary p-2">
                    <h3>PERINGKAT</h3>
                    <p>{anime.data.rank}</p>
                </div>
                <div className="w-36 flex-col justify-center items-center rounded border border-color-primary p-2">
                    <h3>SKOR</h3>
                    <p>{anime.data.score}</p>
                </div>
                <div className="w-36 flex-col justify-center items-center rounded border border-color-primary p-2">
                    <h3>EPISODES</h3>
                    <p>{anime.data.episodes}</p>
                </div>
            </div>
            <div className="pt-4 px-4 flex sm:flex-nowrap flex-wrap gap-2 text-color-primary">
                <Image src={anime.data.images.webp.image_url} alt={anime.data.images.jpg.image_url} width={250} height={250} className="w-full rounded object-contain" />
                <p className="text-justify text-xl">{anime.data.synopsis}</p>
            </div>
            <div className="p-4">
                <h3 className="text-color-primary text-2xl mb-2">Komentar</h3>
                { user && <CommentInput anime_mal_id={id} user_email={user?.email} username={user?.name} anime_title={anime.data.title} user_image={user?.image}/> }
                <CommentList anime_mal_id={id}/>
            </div>
            <div>
                <VideoPlayer youtubeId={anime.data.trailer.youtube_id} />
            </div>
        </>
    )
}

export default Page