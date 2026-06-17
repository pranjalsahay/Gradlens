
export async function fetchStudents() {
  const response = await fetch(
    "http://127.0.0.1:8000/api/analytics/students"
  );

  if (!response.ok) {
    throw new Error(
      "Failed to fetch students"
    );
  }

  return await response.json();
}

