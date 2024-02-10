import multer from "multer";
import { format } from "date-fns";

const storageconfig = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./uploads')
    },
    filename:(req,file,cb)=>{
        const formatedate = format(new Date(), "yyyy-MM-dd_HH-mm-ss");
        const name = formatedate+ '-' +file.originalname;
        cb(null,name);
    },
});

export const upload = multer({storage:storageconfig})