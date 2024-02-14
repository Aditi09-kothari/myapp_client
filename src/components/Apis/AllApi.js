const { addMovies, addTvSeries } = require("../../redux/slice/MovieSlice");
const { useDispatch } = require("react-redux");

const backendUrl = "https://entertainmentapp-backend.onrender.com/api/user";
const MovieUrl = `${backendUrl}/tbdb/moviedata`;
const TvUrl = `${backendUrl}/tbdb/tvdata`;

function ApiCall() {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetching = async () => {
      try {
        const res2 = await fetch(MovieUrl);
        const data2 = await res2.json();
        dispatch(addMovies(data2));

        const res3 = await fetch(TvUrl);
        const data3 = await res3.json();
        dispatch(addTvSeries(data3));
      } catch (error) {
        console.error("Fetching data error:", error);
      }
    };
    fetching();
  }, [dispatch]);
}

export default ApiCall;
