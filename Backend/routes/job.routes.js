import express from 'express';
import axios from 'axios';

const router = express.Router();

router.get('/search', async (req, res) => {
  const { query, location } = req.query;

  console.log("Query:", query);
  console.log("Location:", location);

  const options = {
    method: 'GET',
    url: 'https://indeed12.p.rapidapi.com/jobs/search',
    params: {
     query: query,
     location: location,

       locality:'in',
      
      sort: 'date'
    },
    headers: {
      'x-rapidapi-key': '031cba2722msh1ed26c3f51d3e8dp12aa01jsn7f37053f3922',
      'x-rapidapi-host': 'indeed12.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    res.json(response.data);
    console.log("Response:", response.data);
  } catch (error) {
    console.log(error)
    console.error("Error fetching jobs:", error.message);
    
    res.status(500).json({ message: 'Error fetching jobs', error: error.toString() });
  }
});

export default router;

