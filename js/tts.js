addEventListener('load', function() {
	if ('speechSynthesis' in window) with(speechSynthesis) {
		const playEle = document.querySelector('#play');
		const pauseEle = document.querySelector('#pause');
		const stopEle = document.querySelector('#stop');
		const ps = this.document.querySelectorAll('p');
		const voz = 1;
		
		mensaje = new SpeechSynthesisUtterance(document.querySelector('.cuerpo').textContent);
		mensaje.voice = getVoices()[voz];
		//mensaje.volume = 1.2;
		mensaje.rate = 1.115; //2589
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
					mensaje = new SpeechSynthesisUtterance(document.querySelector('.cuerpo').textContent);
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

		function setVoz() {
			mensaje.voice = getVoices()[voz];
			console.log(getVoices());
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
