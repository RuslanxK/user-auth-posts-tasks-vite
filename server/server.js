const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const postRoutes = require('./routers/postRouter');
const todoRoutes = require("./routers/todoRouter")
const userRoutes = require('./routers/userRouter')
const connectDB = require("./configs/database")


dotenv.config();
const app = express();

app.use(cors());
app.use(bodyParser.json());
connectDB();

app.use('/api/posts', postRoutes);
app.use('/api/user', userRoutes);
app.use('/api/todos', todoRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
