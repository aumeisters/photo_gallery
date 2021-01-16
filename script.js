let screenHeight = window.innerHeight,
	screenWidth = window.innerWidth;
// screen size schange on resize
window.addEventListener('resize', () => {
	screenHeight = window.innerHeight;
	screenWidth = window.innerWidth;
});	
// open picture view (slideShow) sea pictures, wood pictures gallery if screen is big enought
if (screenWidth > 1150) {
	slideShow('.gallery_sea img');
	slideShow('.gallery_wood img');
}
// side whitespace colorchange by scrolling
document.addEventListener('scroll', () => {
	// top is scrool distance from the top
	let top = window.pageYOffset || document.documentElement.scrollTop;
	// header height
	let headerHeight = document.querySelector('header').scrollHeight;
	// colorchange considering wide screens
	if (screenWidth > 1150) {	
		if (top < headerHeight) {
	      document.querySelector('body').style.backgroundColor = '#faffff';
		} else if (top > headerHeight && top < (headerHeight * 1.45)) {
	      document.querySelector('body').style.backgroundColor = '#ebf5f5';
	      document.querySelector('.gallery_sea .gallery_name').style.color = '#3D587D';
	    } else if (top > (headerHeight * 1.45)) {
	      document.querySelector('body').style.backgroundColor = '#ecf5e4';
	      document.querySelector('.gallery_wood .gallery_name').style.color = '#5f8c5d';
	    };
	// medium screens
	} else if (screenWidth < 1150 && screenWidth > 730) {
		if (top < (headerHeight * 0.7)) {
	      document.querySelector('body').style.backgroundColor = '#faffff';
		} else if (top > (headerHeight * 0.7) && top < (headerHeight * 4.5)) {
	      document.querySelector('body').style.backgroundColor = '#ebf5f5';
	      document.querySelector('.gallery_sea .gallery_name').style.color = '#3D587D';
	    } else if (top > (headerHeight * 4.5)) {
	      document.querySelector('body').style.backgroundColor = '#ecf5e4';
	      document.querySelector('.gallery_wood .gallery_name').style.color = '#5f8c5d';
	    };
	// small screens
	} else {
		if (top < (headerHeight * 0.7)) {
	      document.querySelector('body').style.backgroundColor = '#faffff';
		} else if (top > (headerHeight * 0.7) && top < (headerHeight * 2)) {
	      document.querySelector('body').style.backgroundColor = '#ebf5f5';
	      document.querySelector('.gallery_sea .gallery_name').style.color = '#3D587D';
	    } else if (top > (headerHeight * 2)) {
	      document.querySelector('body').style.backgroundColor = '#ecf5e4';
	      document.querySelector('.gallery_wood .gallery_name').style.color = '#5f8c5d';
	    };
	}
});
// slideShow function
function slideShow(gallerySelector) {
		let pictures = document.querySelectorAll(`${gallerySelector}`);
		pictures.forEach( e => {
			e.addEventListener('click', e => {
				document.querySelector('.photo_view').style.display = 'block';
				document.querySelector('.photo_menu').style.display = 'flex';
				let fullSizeSource = e.target.dataset.original;
				let previewSizeSource = e.target.dataset.preview;
				document.querySelector('.photo_menu_view').style.backgroundImage = `url(${previewSizeSource})`;
				let sourceArrayMid = [];
				let sourceArrayOrig = [];
				pictures.forEach(e => {
					sourceArrayMid.push(e.attributes[2].textContent);
				});
				pictures.forEach(e => {
					sourceArrayOrig.push(e.attributes[1].textContent);
				});
				let pictureIndex = sourceArrayMid.indexOf(previewSizeSource);
				// download button in photo view options so that when we open an image href is filled
				function fillImagesHref() {
					document.querySelector('.photo_menu_options a').href = `${sourceArrayOrig[pictureIndex]}`;
				}
				fillImagesHref();
				// slideshow left button swith on click
				document.querySelector('.photo_menu_left_button').addEventListener('click', () => {
					pictureIndex--;
					if (pictureIndex == -1) {
						pictureIndex = (sourceArrayMid.length - 1);
					};
					document.querySelector('.photo_menu_view').style.backgroundImage = `url(${sourceArrayMid[pictureIndex]})`;
					fillImagesHref()
				});
				// slideshow right button swith on click
				document.querySelector('.photo_menu_right_button').addEventListener('click', () => {
					pictureIndex++;
					if (pictureIndex == (sourceArrayMid.length)) {
						pictureIndex = 0;
					}
					document.querySelector('.photo_menu_view').style.backgroundImage = `url(${sourceArrayMid[pictureIndex]})`;
					fillImagesHref()
				});
				// slideshow swith on arrows
				document.addEventListener('keydown', (e) => {
					if (e.key == "ArrowLeft") {
						pictureIndex--;
						if (pictureIndex == -1) {
							pictureIndex = (sourceArrayMid.length - 1);
						}
						document.querySelector('.photo_menu_view').style.backgroundImage = `url(${sourceArrayMid[pictureIndex]})`;
					} else if (e.key == "ArrowRight") {
						pictureIndex++;
						if (pictureIndex == (sourceArrayMid.length)) {
							pictureIndex = 0;
						}
						document.querySelector('.photo_menu_view').style.backgroundImage = `url(${sourceArrayMid[pictureIndex]})`;
					};
					fillImagesHref()
				});
				// open in a full size button in photo view options
				document.querySelector('.photo_menu_options_openFullsize svg').addEventListener('click', () => {
					let URL = window.location.href;
					openFullPicture(`${URL}/${sourceArrayOrig[pictureIndex]}`)
				});
			});
		});
};
// close photo view (slideShow)
document.querySelector('.photo_menu_options_close svg').addEventListener('click', () => {
	document.querySelector('.photo_view').style.display = 'none';
	document.querySelector('.photo_menu').style.display = 'none';
});
document.querySelector('.photo_view').addEventListener('click', () => {
	document.querySelector('.photo_view').style.display = 'none';
	document.querySelector('.photo_menu').style.display = 'none';
});
// fucntion that opens new window with full size image
function openFullPicture(url) {
  let win = window.open(url, '_blank');
  win.focus();
}

