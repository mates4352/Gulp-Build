import fs from 'fs';
import config from '../config';

const cb = () => {}

const fontsFile = (params) => {

   const file_content = fs.readFileSync(config.src.fontsFile);
   if (file_content == '' || file_content == false) {
      fs.writeFile(config.src.fontsFile, '', cb);
      return fs.readdir(config.src.fontsPath, function (err, items) {
         if (items) {
            let c_fontname;
            for (let i = 0; i < items.length; i++) {
               let fontname = items[i].split('.');
               fontname = fontname[0];
               if (c_fontname != fontname) {
                  fs.appendFile(config.src.fontsFile, `@include font-face( '${fontname}', '${fontname}' , '400', 'normal');\r\n`, cb);
               }
               c_fontname = fontname;
            }
         }
      },params())
   }
   params();

}

export default fontsFile