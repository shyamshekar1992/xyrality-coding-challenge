// services/worldService.ts

// This function asynchronously fetches a list of worlds from the given API endpoint
export const fetchWorlds = async () => {
  // Await the fetch request to retrieve data from the specified API endpoint
  const response = await fetch('https://routing.missionchief.com/api/v1/routing.json')

  // Check if the response is not successful (i.e., status code is not in the 200-299 range)
  if (!response.ok) {
    // Throw an error if the fetch operation failed, so it can be handled by the caller
    throw new Error('Failed to fetch worlds')
  }

  // Parse the response as JSON and extract the data object
  const data = await response.json()

  // Return the worlds property from the fetched data object
  return data.worlds
}
