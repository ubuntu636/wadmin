import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import Table from './Table';
import PieChart from './PieChart';

const App = () => {
  const [data, setData] = useState([]);
  const [students, setStudents] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://workshop-frgm.onrender.com/api/admin');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        setData(jsonData);
        setStudents(jsonData.length);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleDownload = () => {
    const filteredData = data.map(({ usn, name, email, year, section }) => ({
      usn,
      name,
      email,
      year,
      section,
    }));

    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Student_Data');
    XLSX.writeFile(workbook, 'student_data.xlsx');
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-9 text-center text-gray-800">Student Data</h2>
        <div className="flex flex-wrap justify-center mb-6 space-y-6 sm:space-y-0 sm:space-x-6">
          <div className="w-full sm:w-1/3 bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="p-4 ">
              <h2 className="text-xl font-semibold mb-4 text-center">Pie Chart</h2>
              <div className="relative h-64 flex justify-center">
                <PieChart />
              </div>
            </div>
          </div>

          <div className="w-full sm:w-1/3 bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-4 text-center">No of Students Registered</h2>
              <div className="relative h-64 flex items-center justify-center">
                <div className="text-6xl font-extrabold font-mono text-center">
                  <h1>{students}</h1>
                </div>
              </div>
            </div>
          </div>
{/* 
          <div className="w-full sm:w-1/3 bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-4 text-center">Card 3</h2>
              <div className="relative h-64">
                <div style={{ width: '250px', height: '250px' }}></div>
                
              </div>
            </div>
          </div> */}
        </div>

        <div className="flex justify-end mb-4">
          <button
            onClick={handleDownload}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-2 px-4 rounded shadow-md transition duration-300"
          >
            Download Excel
          </button>
        </div>

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mb-6">
          <table className="w-full text-sm text-left text-gray-700 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">Name</th>
                <th scope="col" className="px-6 py-3">Email</th>
                <th scope="col" className="px-6 py-3">Section</th>
                <th scope="col" className="px-6 py-3">Year</th>
                <th scope="col" className="px-6 py-3">USN</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800">
              {data.map((student) => (
                <Table key={student._id} student={student} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default App;
