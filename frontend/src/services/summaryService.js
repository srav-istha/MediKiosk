const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

/**
 * Sends the structured patient case history to the backend
 * and receives an AI-generated doctor summary.
 *
 * Backend contract:
 * POST /api/summary
 *
 * Request body:
 * {
 *   ...structuredCaseHistory
 * }
 *
 * Expected response:
 * {
 *   summary: "..."
 * }
 */
export async function generateDoctorSummary(caseHistory) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/summary`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(caseHistory),
    });

    let data = {};

    try {
      data = await response.json();
    } catch {
      data = {};
    }

    if (!response.ok) {
      throw new Error(
        data.detail ||
          data.message ||
          'Unable to generate the doctor summary.'
      );
    }

    if (!data.summary) {
      throw new Error('The backend did not return a doctor summary.');
    }

    return data.summary;
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error(
        'Unable to connect to the MediKiosk backend. Please make sure the backend server is running.'
      );
    }

    throw error;
  }
}