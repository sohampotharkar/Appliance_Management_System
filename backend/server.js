// server.js
const express = require('express');
const mariadb = require('mariadb');
const cors = require('cors');
const app = express();
const port = 5000;

// server.js
const pool = mariadb.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Soham@1234',
    database: 'my_database'
});

app.use(cors());
app.use(express.json()); // Parse JSON bodies

// Login route
app.post('/login', async (req, res) => {
    const { u_id, password } = req.body;
    try {
        // Query the database for the user
        const connection = await pool.getConnection();
        const result = await connection.query('SELECT * FROM user WHERE u_id= ?', [u_id]);
        connection.release();

        if (result.length === 0) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const user = result[0];

        // Compare the provided password with the hashed password in the database
        const passwordMatch = (password === user.u_password);

        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // If login is successful, you can generate a session token or JWT here
        // For simplicity, let's just send a success response
        res.json({ message: 'Login successful' });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/signup', async (req, res) => {
    try {
        const { username, password } = req.body;
        const conn = await pool.getConnection();

        // Check if a user with the same password exists
        let result = await conn.query('SELECT * FROM user WHERE u_password = ?', [password]);
        
        if (result.length > 0) {
            conn.release();
            return res.status(400).json({ message: 'Password already exists. Please choose another password.' });
        }

        // Add the user to the database
        await conn.query('INSERT INTO user (u_name, u_password) VALUES (?, ?)', [username, password]);

        // Get the user ID of the newly added user
        result = await conn.query('SELECT u_id FROM user WHERE u_name = ? AND u_password = ?', [username, password]);
        const u_id = result[0].u_id;

        conn.release();

        // Redirect the user to the login page with the user ID
        res.json({ message: 'User created successfully!', u_id });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

const verifyUser = async (u_id, password) => {
    try {
        const connection = await pool.getConnection();
        const result = await connection.query('SELECT * FROM user WHERE u_id = ? AND u_password = ?', [u_id, password]);
        connection.release();
        console.log(result.length);
        
        // If user exists and credentials are correct, return true
        return result.length >0;
    } catch (error) {
        console.error('Error verifying user:', error);
        throw error;
    }
};

// Route to fetch user data
app.get('/user', async (req, res) => {
    const { u_id, password } = req.query; // Retrieve user ID and password from query parameters

    try {

        const isValidUser = await verifyUser(u_id, password);
        console.log(isValidUser,"user")

        if (!isValidUser) {
            // If user is not verified, send an error response
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const connection = await pool.getConnection();
        const result = await connection.query('SELECT * FROM user WHERE u_id = ?', [u_id]);
        connection.release();
        res.json(result[0]);
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Route to fetch groups
app.get('/groups', async (req, res) => {
    const { u_id,password } = req.query; // Retrieve user ID from query parameters

    try {

        const isValidUser = await verifyUser(u_id, password);
        console.log(isValidUser,"groups")

        if (!isValidUser) {
            // If user is not verified, send an error response
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const connection = await pool.getConnection();
        const result = await connection.query('SELECT * FROM u_group WHERE g_id IN (SELECT g_id FROM user_group_membership WHERE u_id = ?)', [u_id]);
        connection.release();
        res.json(result);
    } catch (error) {
        console.error('Error fetching groups:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Route to fetch appliances
/* app.get('/appliances', async (req, res) => {
    const { u_id, password, g_id } = req.query; // Retrieve user ID, password, and group ID from query parameters

    try {
        // Validate user ID and password
        const isValidUser = await verifyUser(u_id, password);

        if (!isValidUser) {
            // If user is not verified, send an error response
            return res.status(401).json({ error: 'Unauthorized' });
        }

        // Fetch appliances based on user ID and group ID
        const connection = await pool.getConnection();
        const appliances = await connection.query('SELECT * FROM appliance WHERE u_id = ? AND g_id = ?', [u_id, g_id]);
        connection.release();

        res.json(appliances);
    } catch (error) {
        console.error('Error fetching appliances:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}); */
//to check if the user is a admin
const VerifyAdmin = async (u_id, password,g_id) => {
    try{
        const isValidUser = await verifyUser(u_id, password);
        // console.log(isValidUser,"groups")
        if (!isValidUser) {
            // If user is not verified, send an error response
            return false;
        }
        const connection = await pool.getConnection();
        const result = await connection.query('SELECT * FROM admin WHERE u_id = ? and g_id = ?', [u_id, g_id]);
        connection.release();
        // console.log(result.length);//this is just to check, afterwards comment it out

        // if the user is the admin of the group then return true else false
        return result.length === 1;
    }catch(error){
        console.error('Error checking isAdmin', error);
        throw error;
    }
}


// Route to fetch appliances
app.get('/appliances', async (req, res) => {
    const { u_id, password, g_id } = req.query; // Retrieve user ID, password, and group ID from query parameters

    try {
        // Validate user ID and password
        const isValidUser = await verifyUser(u_id, password);

        if (!isValidUser) {
            // If user is not verified, send an error response
            return res.status(401).json({ error: 'Unauthorized' });
        }

        //check if the user is the admin
        const isAdmin = await VerifyAdmin(u_id, password, g_id);
        //if the user is not an admin then show his appliances only
        if(!isAdmin){
            // Fetch appliances based on user ID and group ID
            const connection = await pool.getConnection();
            const appliances = await connection.query('SELECT * FROM appliance WHERE u_id = ? AND g_id = ?', [u_id, g_id]);
            connection.release();
            res.json(appliances);
        }
        //
        else{
            const connection = await pool.getConnection();
            const appliances = await connection.query('SELECT * FROM appliance WHERE g_id = ?', [g_id]);
            connection.release();
            res.json(appliances); 
        }

    } catch (error) {
        console.error('Error fetching appliances:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
// server.js

app.delete('/group-description',async (req, res) =>{
    const {g_id,password,u_id} = req.query;

    try{
        const isAdmin = await VerifyAdmin(u_id,password,g_id)
        console.log(isAdmin);
        if(isAdmin){
            res.status(200).json({ message: 'Cannot remove an admin' });
        }else{
           console.log("deleting user start"); 
           const connection = await pool.getConnection();
           const result = await connection.query('DELETE FROM user_group_membership WHERE u_id = ? AND g_id = ?',[u_id,g_id]);
           connection.release();
           res.status(200).json({message:'Removed successfully'})
        }
    }catch(error){
        console.error("There was a problem deleting user",error);
    }

})

// Route to fetch group description
app.get('/group-description', async (req, res) => {
    // console.log(req.query); done to check errors
    const { g_id, u_id, password } = req.query; // Retrieve group ID from query parameters

    try {
        const connection = await pool.getConnection();
        // Fetch group details and count of members in the group
        
        //check if the user is a admin
        const isAdmin = await VerifyAdmin(u_id,password,g_id);

        // Fetch users in the group
        const groupUsers = await connection.query('SELECT * FROM user WHERE u_id IN (SELECT u_id FROM user_group_membership WHERE g_id = ?)', [g_id]);

        const g_name = await connection.query('SELECT g_name from u_group WHERE g_id = ?',[g_id]);
        connection.release();
        
        // Combine group details and users
        const groupData = {
            u_count:groupUsers.length,
            users: groupUsers,
            g_name:g_name[0].g_name,
            isAdmin  
        };
        // console.log(groupData)

        res.json(groupData);
    } catch (error) {
        console.error('Error fetching group description:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Route to fetch appliance details by ID
app.get('/appliance-details', async (req, res) => {
    const { a_id, u_id, password } = req.query; // Retrieve appliance ID, user ID, and password from query parameters

    try {
        // Verify user with provided user ID and password
        const isVerified = await verifyUser(u_id, password);

        if (!isVerified) {
            // If user is not verified, send an error response
            return res.status(401).json({ error: 'Unauthorized' });
        }

        // Fetch appliance details from the database based on the ID
        const connection = await pool.getConnection();
        const [appliance] = await connection.query('SELECT * FROM appliance WHERE a_id = ?', [a_id]);
        
        // Check if the appliance exists
        if (!appliance) {
            connection.release();
            return res.status(404).json({ error: 'Appliance not found' });
        }
        
        // Fetch document image blob for doc_id = d11 if it exists
        let documentImage = null;
        try {
            const [docResult] = await connection.query('SELECT invoice_image FROM appliance WHERE a_id= ?', [a_id]);
            if (docResult && docResult.length > 0) {
                documentImage = docResult[0].document_image;
            }
        } catch (docError) {
            console.error("Error fetching document image:", docError);
            // If document image fetch fails, handle as required
        }

        connection.release();

        // Prepare response data
        const responseData = {
            appliance: appliance,
            documentImage: documentImage
        };

        res.json(responseData);
    } catch (error) {
        console.error('Error fetching appliance details:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

