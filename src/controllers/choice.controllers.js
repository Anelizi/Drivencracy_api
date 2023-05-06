import dayjs from "dayjs";
import { ObjectId } from "mongodb";
import { db } from "../database/database.connection.js";

export async function choicePost(req, res) {
  const { title, pollId } = req.body;

  try {
    const pollExist = await db
      .collection("polls")
      .findOne({ _id: new ObjectId(pollId) });

    const titleRepeated = await db.collection("choices").findOne({ title });

    if (!pollExist) return res.sendStatus(404);

    if (dayjs().isAfter(pollExist.expireAt)) {
      return res.status(403).send("Enquete expirada");
    }

    if (titleRepeated) return res.status(409).send("Opção já cadastrada");

    await db.collection("choices").insertOne({
      title,
      pollId: new ObjectId(pollId),
    });

    res.sendStatus(201);
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function choiceVotePost(req, res) {
  const { id } = req.params;
  
  try {
    const choiceExist = await db
      .collection("choices")
      .findOne({ _id: new ObjectId(id) });

    if (!choiceExist) return res.status(404).send("Essa opção não existe");

    const pollExist = await db
      .collection("polls")
      .findOne({ _id: new ObjectId(choiceExist.pollId) });

    if (dayjs().isAfter(pollExist.expireAt)) {
      return res.status(403).send("Enquete expirada");
    }

    await db
      .collection("votes")
      .insertOne({
        choiceId: new ObjectId(id),
        createdAt: dayjs().format("YYYY-MM-DD HH:mm"),
      });

      res.status(201).send("Voto registrado")
  } catch (error) {
    res.status(500).send(error);
  }
}
