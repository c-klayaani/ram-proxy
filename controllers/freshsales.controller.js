import api from "../api/apiIndex.js";

const freshsalesController = {
  upsertContact: async (req, res) => {
    if (!req.body || !req.body["unique_identifier"] || !req.body.contact)
      res.status(400).json({ message: "Unprocessable Entity" });

    const contactInfo = req.body;
    console.log(contactInfo);

    try {
      console.log(api.defaults.headers.common.Authorization);
      const response = await api.post("/contacts/upsert", req.body);
      console.log(response);
      res.status(200).json(response.data);
      // json({ message: "info received" });
    } catch (error) {
      console.error(error);
      res.status(500).json(error);
    }
  },

  addContactToListById: async (req, res) => {
    console.log(req.body);
    if (!req.body || !req.body.listId || !req.body.contactId) {
      res.status(400).json({ message: "Unprocessable Entity" });
      return;
    }

    try {
      const response = await api.put(`/lists/${req.body.listId}/add_contacts`, {
        ids: [req.body.contactId],
      });

      res.status(200).json(response.data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Error", data: error });
    }
  },
};

export default freshsalesController;