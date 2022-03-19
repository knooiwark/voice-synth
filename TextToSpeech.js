


const msg = new SpeechSynthesisUtterance();
var voices = [];

var voicesDropdown = document.querySelector('[name="voice"]');
var options = document.querySelectorAll('[type="range"], [name="text"]');
var speakButton = document.getElementById('speak');
var stopButton = document.getElementById('stop');
var saveButton = document.getElementById('save');

msg.txt = document.querySelector('[name="text"]').value;

function retrieveVoicesFromBrowser(){
  voices = this.getVoices();
  voicesDropdown.innerHTML = voices
    .map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`)
    .join('');
}

function setVoice(){
  msg.voice = voices.find(voice => voice.name === this.value);
  toggle();
}

function toggle(startOver = true){
  speechSynthesis.cancel();

  if(startOver){
    speechSynthesis.speak(msg);
  }
}

function setOption(){

  msg[this.name] = this.value;
  toggle();
}

speechSynthesis.addEventListener('voiceschanged', retrieveVoicesFromBrowser);
voicesDropdown.addEventListener('change', setVoice);
options.forEach(option => option.addEventListener('change', setOption));
speakButton.addEventListener('click', toggle);
stopButton.addEventListener('click', () => toggle(false)) ;
