import  {songsList} from '../data/songs.js';
import  PlayInfo  from '../modules/play-info.js';
import TrackBar from '../modules/track-bar.js'; 

const Playlist = (_ =>{
  //  data
let songs = songsList;
let currentlyPlayingIndex = 0;
let currentSong = new Audio(songs[currentlyPlayingIndex].url)

  


// DOM
const playListEL = document.querySelector('.playlist');

const init = _ =>{
  render()
  listeners()
  PlayInfo.setState({
    songsLength: songs.length,
    isPlaying : !currentSong.paused
  })
}
const flip = _=>{
  togglePlayPause()
  render()
}

 const changeAudioSrc = _ =>{
   currentSong.src = songs[currentlyPlayingIndex].url
 }
 const togglePlayPause = _ =>{
   return currentSong.paused ? currentSong.play() : currentSong.pause()
 }
const mainPlay = clickedIndex =>{
  if(currentlyPlayingIndex === clickedIndex){
    
    togglePlayPause()
  }else{
    currentlyPlayingIndex = clickedIndex
    changeAudioSrc()
    togglePlayPause()
  }
  PlayInfo.setState({
    songsLength: songs.length,
    isPlaying : !currentSong.paused
  })
}


const playNext = _ =>{
  if(songs[currentlyPlayingIndex + 1]){
    currentlyPlayingIndex++
    changeAudioSrc()
    togglePlayPause()
    render()
  }
}

const listeners = _ =>{
   playListEL.addEventListener('click',event=>{
     if(event.target && event.target.matches('.fa')){
       const listElem = event.target.parentNode.parentNode;
       const listElemIndex = [...listElem.parentElement.children].indexOf(listElem)
       mainPlay(listElemIndex)
       render()
     }
   })
  currentSong.addEventListener('timeupdate', _ =>{
     TrackBar.setState(currentSong)
  })

   currentSong.addEventListener('ended',_ =>{
      playNext()
   })
}

const render = _ =>{
  
  const toggleIcon = (itemindex) =>{
    if(currentlyPlayingIndex === itemindex){
      return currentSong.paused ? 'fa-play' : 'fa-pause';
    } else {
      return 'fa-play'
    } 
  }
  
  
  
  
  let markup = ''

  songs.forEach((songObj,index) =>{

   markup+=`
         <li class="playlist__song ${index === currentlyPlayingIndex ? 'playlist__song--active' : ''}">
               <div class="play-pause">
                 <i class="fa ${toggleIcon(index)} pp-icon"></i>
               </div>
               <div class="playlist__song-details">
                 <span class="playlist__song-name">${songObj.title}</span>
                 <br>
                 <span class="playlist__song-artist">${songObj.artist}</span>
               </div>
               <div class="playlist__song-duration">
                ${songObj.time}
               </div>
             </li>
   `

  })
  playListEL.innerHTML = markup;
}

return {
  init,
  flip
}

})()

export default Playlist