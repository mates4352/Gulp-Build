"use strict"
//- Плагины -//
const { src, dest } = require("gulp")                         //                                                                                                    Документация => https://gulpjs.com/docs/en/api/src , https://gulpjs.com/docs/en/api/dest
const gulp          = require("gulp")                         // Cборщик проектов позволяет собирать проект из разных плагинов                                      Документация => https://gulpjs.com документация на русском https://webdesign-master.ru/blog/docs/gulp-documentation.html
// html 
const htmlmin       = require('gulp-htmlmin')
const pug           = require("gulp-pug")                     // Шаблонизатор Pug                                                                                   Документация => https://gist.github.com/neretin-trike/53aff5afb76153f050c958b82abd9228
// css
const autoprefixer  = require("gulp-autoprefixer")            // Позволяет при компиляции добавлять префиксы.                                                       Документация => https://github.com/postcss/autoprefixer
const cleanСss      = require('gulp-clean-css')               // Позволяет гибко настраивать вывод css.                                                             Документация => https://github.com/jakubpawlowicz/clean-css#formatting-options
const media         = require("gulp-group-css-media-queries") // Позволяет собирать все медиа с одинаковым условием в один media запрос.                            Документация => https://github.com/Se7enSky/group-css-media-queries#readme
const less = require("gulp-less")                             // Позволяет при компилировать из less формата в css.                                                 Документация => https://github.com/gulp-community/gulp-less#readme
const scss = require("gulp-sass")                             // Позволяет при компилировать из scss формата в css.                                                 Документация => https://github.com/dlmanning/gulp-sass#readme
const preprocessor = 'less'                                   // Позволяет выбирать какой препроцессор будем использовать, мы передаем значение название плагина которых хотим использовать а не саму функцию это очень фажно в дальньшем вы сами увидите почему 
// js
const rigger        = require("gulp-rigger")                  // Позволяет созавать компоненты js и собирать их в один документ.                                    Документация => https://github.com/kuzyk/gulp-rigger#readme 
const uglify        = require("gulp-uglify")                  // Позволяет минифицировать js файл.                                                                  Документация => https://www.npmjs.com/package/gulp-uglify
// image
const imagemin      = require("gulp-imagemin")                // Позволяет сжимать и оптимизировать изображение.                                                    Документация => https://github.com/sindresorhus/gulp-imagemin#readme
const webpHtml      = require("gulp-webp-html")               // Позволяет подключать img тег , а плагин будет дополнительно подключать формат wemp.                Документация => https://www.npmjs.com/package/gulp-webp-html
const webpcss       = require("gulp-webp-css")                // Позволяет подключать изображение через css, а плагин будет дополнительно подключать формат wemp.   Документация => https://www.npmjs.com/package/gulp-webp-css
const webp          = require("gulp-webp")                    // Позволяет преобразовать изображение в формат webp.                                                 Документация => https://www.npmjs.com/package/gulp-webp
const newer         = require('gulp-newer')                   // Позволяет нам проверять изображения на наличие уже оптимизовнных и не оптимизировать их заново     Документация => https://www.npmjs.com/package/gulp-newer
// common
const browsersync   = require("browser-sync").create()        // Позволяет создавать локальный сервер для вашей работы.                                             Документация => https://browsersync.io/
const plumber       = require("gulp-plumber")                 // Позволяет выводить ошибки тасок.                                                                   Документация => https://www.npmjs.com/package/gulp-plumber
const rename        = require("gulp-rename")                  // Позволяет изменять имя файлы , добавлять новый суффикс или новый формат.                           Документация => https://www.npmjs.com/package/gulp-rename
const del           = require("del")                          // Позволяет удалить файлы в зависимости от от рпасположения пути.                                    Документация => https://www.npmjs.com/package/del
//- Cоздание путей -//
//Создаем переменную ей указываем объекты в которых будем хранить пути к нашим форматам пути зависят от структуры наших папок 
var path = {
	build: {
		html: "dist/",
		js: "dist/js/",
		css: "dist/css/",
		images: "dist/assets/images",
		fonts: "dist/assets/fonts",
	},
	src: {
		html: "src/*.pug",
		js: "src/js/*.js",
		style: "src/main/"+preprocessor+"/index."+preprocessor+"",     // Мы в пути пишем название переменной которая хранит название в строчном типе. Если бы мы указали бы просто ссылку на функцию то была бы сдесь ошибка 
		images: "src/assets/images/**/*.{jpg,png,svg,gif,ico,webp}",
		fonts: "src/assets/fonts/*.{ttf,eot,svg,woff}",
	},
	watch: {
		html: "src/**/*.pug",
		js: "src/js/**/*.js",
		style: "src/main/less/**/*.less",
		images: "src/assets/images/**/*.{jpg,png,svg,gif,ico,webp}",
	},
	clean: "./dist"
}
// Создание тасок сдесь сиснтаксис объевления зависит от gulp как вы будете обьявлять зависит от вас в данном примере gulp 5 //

