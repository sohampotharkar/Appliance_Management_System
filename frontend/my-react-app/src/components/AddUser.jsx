import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const GroupDescription = () => {
    const [groupData, setGroupData] = useState({});
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const g_id = localStorage.getItem('g_id');
    const g_name = localStorage.getItem('g_name');
    const password = localStorage.getItem('password');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const u_id = localStorage.getItem('userId');
                const password = localStorage.getItem('password');

                const groupResponse = await axios.get('http://localhost:5001/group-description', {
                    params: { g_id, u_id, password }
                });
                setGroupData(groupResponse.data);

                const usersResponse = await axios.get('http://localhost:5001/all-users');
                setUsers(usersResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('userId');
        localStorage.removeItem('password');
        localStorage.removeItem('g_id');
        localStorage.removeItem('g_name');
        navigate('/login');
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleAddUser = async (u_id) => {
        try {
            const token = localStorage.getItem('token'); // Fetch the JWT token from local storage
            const response = await axios.post('http://localhost:5001/add-user', { g_id, u_id }, {
                headers: { Authorization: token } // Pass the JWT token in the request headers
            });
            if (response.status === 200) {
                // User added successfully
                const usersResponse = await axios.get('http://localhost:5001/all-users', {
                    headers: { Authorization: token } // Pass the JWT token in the request headers
                });
                setUsers(usersResponse.data);
                alert('User added successfully');
            }
        } catch (error) {
            console.error('Error:', error);
            if (error.response && error.response.data && error.response.data.message === 'User already exists in the group') {
                alert('User already exists in the group');
            } else {
                alert('User already exists in the group');
            }
        }
    };
    

    return (
        <div className="min-h-screen flex flex-col">
            <header className="bg-gray-800 text-white py-4 px-6 flex justify-between items-center">
                <div>
                    <h1 className="text-lg font-bold">{groupData.g_name}'s Group</h1>
                    <p className="text-sm">Group ID: {g_id}</p>
                    <p className='text-sm'>Total Members: {groupData.u_count}</p>
                </div>
                <div>
                    <button className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-8 rounded-md m-4" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </header>
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
                    {users
                        .filter((user) => user.u_name.toLowerCase().includes(searchTerm.toLowerCase()))
                        .map((user) => (
                            <div key={user.u_id} className="bg-white shadow-md p-4 rounded-md relative">
                                <h3 className="text-lg font-semibold mb-2">{user.u_name}</h3>
                                <p className="text-gray-500">User ID: {user.u_id}</p>
                                <button
                                    className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md"
                                    onClick={() => handleAddUser(user.u_id)}
                                >
                                    Add
                                </button>
                            </div>
                        ))}
                </div>
            </main>
        </div>
    );
};

export default GroupDescription;
