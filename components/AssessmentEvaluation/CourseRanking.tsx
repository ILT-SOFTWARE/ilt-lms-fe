"use client";

interface Props {
  rankings: any[];
}

export default function CourseRanking({ rankings }: Props) {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4">Student Rankings</h2>
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="p-3 text-left">Rank</th>
            <th className="p-3 text-left">ID</th>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Course</th>
            <th className="p-3 text-left">Total</th>
          </tr>
        </thead>
        <tbody>
          {rankings.map((r, i) => (
            <tr key={i} className="border-b">
              <td className="p-3">{i + 1}</td>
              <td className="p-3">{r.studentId}</td>
              <td className="p-3">{r.studentName}</td>
              <td className="p-3">{r.course}</td>
              <td className="p-3">{r.totalMarks}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}