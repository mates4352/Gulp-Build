import fs from 'fs';

const cb = () => {}
const PATH_FONTS_STYLE = 'src/scss/base/_fonts.scss'
const PATH__FONTS = 'src/assets/fonts'

const fontsFile = (params) => {

   const file_content = fs.readFileSync(PATH_FONTS_STYLE);
   if (file_content == '' || file_content == false) {
      fs.writeFile(PATH_FONTS_STYLE, '', cb);
      return fs.readdir(PATH__FONTS, function (err, items) {
         if (items) {
            let c_fontname;
            for (let i = 0; i < items.length; i++) {
               let fontname = items[i].split('.');
               fontname = fontname[0];
               if (c_fontname != fontname) {
                  fs.appendFile(PATH_FONTS_STYLE, `@include font-face( '${fontname}', '${fontname}' , '400', 'normal');\r\n`, cb);
               }
               c_fontname = fontname;
            }
         }
      },params())
   }
   params();

}

export default fontsFile