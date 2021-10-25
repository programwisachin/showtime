import React,{useState} from 'react'
import { useHistory } from 'react-router-dom'

const Signup = () => {

    const [credentials, setCredentials] = useState({name:"",email:"",password:""})  //saving credentials
    let history = useHistory()

    //function to invoke when form is been submitted
    const handleSubmit = async (e)=>{

        e.preventDefault()
        const url = `http://localhost:5000/auth/user` //endpoint or path
        const response = await fetch(url,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({name:credentials.name,email:credentials.email,password:credentials.password})
        })
        const json = await response.json()
        //If the credentials are correct then store the auth token in local storage
        if(json.success){
            localStorage.setItem('token',json.authToken)
            history.push("/")
        }
        else{
            alert("Invalid Credentials")
        }
    }

    // function to set value of form fields when user provides
    const onChange = (e)=>{
        setCredentials({...credentials,[e.target.name] : e.target.value})
    }

    return (
        <>
            <div className="container" style={{marginTop:"90px"}}>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" value={credentials.name} id="name" name="name" onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={credentials.email} id="email" name="email" aria-describedby="emailHelp" onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credentials.password} id="password" name="password" onChange={onChange} />
                </div>
                <button type="submit" className="btn btn-primary">Sign Up</button>
            </form>
            </div>
        </>
    )
}

export default Signup
