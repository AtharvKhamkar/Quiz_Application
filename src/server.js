import express from "express";

const app = express();
const PORT = 1313;



app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
})