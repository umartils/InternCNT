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
        <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
        />
      </Head>
      <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
  <h1 className="text-3xl font-bold">Posts</h1>
  <button
    onClick={handleBackToLogin}
    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
  >
    Back to Login
  </button>
</div>
<div className="relative flex items-center mb-4">
  <svg
    className="absolute left-3 h-5 w-5 text-gray-500"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    strokeWidth="2"
    stroke="currentColor"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" />
    <circle cx="10" cy="10" r="7" />
    <line x1="21" y1="21" x2="15" y2="15" />
  </svg>
  <input
    type="text"
    value={keyword}
    onChange={handleFilter}
    placeholder="Search by title..."
    className="w-full pl-10 p-2 border bg-gray-800 text-white border-gray-800 rounded"
  />
</div>

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
