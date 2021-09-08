import React, { useEffect,useState } from 'react'
import axios from 'axios'

export default function Murali() {
    const [isEdit, setisEdit] = useState(false);
    const [isValid, setisValid] = useState(false)
    const returnUser=()=>{
        return {
            fname:"",
            lname:"",
            email:""
        }
    }
    const [users, setusers] = useState([])
    const [user, setuser] = useState(returnUser())
    let url="http://localhost:3000/users/"
    // Destructering the User Object
    let {fname,lname,email} = user

    const validate = ()=>{
        let newuser = {...user};
        let valid = true
        for(let a in newuser){
            if(newuser[a] === ""){
                valid = false
            }
        }
        
        if(valid){
            setisValid(true)
        }else{
            setisValid(false)
        }
        
    }
    useEffect(()=>{
        // will excute whenver a propery in  user got changed
        validate()
    },[user])

    useEffect(()=>{
        getAllUsers()
    })

    const createUser = ()=>{
        console.log(user)
        axios.post(url,user).then((data)=>{
            console.log(data)
            getAllUsers()
            clearForm()
        })
    
    }
    const editUser=(user)=>{
        setisEdit(true)
        setuser(user)
    }
    const deleteUser=(user)=>{
        console.log(user)
        axios.delete(url+user.id).then(res=>{
            getAllUsers()
        })
    }
    const updateUser=()=>{
      axios.put(url+user.id,user).then((res)=>{
        getAllUsers()
        setisEdit(false)
        clearForm() // Using clearform as a call Back
      })
       
      
    }

    const getAllUsers = async ()=>{
        
        // getting Data with Async and await
        // try {
        //     let users = await axios.get(url)
        //     setusers(users.data)

        // } catch (error) {
        //     console.log(error)
        // }

        // getting Data with Fetch
        try {
            let users = await(await fetch(url)).json()
            setusers(users)
        } catch (error) {
            console.log("error with fetch Method :-",error)
        }
        console.log(users)

        // Getting data with promise or 'then' method
        // axios.get(url).then(res=>{
        //     setusers(res.data)
        // }).catch(err=>{
        //     console.log(err)
        // })
    }
    const handleChange=(e)=>{
        let newUser = {...user}
        newUser[e.target.name] = e.target.value
        setuser(newUser)
    }
    const clearForm=()=>{
        let newUser = returnUser()
        for(let a in newUser){
            newUser[a]=""
        }
        setuser(newUser)
    }

    
    return (
        <div>
            <form >
                <label htmlFor="fname">First Name :</label>
                <input type="text" name="fname"  value={fname} onChange={(e)=>{handleChange(e)}}/> <br />
                <label htmlFor="lname">Last Name :</label>
                <input type="text" name="lname" value={lname} onChange={(e)=>{handleChange(e)}}/> <br />
                <label htmlFor="email">Email :</label>
                <input type="text" name="email" value={email} onChange={(e)=>{handleChange(e)}}/> <br />
               
                {isEdit?<button type="button" onClick={updateUser}>Update User</button>: <button type="button" onClick={createUser} disabled={!isValid}>Add User</button>}
            </form>
            <table border="1">
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>ID</th>

                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user,i)=> <tr key={i}>
                        {Object.values(user).map((val)=> <td>{val}</td> )}
                        <td> <button onClick={()=>{editUser(user)}}>Edit</button> </td>
                        <td> <button onClick={()=>{deleteUser(user)}}>Delete</button> </td>
                    </tr> )}
                </tbody>
            </table>
        </div>
    )
}
