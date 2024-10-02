import multer from 'multer'
import path from 'path'
import fs from 'fs'

const storage = multer.diskStorage({
  destination: (req: Express.Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {
    let uploadFolder = '';

    if (file.fieldname === 'cv') {
      uploadFolder = 'uploads/cvs';
    } else if (file.fieldname === 'image') {
      uploadFolder = 'uploads/category-images';
    }

    if (!fs.existsSync(uploadFolder)) {
      fs.mkdirSync(uploadFolder, { recursive: true });
    }

    cb(null, uploadFolder);
  },
  filename: (req: Express.Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req: Express.Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  if (file.fieldname === 'cv' && file.mimetype === 'application/pdf') {
    cb(null, true);  
  } else if (file.fieldname === 'image' && (file.mimetype.startsWith('image/'))) {
    cb(null, true); 
  } else {
    cb(new Error('Invalid file type! Only PDFs for CVs and images for category are allowed.'));
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 5 
  }
});

export default upload;
