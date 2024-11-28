import api from "../api/apiIndex.js";

const freshsalesController = {
  upsertContact: async (req, res) => {
    if (!req.body || !req.body["unique_identifier"] || !req.body.contact)
      res.status(400).json({ message: "Unprocessable Entity" });

    try {
      const response = await api.post("/contacts/upsert", req.body);
      res.status(200).json(response.data);
      // json({ message: "info received" });
    } catch (error) {
      res.status(500).json(error);
    }
  },

  addContactToListById: async (req, res) => {
    if (!req.body || !req.body.listId || !req.body.contactId)
      return res.status(400).json({ message: "Unprocessable Entity" });

    try {
      const response = await api.put(`/lists/${req.body.listId}/add_contacts`, {
        ids: [req.body.contactId],
      });

      res.status(200).json(response.data);
    } catch (error) {
      res.status(500).json({ message: "Internal Error", data: error });
    }
  },

  uploadDocument: async (req, res) => {
    if (!req.file)
      return res.status(400).json({ message: "No file uploaded!" });
    if (!req.body["targetable_id"])
      return res.status(400).json({ message: "Contact Id is Required!" });

    try {
      const file = new File([req.file.buffer], req.file.originalname, {
        type: req.file.mimeType,
      });

      const formData = new FormData();

      formData.append("file", file);
      formData.append("file_name", req.file.originalname);
      formData.append("is_shared", "true");
      formData.append("targetable_id", req.body["targetable_id"]);
      formData.append("targetable_type", "Contact");
      const response = await api.post("/documents", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      res.status(200).json(response.data);
    } catch (error) {
      console.error(error);
      res.status(500).json(error);
    }
  },
};

export default freshsalesController;
