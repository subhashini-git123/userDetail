import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers } from "./Redux/userSlice";
import React, { useEffect } from "react";

function App() {
  const { data, loading } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div>
      <h1>Users</h1>
      {loading && <p>Loading...</p>}

      <ul>
        {data.map((user) =>
          user.hasError ? (
            <div key={user.id} style={{ color: "red" }}>
              {user.errorMessage}
            </div>
          ) : (
            <div key={user.id}>{user.name}</div>
          )
        )}
      </ul>
    </div>
  );
}

export default App;
