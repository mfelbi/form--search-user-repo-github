import { useState } from "react";
import SearchUser from "./components/SearchUser";
import UserRepositories from "./components/UserRepositories";
import "./App.css";

const App = () => {
  const [selectedUser, setSelectedUser] = useState<string | null>(null); // State untuk user yang dipilih
  const [users, setUsers] = useState<any[]>([]); // State untuk hasil pencarian
  const [isRepositoryVisible, setIsRepositoryVisible] = useState<boolean>(false); // Mengontrol tampilan repositori

  const handleSelectUser = (user: string) => {
    setSelectedUser(user); // Pilih user
    setIsRepositoryVisible(true); // Tampilkan repositori ketika user dipilih
  };

  const handleCloseRepository = () => {
    setIsRepositoryVisible(false); // Menyembunyikan repositori, kembali ke pencarian
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
