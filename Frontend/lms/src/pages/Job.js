import React, { useState } from 'react';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import Second from '../layouts/Second';

const Job = () => {
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('');
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchJobs = async (query, location) => {
    setLoading(true);
    setError(null);
    toast.loading('Searching...');
    try {
      const response = await axios.get('http://localhost:5000/api/jobs/search', {
        params: {
          query,
          location,
        },
      });
      setJobs(response.data.hits);
      toast.dismiss();
      toast.success('Search successful!');
    } catch (error) {
      setError('Error fetching jobs');
      toast.dismiss();
      toast.error('Error fetching jobs');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    fetchJobs(query, location);
  };

  return (
    <Second>
      <Toaster />
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">Job Search</h1>
        <div className="flex flex-col md:flex-row items-center mb-6">
          <input
            type="text"
            placeholder="Job title or keyword"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full md:w-1/2 p-3 border rounded mb-4 md:mb-0 md:mr-4"
          />
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full md:w-1/2 p-3 border rounded mb-4 md:mb-0 md:mr-4"
          />
          <button
            onClick={handleSearch}
            disabled={loading}
            className="p-3 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300"
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="space-y-4">
          {jobs.length > 0 ? (
            jobs.map((job) => (
              <div key={job.id} className="border p-4 rounded shadow">
                <h2 className="text-xl font-bold">{job.title}</h2>
                <p className="text-gray-700">{job.company_name}</p>
                <p className="text-gray-600">{job.location}</p>
                <p className="text-gray-500">{job.formatted_relative_time}</p>
                <a
                  href={job.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline mt-2 block"
                >
                  View Job
                </a>
              </div>
            ))
          ) : (
            !loading && <p className="text-gray-700">No jobs found</p>
          )}
        </div>
      </div>
    </Second>
  );
};

export default Job;
