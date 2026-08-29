import fs from "node:fs/promises";

const filePath = "userdata.txt";

async function createFile(content) {
    try {
        await fs.writeFile(filePath, content, "utf-8");
        console.log("File created successfully");
    } catch (error) {
        console.error("Error creating file:", error);
    }
}

async function readFile() {
    try {
        const data = await fs.readFile(filePath, "utf-8");
        console.log("File read successfully");
        return data;
    } catch (error) {
        console.error("Error reading file:", error);
    }
}

await createFile("Hello World");

const data = await readFile();
console.log("File content:", data);