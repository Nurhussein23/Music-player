import Playlist from './playlist.js'


const PlayInfo = (_=>{

const init = _ =>{
  render()
  listeners()
}

const listeners = _ =>{
  playerTriggerEl.addEventListener('click', _ =>{
    state.isPlaying = state.isPlaying ? false : true;
    render()
    Playlist.flip()
  })
}

const state = {
  songsLength : 0,
  isPlaying : false
}
const setState = obj =>{
  state.songsLength = obj.songsLength;
  state.isPlaying = obj.isPlaying;
  render()
  

}

// DOM
const playerCountEL = document.querySelector('.player__count')
const playerTriggerEl = document.querySelector('.player__trigger')

const render = _ =>{
  playerCountEL.innerHTML = state.songsLength
  playerTriggerEl.innerHTML = state.isPlaying ? 'Pause' : 'Play'
}

return{
  init,
  setState
}

})()
export default PlayInfo