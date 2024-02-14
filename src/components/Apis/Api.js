const MovieDataUrl = "https://entertainmentapp-backend.onrender.com/api/user/movie";
const TvDataUrl = "https://entertainmentapp-backend.onrender.com/api/user/tv";
const apiKey = "869980db09cd82cc14d5949d368a3059";

async function fetchPopularData(endpoint) {
  const response = await fetch(endpoint);
  if (!response.ok) {
    throw new Error(`Failed to fetch data from ${endpoint}`);
  }
  return response.json();
}

async function saveDataToServer(url, data) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error(`Failed to save data to ${url}`);
  }
}

async function fetchDataAndSave(url, popularData) {
  try {
    await saveDataToServer(url, popularData);
    console.log(`Data saved successfully to ${url}`);
  } catch (error) {
    console.error("Error:", error.message);
  }
}

async function TMDBAPI() {
  try {
    // Fetch popular Movies
    const popularMoviesEndpoint = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`;
    const popularMoviesData = await fetchPopularData(popularMoviesEndpoint);

    // Save popular movies data to server
    await fetchDataAndSave(MovieDataUrl, popularMoviesData);

    // Fetch popular TV Series
    const popularTvSeriesEndpoint = `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}`;
    const popularTvSeriesData = await fetchPopularData(popularTvSeriesEndpoint);

    // Save popular TV series data to server
    await fetchDataAndSave(TvDataUrl, popularTvSeriesData);
  } catch (error) {
    console.error("Error:", error.message);
  }
}

export default TMDBAPI;
