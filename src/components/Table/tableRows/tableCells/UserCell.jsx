import React, { useEffect, useState } from 'react'
import axios from 'axios';
function UserCell({cell}) {
    console.log(cell)
    const [users, setUsers] = useState([]);
    useEffect(() => {
        const fetchUsers = async () => {
            try{
                const url = "http://localhost:8080/auth/getUsers";
                const users = await axios.get(url);
                console.log(users.data);
           setUsers(users);
           }catch(err){
               console.log(err);
           }
        }
        fetchUsers();
       
    },[])

  return (
    <div>
        {cell.getValue()}
    </div>
  )
}

export default UserCell