// controllers/contactsController.js

const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res, next) => {
  try {
    const result = await mongodb.getDb().db().collection("contacts").find();
    const lists = await result.toArray();
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(lists);
  } catch (error) {
    console.error("Error fetching contacts:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getSingle = async (req, res, next) => {
  try {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db()
      .collection("contacts")
      .find({ _id: userId });
    const lists = await result.toArray();
    if (lists.length === 0) {
      return res.status(404).json({ error: "Contact not found" });
    }
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(lists[0]);
  } catch (error) {
    console.error("Error fetching single contact:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const create = async (req, res, next) => {
  try {
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // Insert new contact into MongoDB collection
    const result = await mongodb
      .getDb()
      .db()
      .collection("contacts")
      .insertOne({ firstName, lastName, email, favoriteColor, birthday });

    // Return the new contact ID in the response body
    res.status(201).json({ id: result.insertedId });
  } catch (error) {
    console.error("Error creating contact:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const update = async (req, res, next) => {
  try {
    const contactId = new ObjectId(req.params.id);
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // Update contact in MongoDB collection
    const result = await mongodb
      .getDb()
      .db()
      .collection("contacts")
      .updateOne(
        { _id: contactId },
        { $set: { firstName, lastName, email, favoriteColor, birthday } },
      );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ error: "Contact not found" });
    }

    res.status(204).end(); // No content to send back
  } catch (error) {
    console.error("Error updating contact:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteContact = async (req, res, next) => {
  try {
    const contactId = new ObjectId(req.params.id);

    // Delete contact from MongoDB collection
    const result = await mongodb
      .getDb()
      .db()
      .collection("contacts")
      .deleteOne({ _id: contactId });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Contact not found" });
    }

    res.status(200).end(); // No content to send back
  } catch (error) {
    console.error("Error deleting contact:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { getAll, getSingle, create, update, deleteContact };
