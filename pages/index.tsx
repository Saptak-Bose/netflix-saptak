import type { GetServerSideProps } from "next";
import Head from "next/head";
import { useRecoilState, useRecoilValue } from "recoil";
import { modalState, movieState } from "../atoms/modalAtom";
import Banner from "../components/Banner";
import Header from "../components/Header";
import Modal from "../components/Modal";
import Row from "../components/Row";
import useAuth from "../hooks/useAuth";
import requests from "../utils/requests";

type Props = {
  netflixOriginals: Movie[];
  trendingNow: Movie[];
  topRated: Movie[];
  actionMovies: Movie[];
  comedyMovies: Movie[];
  horrorMovies: Movie[];
  dramaMovies: Movie[];
  documentaries: Movie[];
};

const Home = ({
  netflixOriginals,
  actionMovies,
  comedyMovies,
  documentaries,
  horrorMovies,
  dramaMovies,
  topRated,
  trendingNow,
}: Props) => {
  const { loading } = useAuth();
  const showModal = useRecoilValue(modalState);
  const [movie, setMovie] = useRecoilState(movieState);

  if (loading) return null;

  return (
    <div>
      <Head>
        <title>
          {movie?.title ||
            movie?.original_name ||
            "Netflix - Watch TV Shows Online, Watch Movies Online"}
        </title>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </Head>

      <div className="relative h-screen bg-gradient-to-b lg:h-[140vh]">
        <Header />
        <main className="relative pl-4 pb-24 lg:space-y-24 lg:pl-16">
          <Banner netflixOriginals={netflixOriginals} />
          <section className="md:space-y-24">
            <Row title="Trending Now" movies={trendingNow} />
            <Row title="Top Rated" movies={topRated} />
            <Row title="Action Thrillers" movies={actionMovies} />
            {/* My List */}
            <Row title="Comedies" movies={comedyMovies} />
            <Row title="Scary Movies" movies={horrorMovies} />
            <Row title="Dramas" movies={dramaMovies} />
            <Row title="Documentaries" movies={documentaries} />
          </section>
        </main>
        {showModal && <Modal />}
      </div>
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  const [
    netflixOriginals,
    trendingNow,
    topRated,
    actionMovies,
    comedyMovies,
    horrorMovies,
    dramaMovies,
    documentaries,
  ] = await Promise.all([
    fetch(requests.fetchNetflixOriginals).then((res) => res.json()),
    fetch(requests.fetchTrending).then((res) => res.json()),
    fetch(requests.fetchTopRated).then((res) => res.json()),
    fetch(requests.fetchActionMovies).then((res) => res.json()),
    fetch(requests.fetchComedyMovies).then((res) => res.json()),
    fetch(requests.fetchHorrorMovies).then((res) => res.json()),
    fetch(requests.fetchDramaMovies).then((res) => res.json()),
    fetch(requests.fetchDocumentaries).then((res) => res.json()),
  ]);

  return {
    props: {
      netflixOriginals: netflixOriginals.results,
      trendingNow: trendingNow.results,
      topRated: topRated.results,
      actionMovies: actionMovies.results,
      comedyMovies: comedyMovies.results,
      horrorMovies: horrorMovies.results,
      dramaMovies: dramaMovies.results,
      documentaries: documentaries.results,
    },
  };
};
