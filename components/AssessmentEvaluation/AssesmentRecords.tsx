"use client";

interface Props {
  records: any[];
  students: any[];
  onEdit: (item: any) => void;
}

export default function AssesmentRecord({ records, students, onEdit }: Props) {
  const getName = (id: string) => {
    const found = students.find((s) => s.stnid === id);
    return found?.fullname ?? id;
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow mb-6 overflow-x-auto">
      <h2 className="text-xl font-bold mb-4">Assessment Records</h2>
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="p-3 text-left">Student ID</th>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Course</th>
            <th className="p-3 text-left">Assessment</th>
            <th className="p-3 text-left">Marks</th>
            <th className="p-3 text-left">Grade</th>
            <th className="p-3 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {records.map((item, i) => (
            <tr key={i} className="border-b">
              <td className="p-3">{item.studentName}</td>
              <td className="p-3">{getName(item.studentName)}</td>
              <td className="p-3">{item.course}</td>
              <td className="p-3">{item.assessmentTitle}</td>
              <td className="p-3">{item.marks}</td>
              <td className="p-3">{item.grade}</td>
              <td className="p-3">
                <button onClick={() => onEdit(item)} className="bg-yellow-500 text-white px-3 py-1 rounded">Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}