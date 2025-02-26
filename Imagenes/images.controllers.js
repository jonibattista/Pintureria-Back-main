import multer from "multer";
import path from "path";


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // Carpeta donde se guardarán las imágenes
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Renombra el archivo con la fecha actual
    },
});

export const upload = multer({ storage }); //crea una instancia de multer pasandole la configuarion anterior

export const uploadImg = (req, res) => {
    try {
      if (!req.body) {
          return res.status(400).json({ message: "No se subió ninguna imagen" });
      }
      res.status(200).json({ message: "Imagen subida con éxito", file: req.file.filename });
    } catch (error) {
        return res.status(500).json({ message: "No se subió ninguna imagen", error });
    }
    
    
}