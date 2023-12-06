const multer = require("multer");

//TIPOS DE ARQUIVOS PERMITIDOS
const fileFilter = (req, file, cb) => {
    file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' ? cb(null, true) : cb(null, false);
};

//DEFINIÇÃO DE USO DO MULTER 
const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024
    },
    fileFilter: fileFilter,
});

module.exports = upload;