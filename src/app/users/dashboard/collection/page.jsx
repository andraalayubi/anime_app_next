import Header from "@/components/Dashboard/Header"
import { authUserSession } from "@/libs/auth_libs"
import Image from "next/image"
import Link from "next/link"
import prisma from "@/libs/prisma"

const Page = async () => {
    console.log('tes');
    const user = await authUserSession();
    console.log(user.email);
    const collection = await prisma.collection.findMany({
        where: { user_email: user.email }
    })

    return (
        <section className="mt-20 px-4 w-full">
            <Header title={"My Collection"} type={'collection'} userEmail={user.email}/>
            {collection.length === 0 ?
                <div className='flex flex-row justify-center items-center'>
                    <Image src="/curiosity.png" alt='/curiosity.svg' width={350} height={350} />
                    <h3 className="text-color-accent text-4xl font-bold">NO COLLECTION FOUND</h3>
                </div>
                :
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {collection.map((collect, index) => {
                        return (
                            <Link key={index} href={`/anime/${collect.anime_mal_id}`} className="relative">
                                <Image src={collect.anime_image} alt={collect.anime_image} width={350} height={350} className="w-full max-h-96 object-cover" />
                                <div className="absolute flex items-center justify-center bottom-0 w-full bg-color-accent h-16">
                                    <h5 className="text-xl text-center">{collect.anime_title}</h5>
                                </div>
                            </Link>
                        )
                    })}
                </div>
            }
        </section>
    )
}

export default Page