import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './List.css'
import Paginator from 'react-hooks-paginator';

const List = () => {
    const [users, setUsers] = useState([]);        
    let result = [];
    
    const pageLimit = 5;
    const [offset, setOffset] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentData, setCurrentData] = useState([]);

    useEffect(()=>{
        axios.get('http://172.16.12.38/php/react_api/api.php')
        .then(response => {                      
            response.data.forEach((item)=>{
                result.push(item);                
            }); 
            setUsers(result);                       
        });
    }, []);

    useEffect(()=>{
        setCurrentData(users.slice(offset, offset+pageLimit));
    }, [offset, users]);

    const userList =  currentData.map((user) => 
        <tr key={user.id}>
            <td>{user.firstName}</td>
            <td>{user.lastName}</td>
            <td>{user.email}</td>            
            <td>
                <button className="btn success">View</button>
                <button className="btn info">Edit</button>
                <button className="btn danger">Delete</button>
            </td>            
        </tr>
    );

    return(
        <div>
            <table id="users">
                <thead>
                    <tr>
                        <th>Firstname</th>
                        <th>LastName</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {userList}                
                </tbody>
            </table>
            <Paginator
                totalRecords={users.length}
                pageLimit={pageLimit}
                pageNeighbours={2}
                setOffset={setOffset}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
        </div>
    )
}
export default List;