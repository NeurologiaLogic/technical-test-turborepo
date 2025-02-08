import axios from "axios";

// Get request using Axios
export const apiGetRequest = async (endpoint: string, token: string) => {
  try {
    const url = process.env.NEXT_PUBLIC_API_URL + endpoint;
    console.log(url)
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return response.data; // Axios automatically parses JSON for you
  } catch (error: any) {
    // Handle error
    if (error.response) {
      throw new Error(`API request failed (${error.response.status}): ${error.response.statusText}`);
    } else { 
      throw new Error("API request failed: " + error.message);
    }
  }
};

// Post request using Axios
export const apiPostRequest = async (endpoint: string, token: string, data: unknown) => {
  try {
    const url = process.env.NEXT_PUBLIC_API_URL + endpoint;
    const response = await axios.post(url, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return response.data; // Axios automatically parses JSON for you
  } catch (error: any) {
    // Handle error
    if (error.response) {
      throw new Error(`API request failed (${error.response.status}): ${error.response.statusText}`);
    } else {
      throw new Error("API request failed: " + error.message);
    }
  }
};
