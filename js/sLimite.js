addEventListener('load', function() {
	if ('speechSynthesis' in window) with(speechSynthesis) {
		const playEle = document.querySelector('#play');
		const pauseEle = document.querySelector('#pause');
		const stopEle = document.querySelector('#stop');
		const ps = this.document.querySelectorAll('p');
		const voz = 24;
		const nParrafos = 500;
        let ttsElement = document.createElement("DIV");
        document.querySelector('body').insertBefore(ttsElement,document.querySelector('.cuerpo'))
		
		let range = prevRange(document.querySelector('.cuerpo').children[nParrafos], document.querySelector('.cuerpo').children[0]);
		for (let len = 0; len <= range.length - 1; len++) {
            let tmp = range[len].cloneNode(true);
            ttsElement.insertBefore(tmp, ttsElement.firstChild);
        }

		mensaje = new SpeechSynthesisUtterance(ttsElement.innerText);
        ttsElement.innerHTML = "";
		mensaje.voice = getVoices()[voz];
		//mensaje.volume = 1.2;
		mensaje.rate = 1.115; //.2589
		//mensaje.pitch = 0.5;
		mensaje.onend = function() {
			if(!speaking) {
				playEle.classList.remove('played');
				stopEle.classList.add('stopped');
			}
		}

		if (onvoiceschanged !== undefined) {
			onvoiceschanged = setVoz;
		}

		cancel(mensaje);

		playEle.addEventListener('click', onClickPlay);
		pauseEle.addEventListener('click', onClickPause);
		stopEle.addEventListener('click', onClickStop);
		
		ps.forEach((d, pos) => {
			d.addEventListener('dblclick', function(e) {
				let target = e.target;
				if(e.target.tagName != "P") target = e.target.parentNode;
				if(confirm("Se eliminaran los anteriores párrafos!")) {
					while (target.previousElementSibling) {
						target.parentNode.firstElementChild.remove();
					}
                    ttsElement.innerHTML = "";
					let range = prevRange(document.querySelector('.cuerpo').children[nParrafos], document.querySelector('.cuerpo').children[0]);
					for (let len = 0; len <= range.length - 1; len++) {
						let tmp = range[len].cloneNode(true)
						ttsElement.insertBefore(tmp, ttsElement.firstChild);
					}
					mensaje = new SpeechSynthesisUtterance(ttsElement.innerText);
                    ttsElement.innerHTML = "";
					mensaje.rate = 1.115;
					setVoz();
					cancel(mensaje);
					speak(mensaje);
					playEle.classList.add('played');
					pauseEle.classList.remove('paused');
					stopEle.classList.remove('stopped');
				}
			}, true);
		});

		function prevRange(element, prevTill) {
			let result = [element];
		  
			while (element && element !== prevTill) {
			  element = element.previousElementSibling;
			  result.push(element);
			}
		  
			return result;
		}

		function setVoz() {
			mensaje.voice = getVoices()[voz];
			console.log(getVoices());
			console.log(getVoices()[voz]);
		}

		function onClickPlay() {
			playEle.classList.add('played');
			if (paused) {
				pauseEle.classList.remove('paused');
				resume(mensaje);
				return;
			}
			stopEle.classList.remove('stopped');
			speak(mensaje);
			
		}

		function onClickPause() {
			if (speaking) {
				pauseEle.classList.add('paused');
				playEle.classList.remove('played');
				stopEle.classList.remove('stopped');
				pause(mensaje);
			}
		}
		
		function onClickStop() {
			if (paused) resume(mensaje);
			stopEle.classList.add('stopped');
			pauseEle.classList.remove('paused');
			playEle.classList.remove('played');
			cancel(mensaje);
		}
	}
});

// window.addEventListener('click', function (evt) {
//     if (evt.detail === 3) {
//         alert('triple click!');
//     }
// });
