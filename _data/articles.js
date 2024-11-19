const STRAPI_API_URL = 'http://localhost:1337/api/contents?populate=*'; // Adjust as needed
const BEARER_TOKEN = 'fe7ad76361258ec6bdfe8e14ab6c78358023e88384320b3c475891357bc84f4a585741515be294f60bb1eaeda9b6ac20ed1a040388ba66de17ba0dc543b3f229757f20814bf7de9b152db743154bc46cf867c9bddebc075d34c4bae09dcc62abcc3d744592b582ab875fa48738a4c870254e46b4bc98b39b753e6cc0cf0a359a'; // Replace with your actual token

export default async function () {
  try {
    const response = await fetch(STRAPI_API_URL, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${BEARER_TOKEN}`,
      },
    });

    // Check if the response is okay (status in the range 200-299)
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json(); // Parse JSON from the response
    return data.data; // Return the array of contents
  } catch (error) {
    console.error('Error fetching contents:', error);
    return [];
  }
}
