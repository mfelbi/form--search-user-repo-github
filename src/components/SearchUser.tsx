import { useState } from "react";
import axios from "axios";

interface SearchUserProps {
  setSelectedUser: (user: string) => void;
  setUsers: React.Dispatch<React.SetStateAction<any[]>>;
}

interface User {
  id: number;
  login: string;
}

const SearchUser = ({ setUsers }: SearchUserProps) => {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(`https://api.github.com/search/users?q=${username}`);
      const searchResults: User[] = response.data.items.slice(0, 5); // Ambil 5 pengguna pertama
      setUsers(searchResults); 
    } catch (err) {
      setError("Gagal memuat pengguna.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={handleSearch} disabled={loading}>
        {loading ? "Searching..." : "Search"}
      </button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default SearchUser;
