const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const field = require('./routes/Techroutes/fieldsRoutes');
const nontechfieldroutes   = require('./routes/NontechRouting/nontechRoutes')
const Interviewroutes   = require('./routes/InterviewSectionRouting/InterviewRouting')
const authMiddleware = require('./middlewares/authMiddlewares');
const interviewRoutes = require('./routes/InterviewSectionRouting/interviewRoutes')




const app = express();




app.use(cors({
  origin: ['http://localhost:5173', 'https://opencoursem.netlify.app']

}));




app.use(express.json());



app.use(express.urlencoded({ extended: true }));


// MongoDB connection
connectDB();








// Routes

app.use('/auth', userRoutes);
app.use('/user',field);
app.use('/nontech',nontechfieldroutes );
app.use('/Interview',Interviewroutes );

app.use('/interview',interviewRoutes)



// Start server
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
