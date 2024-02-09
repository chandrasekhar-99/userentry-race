import {Component} from 'react'
import './index.css'

class RaceTrack extends  Component{
    state = {
        isTimerRunning:false,
        timer:0,
    }

    componentWillUnmount(){
        clearInterval(this.timeInterval)
    }

    componentDidMount(){
        this.timer = setInterval(this.updateTime, 1000)
        this.setState({isTimerRunning: true})
        this.setState(prevState => ({
            timeElapsedInSeconds: prevState.timeElapsedInSeconds + 1,
          }))
    }

    renderSeconds = () => {
        const {timer} = this.state
        const seconds = Math.floor(timer % 60)
    
        if (seconds < 10) {
          return `0${seconds}`
        }
        return seconds
      }
    
      renderMinutes = () => {
        const {timer} = this.state
        const minutes = Math.floor(timer / 60)
    
        if (minutes < 10) {
          return `0${minutes}`
        }
        return minutes
      }

    

    

    render(){
        const time = `${this.renderMinutes()}:${this.renderSeconds()}`
        return(
            <div className='track-container'>
                <p>{time}</p>
            </div>
        )
    }
}

export default RaceTrack