import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import Student from './models/student.js';
dotenv.config();
connectDB();
const app = express();
const PORT = 3000;

const userData = {
    name: "aarav",
    id: 1223
};
const registeredUsers = [
    userData
];

app.use(express.json());
app.use(cors());

// Logs every incoming request: method + URL
app.use((req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.url}`);
    next();
});

app.get('/', (req, res) => {
    console.log("Root route hit");
    res.status(200).json({ message: "Express server is running" });
});

app.get('/msg', (req, res) => {
    console.log("Sending hello message");
    res.status(200).json({ message: "Hello user" });
});

app.get('/sis', (req, res) => {
    console.log("Returning userData:", userData);
    res.status(200).json(userData);
});

app.put('/user/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const data = req.body;
    console.log(`PUT request for user id: ${userId}`);
    console.log("Data received in body:", data);

    const index = registeredUsers.findIndex(user => user.id === userId);
    console.log("Found user at index:", index);

    if (index !== -1) {
        registeredUsers[index] = { id: userId, ...data };
        console.log("User after update:", registeredUsers[index]);
        res.status(200).json({ message: "User updated successfully" });
    } else {
        console.log("User not found for update");
        res.status(404).json({ message: "User not found" });
    }
});

app.post('/create', (req, res) => {
    const data = req.body;
    console.log("Data received for new user:", data);

    const newUser = {
        id: data.id,
        name: data.name,
        age: data.age
    };
    registeredUsers.push(newUser);
    console.log("User created:", newUser);
    console.log("All registered users now:", registeredUsers);

    res.status(201).json({ message: "User created successfully" });
});

app.get('/user', (req, res) => {
    console.log("Returning all registered users:", registeredUsers);
    res.status(200).json(registeredUsers);
});

app.delete('/user/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    console.log(`DELETE request for user id: ${userId}`);

    const index = registeredUsers.findIndex(user => user.id === userId);
    console.log("Found user at index:", index);

    if (index !== -1) {
        console.log("Deleting user:", registeredUsers[index]);
        registeredUsers.splice(index, 1);
        console.log("Remaining users:", registeredUsers);
        res.status(200).json({ message: "User deleted successfully" });
    } else {
        console.log("User not found for delete");
        res.status(404).json({ message: "User not found" });
    }
});
app.post("/test-db", async (req, res) => {
    try {
        const { name, email, course } = req.body;
        if (!name || !email || !course) {
            return res.status(400).json({ message: "name, email, and course are required" });
        }

        const student = await Student.create({ name, email, course });
        res.status(201).json({ message: "Student created successfully", student });
    } catch (error) {
        console.error("Error creating student:", error);
        res.status(500).json({ message: "Error creating student" });
    }
});

app.get("/test-db", async (req, res) => {
    try {
        const students = await Student.find();
        res.status(200).json({ message: "Students retrieved successfully", students });
    } catch (error) {
        console.error("Error retrieving students:", error);
        res.status(500).json({ message: "Error retrieving students" });
    }
});

app.use((req, res) => {
    console.log(`No route matched for: ${req.method} ${req.url}`);
    res.status(404).json({ message: "Route not found" });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);

});