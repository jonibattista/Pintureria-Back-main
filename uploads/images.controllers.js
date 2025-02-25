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

const upload = multer({ storage }); //crea una instancia de multer pasandole la configuarion anterior

export const uploadImg =("/upload", upload.single("imagen"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "No se subió ninguna imagen" });
    }
    
    res.json({ message: "Imagen subida con éxito", file: req.file.filename });
});