import Sidebar from "./components/sidebar/Sidebar";
import "./App.css";
import MainRouting from "./user access/MainRouting";
import { useSelector } from 'react-redux'
import { useGetBasesQuery } from "./store/services/alphaTruckingApi";
import Loading from "./components/utilities/Loading";
import Error from "./components/utilities/Error";
function App() {
  const { userInfo } = useSelector((state) => state.auth)
  const { data, error, isFetching } = useGetBasesQuery()
  if (isFetching) {
    return <Loading />;
  }
  if (error) {
    return <Error error={error} />;
  }
  return (
    <div className='app text-white bg-white'>
      {userInfo && <Sidebar data={data} />}
      <MainRouting />
    </div>
  );
}

export default App;
