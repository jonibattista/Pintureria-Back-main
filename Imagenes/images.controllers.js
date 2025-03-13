import multer from "multer";
import path from "path";

//Crea funcion storage para definir las configuraciones de multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // Carpeta donde se guardarán las imágenes
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "_" + file.originalname); 
    }, // Renombra el archivo con la fecha actual y el nombre original
});

 // Acepta solo archivos de imagen
 const fileFilter = (req, file, cb) => {
     const ext = path.extname(file.originalname).toLowerCase();
     if (ext === ".jpg" || ext === ".jpeg" || ext === ".png" || ext === ".gif") {
         cb(null, true);
     } else {
         cb(new Error("Tipo de archivo no permitido"), false);
     }
 };


//crea una instancia de multer pasandole la configuarion anterior
export const upload = multer({ storage }); 

export const uploadImg = (req, res) => {
    try {
      if (!req.body) {
          return res.status(400).json({ message: "No se subió ninguna imagen" });
      }
      res.status(200).json({ message: "Imagen subida con éxito", file: req.file.filename });
    } catch (error) {
        return res.status(500).json({ message: "Error al subir imagen" });
    } 
}