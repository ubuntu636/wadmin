// PieChart.js
import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
  const [sectionCounts, setSectionCounts] = useState({ A: 0, B: 0, C: 0, D: 0, E: 0 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://workshop-frgm.onrender.com/api/admin');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();

        
        const counts = { A: 0, B: 0, C: 0, D: 0, E: 0 };
        jsonData.forEach((student) => {
          if (counts[student.section] !== undefined) {
            counts[student.section]++;
          }
        });
        setSectionCounts(counts);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); 
  }, []);

  const pieData = {
    labels: ['Section A', 'Section B', 'Section C', 'Section D', 'Section E'],
    datasets: [
      {
        data: [
          sectionCounts.A,
          sectionCounts.B,
          sectionCounts.C,
          sectionCounts.D,
          sectionCounts.E,
        ],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
      },
    ],
  };

  return (
    <div className="">
    <div style={{ width: '250px', height: '250px' }}>
      <Pie data={pieData} />
    </div>
  </div>
  );
};

export default PieChart;
