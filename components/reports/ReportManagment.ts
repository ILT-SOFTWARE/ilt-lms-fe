import api from "@/app/services/api";

const ReportsManagment = {
  getTotalAssessments: () => api.get("/assessments/report").then(r => ({ data: { total_assessments: r.data.total_assessments } })),
  getPublishedAssessments: () => api.get("/assessments/report").then(r => ({ data: { published_assessments: r.data.published_assessments } })),
  getExpiredAssessments: () => api.get("/assessments/report").then(r => ({ data: { expired_assessments: r.data.expired_assessments } })),
  getAssessmentReport: () => api.get("/assessments/report").then(r => ({ data: { data: r.data.data } })),

  getAssessmentEvaluationStats: () =>
    api.get("/assessment-evaluation").then(r => ({
      data: {
        total: r.data.data?.length ?? 0,
        evaluated: r.data.data?.filter((x: any) => x.grade !== "F").length ?? 0,
        pending: r.data.data?.filter((x: any) => x.grade === "F").length ?? 0,
      }
    })),

  getAssessmentEvaluationReport: () => api.get("/assessment-evaluation").then(r => ({
    data: { data: r.data.data?.map((x: any) => ({ student_name: x.studentName, score: x.marks, status: x.grade !== "F" ? "Evaluated" : "Pending" })) }
  })),

  getBankAccounts: () => api.get("/bank-accounts").then(r => ({ data: { data: r.data.data } })),
  getCourses: () => api.get("/courses").then(r => ({ data: { data: r.data.data } })),
  getInstructors: () => api.get("/instructors").then(r => ({ data: { data: r.data.data } })),
  getPayments: () => api.get("/payments").then(r => ({ data: { data: r.data.data } })),
  getStudents: () => api.get("/students").then(r => ({ data: { data: r.data.data } })),
};

export default ReportsManagment;