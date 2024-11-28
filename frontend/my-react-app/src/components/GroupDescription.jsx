import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const GroupDescription = () => {
    const [groupData, setGroupData] = useState({});
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate hook
    const location = useLocation();
    const g_id = localStorage.getItem('g_id');
    const g_name = localStorage.getItem('g_name');

    useEffect(() => {
        const u_id = localStorage.getItem('userId');
        const password = localStorage.getItem('password');

        // Fetch group description when the component mounts
        fetchGroupDescription(g_id,u_id, password);
        // console.log(groupData);
    }, []);

    const fetchGroupDescription = async (g_id,u_id, password) => {
        try {
            const response = await axios.get('http://localhost:5001/group-description', {
                params: {g_id,u_id,password} // Send group ID as a parameter
            });
            setGroupData(response.data);
            // console.log(response.data);
        } catch (error) {
            console.error('Error fetching group description:', error);
        }
    };

    const handleLogout = () => {
        // Clear local storage data
        localStorage.removeItem('userId');
        localStorage.removeItem('password');
        localStorage.removeItem('g_id');
        localStorage.removeItem('g_name');
        // Navigate to login page
        navigate('/login');
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    // const handleRemoveUser = async (u_id,password,g_id) =>{
    //     try{
    //         const response = await axios.delete('http://localhost:5000/group-description', {
    //             params: {g_id,password,u_id} // Send group ID as a parameter
    //         });
    //         if(response.data.message === 'Removed successfully'){
    //             console.log('User removed successfully');
    //         }else{
    //             console.error('Failed to remove user');
    //             alert(response.data.message);
    //         }
    //     }
    //     catch(error){
    //         console.error('Error:', error);
    //     }
    // };
    const handleRemoveUser = async (u_id, password, g_id) => {
    // Ask for confirmation from the user
    const confirmDelete = window.confirm('Are you sure you want to delete this user?');

    // If the user confirms deletion, proceed with the deletion logic
    if (confirmDelete) {
        try {
            const response = await axios.delete('http://localhost:5001/group-description', {
                params: { g_id, password, u_id } 
            });
            if (response.data.message === 'Removed successfully') {
                console.log('User removed successfully');
            } else {
                console.error('Failed to remove user');
                alert(response.data.message);
            }
            navigate('/group-description');
        } catch (error) {
            console.error('Error:', error);
        }
    } else {
        // If the user cancels the deletion, show a message
        console.log('User canceled deletion');
    }
};


    return (
        <div className="min-h-screen flex flex-col">
            {/* Top Bar */}
            <header className="bg-gray-800 text-white py-4 px-6 flex justify-between items-center">
                <div>
                    <h1 className="text-lg font-bold">{groupData.g_name}'s Group</h1>
                    <p className="text-sm">Group ID: {g_id}</p>
                    <p className='text-sm'>Total Members: {groupData.u_count}</p>
                </div>
                <div>{
                        groupData.isAdmin &&                  
                        <button className="bg-green-600 hover:bg-green-700 text-white py-2 px-8 rounded-md" onClick={() => navigate('/add-user')}>
                            Add User
                        </button>
                    }
                    <button className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-8 rounded-md m-4" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </header>
            {/* Body Section */}
            <main className="p-6">
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Search Members"
                        className="px-2 py-1 border rounded-md"
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {groupData.users &&
    groupData.users
        .filter((user) =>
            user.u_name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .map((user) => (
            <div
                key={user.u_id}
                className="bg-white shadow-md p-4 rounded-md relative"
            >
                <h3 className="text-lg font-semibold mb-2">
                    {user.u_name}
                </h3>
                <p className="text-gray-500">User ID: {user.u_id}</p>
                {/* Add more details here as needed */}
                {groupData.isAdmin &&                 
                <button
                    className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md"
                    onClick={() => handleRemoveUser(user.u_id,user.u_password,g_id)}
                >
                    Remove
                </button>
                }
            </div>
        ))}

                </div>
            </main>
        </div>
    );
};

export default GroupDescription;