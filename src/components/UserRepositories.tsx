import React, { useState, useEffect } from "react";
import axios from "axios";

interface UserRepositoriesProps {
  username: string;
}

const UserRepositories: React.FC<UserRepositoriesProps> = ({ username }) => {
  const [repos, setRepos] = useState<any[]>([]);
  const [displayedRepos, setDisplayedRepos] = useState<any[]>([]); // Repositori yang ditampilkan
  const [loadCount, setLoadCount] = useState(5); // Jumlah repositori yang ditampilkan
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRepos = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await axios.get(`https://api.github.com/users/${username}/repos`);
        setRepos(response.data);
        setDisplayedRepos(response.data.slice(0, loadCount)); // Menampilkan repositori pertama sesuai loadCount
      } catch (err) {
        setError("Gagal memuat repositori.");
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, [username, loadCount]);

  const loadMoreRepos = () => {
    const newLoadCount = loadCount + 5; // Menambah 5 repositori
    setLoadCount(newLoadCount);
    setDisplayedRepos(repos.slice(0, newLoadCount)); // Update repositori yang ditampilkan
  };

  if (loading) return <p>Loading repositories...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h3>Repositories for {username}</h3>
      <div style={{ maxHeight: "400px", overflowY: "auto" }}>
        <ul>
          {displayedRepos.map((repo) => (
            <li key={repo.id}>
              <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                {repo.name} - {repo.stargazers_count} stars
              </a>
              <p>{repo.description}</p>
            </li>
          ))}
        </ul>
      </div>
      {displayedRepos.length < repos.length && (
        <button onClick={loadMoreRepos} className="btn btn-link">
          Load More Repositories
        </button>
      )}
    </div>
  );
};

export default UserRepositories;
