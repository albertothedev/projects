import type { NextPage } from "next";
import { useState } from "react";

import Game from "components/Game";
import Leaderboard from "components/Leaderboard";
import User from "components/User";
import Modal from "components/Modal";

const Home: NextPage = () => {
  const [modalMessage, setModalMessage] = useState<string>();

  return (
    <div className="app">
      <User setModalMessage={setModalMessage} />
      <Game setModalMessage={setModalMessage} />
      <Leaderboard />

      {modalMessage && <Modal message={modalMessage} />}
    </div>
  );
};

export default Home;
