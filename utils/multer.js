import multer from 'multer';
import {fileURLToPath} from 'url'
import path from 'path'

const __filename=fileURLToPath(import.meta.url);
const __dirname=path.dirname(__filename);

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,path.join(__dirname,'../uploads/resumes'))
    },
    filename:(req,file,cb)=>{
        const uniquSuffix=Date.now()+'-'+Math.round(
            Math.random()*1e9
        )
        cb(null,file.originalname+'-'+uniquSuffix)
    }
})

const upload=multer({
    storage,
    limits:{fileSize:5*1024*1024}
});

export default upload