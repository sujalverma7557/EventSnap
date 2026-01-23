 import bcrypt from "bcrypt";
 const users = [
    {
        
        name: 'Shashwat Kumar Gautam',
        occupation: 'Student',
        email:'abc@example.com',
        image: 'shashwatImage.jpg',
        image_hash:'L79%efIC0KNGIAxuIWoz0fR*}[V[',
        contact_no: '8800353648',
        about: 'hello',
        password: bcrypt.hashSync('123456', 10),
    },
    {
        
        name: 'Jerald Kennath',
        email:'jerry@example.com',
        occupation: 'Student',
        image: 'IMG_2946.jpg',
        image_hash:'LWH27~?I.AWAksM_f5t7Net8VrWA',
        contact_no: '8800353648',
        about: 'hello boiz',
        password: bcrypt.hashSync('123456', 10),
    },
    {
        
        name: 'Pulkit Gupta',
        email:'pulkit@example.com',
        occupation: 'Student',
        image: 'DSCF8879.jpg',
        image_hash:'LPH2c*NF?^xuEcE1M{IoM{9FMwWA',
        contact_no: '8800353648',
        about: 'Khamma Khadi Bhai sa',
        password: bcrypt.hashSync('123456', 10),
    }
 ]


 export default users