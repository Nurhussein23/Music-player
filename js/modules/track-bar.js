const TrackBar = (_ =>{
  //  state
  const state = {
    currrentTrackTime : 0,
    fullTrackTime : 0,
    fillWidth : 0
  }
  
  const trackBarFillEL = document.querySelector('.track-bar__fill')
   
  const init = _ =>{
    render()
  }
  const render = _=>{
    trackBarFillEL.style.width = `${state.fillWidth}%`
  }

  const getPercent = (current, full) =>{
    return (current/full) * 100;
  }
  
  const setState = obj =>{
    state.currrentTrackTime = obj.currentTime;
    state.fullTrackTime = obj.duration;
    state.fillWidth = getPercent(state.currrentTrackTime, state.fullTrackTime);
    render();
  }

  return{
    init,
    setState
  }
})()
export default TrackBar;