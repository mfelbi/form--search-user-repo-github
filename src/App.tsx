import { useState } from "react";
import SearchUser from "./components/SearchUser";
import UserRepositories from "./components/UserRepositories";
import "./App.css";

const App = () => {
  const [selectedUser, setSelectedUser] = useState<string | null>(null); // State user yang dipilih
  const [users, setUsers] = useState<any[]>([]); // State hasil pencarian
  const [isRepositoryVisible, setIsRepositoryVisible] = useState<boolean>(false);

  const handleSelectUser = (user: string) => {
    setSelectedUser(user); 
    setIsRepositoryVisible(true); 
  };

  const handleCloseRepository = () => {
    setIsRepositoryVisible(false); 
  };

  return (
    <div>
      <h1>GitHub User & Repository </h1>
      <div className="container">
        {!isRepositoryVisible ? (
          <SearchUser setSelectedUser={handleSelectUser} setUsers={setUsers} />
        ) : (
          <div>
            <button className="back" onClick={handleCloseRepository}>
              Close Repository
            </button>
            {selectedUser && <UserRepositories username={selectedUser} />} 
          </div>
        )}
      </div>
      {!isRepositoryVisible && users.length > 0 && (
        <div>
          <h2>Search Results</h2>
          <ul>
            {users.map((user) => (
              <li key={user.id}>
                <button onClick={() => handleSelectUser(user.login)}>
                  {user.login}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default App;
