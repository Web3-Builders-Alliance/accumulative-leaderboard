import { FC, useEffect, useState } from "react";
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import Head from "next/head";
import { useProgram } from "../utils/useProgram";

const Leaderboard = (props) => {
  const wallet = useAnchorWallet();
  const { connection } = useConnection();
  const { program } = useProgram({ connection, wallet });
  const [leaderboard, setLeaderboard] = useState();

  useEffect(() => {
    (async()=>{ if (program) {
      const leaderboard = await program.account.leaderboard.all();
      setLeaderboard(leaderboard[0].account.leaderboard);
    }})();
  }, [program, wallet]);

  return (
    <>
      <Head>
        <title>{`'Cade Leaderboard`}</title>
        <meta
          name="description"
          content="Death is temporary Solana is innevitable"
        />
      </Head>
      <section className="text-gßray-600 body-font relative bg-[url('/kn.jpg')]">
        <div className="container px-5 py-10 mx-auto flex sm:flex-nowrap flex-wrap">
          <div className="lg:w-2/3 md:w-1/2 rounded-lg overflow-hidden sm:mr-10 ">
            <div className="flex  flex-col min-h-screen">
              <h1 className="text-3xl font-bold text-white">Leaderboard</h1>
              {leaderboard?.length > 0 ? (
                <div className="text-white">
                  {leaderboard.map((player, index) => (
                    <div key={index}>
                      {index + 1}. {player.address.toBase58()} - {player.plays.toString()}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-white">Updating...</div>
              )
              }
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Leaderboard;
