import multer from "multer";

// Define storage for uploaded files
const storage = multer.memoryStorage()
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/");
//   },
//   filename: (req, file, cb) => {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(
//       null,
//       file.fieldname +
//         "-" +
//         uniqueSuffix +
//         "." +
//         file.originalname.split(".").pop()
//     );
//   },
// });

// Create instance of Multer with storage configuration
const documents = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 },
  fileFilter: (req, file, cb) => {
    // Allow only PDF, DOCX, and DOC file types
    if (
      file.mimetype === "application/pdf" ||
      file.mimetype ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      file.mimetype === "application/msword"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      req.res
        .status(400)
        .json({
          message:
            "Unsupported file type. Only PDF, DOCX, and DOC files are allowed.",
        });
      // return cb(new Error("Only PDF, DOCX and DOC file types are allowed!"));
      return;
    }
  },
});

export default documents;
