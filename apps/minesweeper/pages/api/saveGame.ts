import { type NextApiRequest, type NextApiResponse } from "next";

import db from "config/firebase";

const generateRandomUsername = () => {
  return `anonymous${Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000}`;
};

export default async function saveGame(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const game = req.body.data;

  if (!game.username) {
    game.username = generateRandomUsername();
  }

  try {
    await db.collection("games").add(game);

    return res.status(200).json({
      message: `Game added to the database as ${game.username}`,
      username: game.username,
    });
  } catch (error) {
    console.error(`Error adding document: ${error}`);
  }
}
