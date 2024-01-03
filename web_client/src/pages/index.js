import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import Head from "next/head";
import { useProgram } from "../utils/useProgram";
import * as web3 from "@solana/web3.js";
import Dice from "../components/Dice";
import Leaderboard from "../components/leaderboard";

const HomePage = (props) => {
  const wallet = useAnchorWallet();
  const { connection } = useConnection();
  const { program } = useProgram({ connection, wallet });

  return (
    <>
      <Head>
        <title>{`'Cade BONK or dETH`}</title>
        <meta name="description" content="BONK or dETH" />
      </Head>
      <section className="text-gray-600 body-font relative bg-[url('/kn.jpg')] min-h-screen">
        <div className="container px-5 py-10 mx-auto flex sm:flex-nowrap flex-wrap">
        <h1 className="text-center w-full text-white">DETH is temporary, Solana is inevitable</h1>
        </div>
        <div className="container px-5 py-10 mx-auto flex sm:flex-nowrap flex-wrap">
          <div className=" w-full rounded-lg overflow-hidden ">
            <div className="flex justify-center items-center min-h-[400]px">
              <Dice
                onRoll={(value) => {
                  (async()=>{ if (program) {
                    try {
                      const [global] = web3.PublicKey.findProgramAddressSync(
                        [Buffer.from("leaderboard")],
                        program.programId,
                      )
                      const [user] = web3.PublicKey.findProgramAddressSync(
                        [Buffer.from("user"), global.toBuffer(), wallet.publicKey.toBuffer()],
                        program.programId,
                      )
                      const tx = await program.methods
                        .play()
                        .accounts({ user, global, payer: wallet.publicKey })
                        .rpc({
                          skipPreflight:true
                        })  ;
                  
                      console.log("Your transaction signature is: ", tx);
                      } catch (e) {
                        console.log(e);
                      }
                  }})()
                  console.log(value)
                }}
                faces={["bonk.jpg", "death.jpeg", "death.jpeg", "death.jpeg", "death.jpeg", "death.jpeg"]}
              />
            </div>
          </div>
        </div>
        <Leaderboard />
      </section>
    </>
  );
};

export default HomePage;