// switch to english version
document.querySelector('.buttons_english_version').addEventListener('click', () => {
	document.querySelector('header h1').innerHTML = `Hi! My name is Andrejs and I'm from St.Petersburg <br>
	I shoot cold northern nature <br>
	Welcome to my gallery`;
	document.querySelector('.social_network_icon_instagram').title = `Instagram`;
	document.querySelector('.social_network_icon_email').title = `Write an email`;
	document.querySelector('.social_network_icon_facebook').title = `Facebook`;
	document.querySelector('.gallery_sea .gallery_name').innerHTML = `Sea theme`;
	document.querySelector('.gallery_wood .gallery_name').innerHTML = `Woods theme`;
	document.querySelector('.buttons_english_version').innerHTML = `RUS`;
	document.querySelector('.buttons_english_version').addEventListener('click', () => {
		location.reload();	
	});
})

// OLD Versions of slideshow
/*
let sea_pictures = document.querySelectorAll('.gallery_sea img');
sea_pictures.forEach( e => {
	e.addEventListener('click', e => {
		document.querySelector('.photo_view').style.display = 'block';
		document.querySelector('.photo_menu').style.display = 'flex';
		let previewSizeSource = e.target.dataset.original;
		document.querySelector('.photo_view_photo').style.backgroundImage = `url(${previewSizeSource})`;
		let sourceArrayMi = [];
		sea_pictures.forEach(e => {
			sourceArrayMid.push(e.attributes[1].textContent);
		});
		let pictureIndex = sourceArrayMi.indexOf(previewSizeSource);
		document.querySelector('.left-button').addEventListener('click', () => {
			pictureIndex--;
			if (pictureIndex == -1) {
				pictureIndex = (sourceArrayMid
.length - 1);
			};
			document.querySelector('.photo_view_photo').style.backgroundImage = `url(${sourceArrayMid[pictureIndex]})`;
		});
		document.querySelector('.right-button').addEventListener('click', () => {
			pictureIndex++;
			if (pictureIndex == (sourceArrayMid.length)) {
				pictureIndex = 0;
			}
			document.querySelector('.photo_view_photo').style.backgroundImage = `url(${sourceArrayMid[pictureIndex]})`;
		});
		document.addEventListener('keydown', (e) => {
			if (e.key == "ArrowLeft") {
				pictureIndex--;
				if (pictureIndex == -1) {
					pictureIndex = (sourceArrayMid
	.length - 1);
				}
				document.querySelector('.photo_view_photo').style.backgroundImage = `url(${sourceArrayMid
[pictureIndex]})`;
			} else if (e.key == "ArrowRight") {
				pictureIndex++;
				if (pictureIndex == (sourceArrayMid
.length)) {
					pictureIndex = 0;
				}
				document.querySelector('.photo_view_photo').style.backgroundImage = `url(${sourceArrayMid
[pictureIndex]})`;
			};
		});

	});
});
let wood_pictures = document.querySelectorAll('.gallery_wood img');
wood_pictures.forEach( e => {
	e.addEventListener('click', e => {
		document.querySelector('.photo_view').style.display = 'block';
		document.querySelector('.photo_menu').style.display = 'flex';
		let previewSizeSource = e.target.dataset.original;
		document.querySelector('.photo_view_photo').style.backgroundImage = `url(${previewSizeSource})`;
		let sourceArrayMi = [];
		wood_pictures.forEach(e => {
			sourceArrayMid.push(e.attributes[1].textContent);
		});
		let pictureIndex = sourceArrayMi.indexOf(previewSizeSource);
		document.querySelector('.left-button').addEventListener('click', () => {
			pictureIndex--;
			if (pictureIndex == -1) {
				pictureIndex = (sourceArrayMid
.length - 1);
			};
			document.querySelector('.photo_view_photo').style.backgroundImage = `url(${sourceArrayMid[pictureIndex]})`;
		});
		document.querySelector('.right-button').addEventListener('click', () => {
			pictureIndex++;
			if (pictureIndex == (sourceArrayMid.length)) {
				pictureIndex = 0;
			}
			document.querySelector('.photo_view_photo').style.backgroundImage = `url(${sourceArrayMid[pictureIndex]})`;
		});
		document.addEventListener('keydown', (e) => {
			if (e.key == "ArrowLeft") {
				pictureIndex--;
				if (pictureIndex == -1) {
					pictureIndex = (sourceArrayMid
	.length - 1);
				}
				document.querySelector('.photo_view_photo').style.backgroundImage = `url(${sourceArrayMid
[pictureIndex]})`;
			} else if (e.key == "ArrowRight") {
				pictureIndex++;
				if (pictureIndex == (sourceArrayMid
.length)) {
					pictureIndex = 0;
				}
				document.querySelector('.photo_view_photo').style.backgroundImage = `url(${sourceArrayMid
[pictureIndex]})`;
			};
		});
	});
});
*/
