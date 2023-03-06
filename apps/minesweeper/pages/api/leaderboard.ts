import { type NextApiRequest, type NextApiResponse } from "next";

import db from "config/firebase";

export default async function leaderboard(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const gamesSnapshot = await db
      .collection("games")
      .orderBy("time", "asc")
      .get();

    res.status(200).send(gamesSnapshot.docs.map((doc) => doc.data()));
  } catch (error) {
    console.error(`Error getting collection: ${error}`);
  }
}
