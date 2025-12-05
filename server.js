require('dotenv').config();
const app = require('./src/app');

const port = process.env.PORT || 3000;
app.listen(port, (error) => {
    if (error) {
        console.error(`Error starting server: ${error}`);
        throw error;
    }
    console.log(`Server is running on http://localhost:3000`);
});