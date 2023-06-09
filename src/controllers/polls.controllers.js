import dayjs from "dayjs";
import { ObjectId } from "mongodb";
import { db } from "../database/database.connection.js";

export async function pollPost(req, res) {
  const { title, expireAt } = req.body;

  let expireDate;

  if (expireAt === "") {
    expireDate = dayjs().add(30, "day").format("YYYY-MM-DD HH:mm:ss");
  }

  try {
    await db.collection("polls").insertOne({
      title,
      expireAt: expireDate,
    });

    res.sendStatus(201);
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function pollGet(req, res) {
  try {
    const polls = await db.collection("polls").find({}).toArray();

    res.status(200).send(polls);
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function pollChoiceGet(req, res) {
  const { id } = req.params;
  try {
    const pollExist = await db
      .collection("polls")
      .findOne({ _id: new ObjectId(id) });

    if (!pollExist) return res.status(404).send("Enquete não existe");

    const choices = await db
      .collection("choices")
      .find({ pollId: new ObjectId(id) })
      .toArray();

    res.status(200).send(choices);
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function pollResultGet(req, res) {
  const { id } = req.params;

  try {
    const result = {
      title: "Nenhuma das Opção foi a mais votada",
      votes: 0,
    };

    const pollExist = await db
      .collection("polls")
      .findOne({ _id: new ObjectId(id) });

    if (!pollExist) return res.status(404).send("Enquete não existe");

    const choiceExist = await db
      .collection("choices")
      .find({ pollId: new ObjectId(id) })
      .toArray();

    for (let choice of choiceExist) {
      const vote = await db
        .collection("votes")
        .countDocuments({ choiceId: new ObjectId(choice._id) });

      if (vote > result.votes) {
        result.title = choice.title;
        result.votes = vote;
      }
    }

    const information = {
      _id: id,
      title: pollExist.title,
      expireAt: pollExist.expireAt,
      result,
    };

    res.status(200).send(information);
  } catch (error) {
    res.status(500).send(error);
  }
}
