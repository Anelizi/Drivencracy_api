import dayjs from "dayjs";
import { db } from "../database/database.connection.js";

export async function pollPost(req, res) {
  const { title } = req.body;
  let { expireAt } = req.body;

  if (expireAt === "") {
    expireAt = dayjs().add(30, "day").format("YYYY-MM-DD HH:mm:ss");
  }

  const poll = {
    title,
    expireAt,
  };

  try {
    await db.collection("polls").insertOne(poll);

    res.status(201).send("Tudo certo");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function pollGet(req, res) {
  const { title } = req.body;
  try {
    const polls = await db.collection("polls").find({ title }).toArray();

    res.status(200).send(polls);
  } catch (error) {
    res.status(500).send(error);
  }
}
