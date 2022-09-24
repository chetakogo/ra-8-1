import {useState,useEffect} from 'react';
import './App.css'
import Lists from "./components/List";
import Details from "./components/Details";
import Loading from "./components/Loading";
import createRequest from './api/createRequest';

function App() {
  const [lists, setLists] = useState([]);
  const [loading, setLoader] = useState(false);
  const [currentUser,setCurrentUser] = useState(null);
 

useEffect(() => {
    setLoader(true);
    createRequest('users.json')()
    .then((data) => setLists(data))
         setLoader(false);
    
}, []);

const getIdHandler = (id,name) => {
  const user = {name: name, id: id};
  console.log(user.id);
  setCurrentUser(user);
};
  return (
      <div className="container pt-5">
        <div className="row">
          <div className="col-4">
                  {<Lists lists={lists} getId={getIdHandler}/>}
        </div>
        <div className="col-8">
               {!Loading && <Loading/>}
               {currentUser && <Details {...currentUser}/>}
        </div>
      </div>
    </div>
  );
}

export default App;