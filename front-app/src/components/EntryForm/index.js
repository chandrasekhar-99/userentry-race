import {Component} from 'react'
import {v4} from 'uuid'
import './index.css'



class EntryForm extends Component{
    state = {
        dataList : [],
        Username:"",
        Userspeed:"",
        showSubmitError:false,
        errorMsg:"Enter username and speed",
    }

    onSubmitList= () => {
        const {history} = this.props
        const {dataList} = this.state
        if (dataList.length >= 2 && dataList.length <= 10){
            history.replace('/race-track')
        }
    }

 
    onChangeUsername = event =>{
        this.setState({Username:event.target.value})
    }

    onChangeUserspeed = event =>{
        this.setState({Userspeed:event.target.value})
    }

    handleUserspeed = event => {
        const newValue = event.target.value
        if (newValue !== ""){
            const secNewValue = newValue + " km/h"
            this.setState({Userspeed:secNewValue})
        }
    }

    onAddRunners = event => {
        event.preventDefault()

        const {Username,Userspeed,errorMsg} = this.state


        const newRunnersList = {
            id:v4(),
            runnerName:Username,
            runnerSpeed:Userspeed,
        }

        if (Username !== "" && Userspeed !==""){
            this.setState(prevState=>({
                dataList:[...prevState.dataList,newRunnersList],
                Username:'',
                Userspeed:'',
            }))
        } else{
            this.setState({showSubmitError: true, errorMsg})
        }
    }

    
    renderFormField = () => {
        const {Username,Userspeed,showSubmitError,errorMsg} = this.state

        return(
            <>
                <form className='runner-details-container' onSubmit={this.onAddRunners}>
                    <h1 className='heading'>RUNNER DETAILS</h1>
                    <p className='sub-heading'>*You can add max 10 participants</p>
                    <label className='input-label' htmlFor='name'>Name</label>
                    <input 
                        type="name" 
                        id="Username" 
                        value={Username}
                        onChange={this.onChangeUsername}
                        className='input-field'
                    />
                    <label className='input-label' htmlFor='speed'>Speed</label>
                    <input 
                        type="name"
                        id="Userspeed" 
                        value={Userspeed}
                        onChange={this.onChangeUserspeed}
                        onBlur={this.handleUserspeed}
                        className='input-field'
                    />
                    <button type="submit" className='add-details-button'>+ ADD RUNNER</button>
                    {showSubmitError && <p>*{errorMsg}</p>}
                </form>

            </>
        )
    }

    renderRunnersList = () => {
        const {dataList} = this.state
        return(
            <form onSubmit={this.onSubmitList} className='table-container'>
                <h1 className='table-heading'>LIST OF PARTICIPANTS</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Speed</th>
                            <th>Start Time</th>
                            <th>End Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataList.map(eachItem=>(
                            <tr key = {eachItem.id}>
                                <td>{eachItem.runnerName}</td>
                                <td>{eachItem.runnerSpeed}</td>
                                <td>-</td>
                                <td>-</td>
                            </tr>
                        ))}
                    </tbody>
                    <hr className='bottom-line'/>
                    <button type="submit" className='start-btn'><span>Start Race →</span></button>
                </table>
            </form>
        )
    }

    render(){
        
        return(
            <div className='main-container'>
                <div>{this.renderFormField()}</div>
                <div>{this.renderRunnersList()}</div>
            </div>
        )
    }
}

export default EntryForm