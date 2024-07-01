// app/home/page.tsx
'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Head from 'next/head';

const Home = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [keyword, setKeyword] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      const result = await response.json();
      setData(result);
      setFilteredData(result);
    };

    fetchData();
  }, []);

  const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const keyword = e.target.value;
    setKeyword(keyword);
    const filtered = data.filter((item) =>
      item.title.toLowerCase().includes(keyword.toLowerCase())
    );
    setFilteredData(filtered);
  };
  const handleBackToLogin = () => {
    router.push('/login');
  };

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold mb-4">Posts</h1>
            <button
                onClick={handleBackToLogin}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
                Back to Login
            </button>
        </div>
        <input
          type="text"
          value={keyword}
          onChange={handleFilter}
          placeholder="Search by title..."
          className="w-full p-2 border border-gray-300 rounded mb-4 text-black"
        />
        <div className="grid grid-cols-1 gap-4">
          {filteredData.map((item) => (
            <div key={item.id} className="bg-white p-4 rounded shadow">
              <h2 className="text-black text-xl font-bold">{item.title}</h2>
              <p className="text-black">{item.body}</p>
              
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