function browserSync(done) {
	browsersync.init({
		server: {
			baseDir: "dist"
		},
		port: 3000,
		notify: false
	});
}

function browserSyncReload(done) {
	browsersync.reload();
}
//----HTML----//

function html() {
	return src(path.src.html)
		.pipe(plumber())
		.pipe(pug({
			pretty: true
		}))
		.pipe(webpHtml())
		.pipe(dest(path.build.html))
		.pipe(htmlmin({
			collapseWhitespace: true,
			removeComments: true,
		}))
		.pipe(rename({
			suffix: ".min",
			extname: ".html"
		}))
		.pipe(dest(path.build.html))
		.pipe(browsersync.stream(browserSyncReload()))
}
//----CSS----//

function css() {
	return src(path.src.style)
		.pipe(plumber())
		.pipe(eval(preprocessor)())    // функция eval() нам помогает преобрзовать строчный тип в функцию тоесть убрать ковычки чтоб pipe смог нормально прочитать значение было так "less"(название плагина)=>less сам плагин
		.pipe(autoprefixer({
			overrideBrowserslist: ['last 8 versions'],
			cascade: true
		}))
		.pipe(cleanСss({
			format: 'beautify',
			level: { specialComments: true }

		}))
		.pipe(media())
		.pipe(webpcss())
		.pipe(dest(path.build.css))
		.pipe(cleanСss({
			level: { 1: { specialComments: 0 } }
		}))
		.pipe(rename({
			suffix: ".min",
			extname: ".css"
		}))
		.pipe(dest(path.build.css))
		.pipe(browsersync.stream(browserSyncReload()))
}
//----JS----//

function js() {
	return src(path.src.js)
		.pipe(plumber())
		.pipe(rigger())
		.pipe(dest(path.build.js))
		.pipe(uglify())
		.pipe(rename({
			suffix: ".min",
			extname: ".js"
		}))
		.pipe(dest(path.build.js))
		.pipe(browsersync.stream(browserSyncReload()))
}
//----IMG----//

function images() {
	return src(path.src.images)
		.pipe(newer(path.build.images))
		.pipe(webp({
			quality: 70
		}))
		.pipe(dest(path.build.images))
		.pipe(src(path.src.images))
		.pipe(imagemin({
			progressive: true,
			svgoPlugins: [{ removeViewBox: false }],
			interlaced: true,
			optimizationLevel: 5  // max 7
		}))
		.pipe(dest(path.build.images))
		.pipe(browsersync.stream(browserSyncReload()))
}
//----FONTS----//

function fonts() {
	return src(path.src.fonts)
		.pipe(dest(path.build.fonts))
}
//----CLEAN----//

function clean() {
	return del(path.clean)
}
//gulp.watch - функуия gulp, позволяет нам следить за изменениями файлов в которых указан путь, в качестве 2 параметра записывается имя такски которую нужно использовать при изменение этого файла//

function watchFiles() {
	gulp.watch([path.watch.html], html,)
	gulp.watch([path.watch.style], css)
	gulp.watch([path.watch.js], js)
	gulp.watch([path.watch.images], images)
}
//Создаем переменную в которую будем включать все интсрукции которые мы сделали выше gulp.series - позволяет запустить таски по порядку gulp.parallel паралейно другим таскам // Документация => https://gulpjs.com/docs/en/api/concepts
const build = gulp.series(clean, gulp.parallel(html, css, js, images, fonts));
const watch = gulp.parallel(build, browserSync, watchFiles);

//Подключение наших функций(тасок) к gulp чтоб он мог их понять 
exports.fonts = fonts
exports.html = html
exports.css = css
exports.js = js
exports.images = images
exports.clean = clean
exports.build = build;
exports.watch = watch;
exports.default = watch;