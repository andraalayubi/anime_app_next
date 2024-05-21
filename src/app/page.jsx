import AnimeList from "@/components/AnimeList"
import Header from "@/components/AnimeList/Header"
import { getAnimeResponse, getNestedResponse, reproduce } from "@/libs/api-libs"

const Page = async () => {
  const topAnime = await getAnimeResponse("top/anime", "limit=8")
  let recommendedAnime = await getNestedResponse("recommendations/anime", "entry")
  recommendedAnime = reproduce(recommendedAnime, 8)

  return (
    <>
      <section className="mt-20">
        <Header title={"Paling Populer"} linkTitle={"Lihat Semua"} linkHref={"/populer"}/>
        <AnimeList api={topAnime}/>
      </section>
      <section>
        <Header title={"Rekomendasi"} />
        <AnimeList api={recommendedAnime}/>
      </section>
    </>
  )
}

export default Page