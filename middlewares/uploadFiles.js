import multer, { diskStorage } from "multer";
import { extname } from "path";

const uploadFiles = (storageLocation) => {
  const fileStorage = diskStorage({
    destination: (req, file, cb) => {
      cb(null, storageLocation);
    },
    filename: (req, file, cb) => {
      cb(null, `${file.fieldname}_${Date.now()}${extname(file.originalname)}`);
    },
  });

  return multer({ storage: fileStorage }).array("files");
};

const dynamicFileUpload = (storageLocation) => {
  const upload = uploadFiles(storageLocation);

  return (req, res, next) => {
    upload(req, res, (err) => {
      if (err) {
        if (err?.field !== "files") {
          return res.status(400).send({
            error: `No files uploaded. If you uploaded a file please rename it to files from ${err.field}`,
          });
        }
        return res.status(500).send({ error: err });
      }
      if (req.files && Array.isArray(req.files)) {
        req.files = req.files.map((file) => ({
          ...file,
          file: `/${`${storageLocation}/${file.filename}`.replace(
            /^Images\//,
            ""
          )}`,
        }));
      }
      next();
    });
  };
};

export default dynamicFileUpload;
