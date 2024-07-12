// Table.js
import React from 'react';

function Table({ student }) {
  return (
    <tr className="odd:bg-white even:bg-gray-50 dark:odd:bg-gray-900 dark:even:bg-gray-800 border-b dark:border-gray-700">
      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {student.name}
      </td>
      <td className="px-6 py-4">{student.email}</td>
      <td className="px-6 py-4">{student.section}</td>
      <td className="px-6 py-4">{student.year}</td>
      <td className="px-6 py-4">{student.usn}</td>
    </tr>
  );
}

export default Table;
