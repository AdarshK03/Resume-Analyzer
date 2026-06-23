import { useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import api from '../services/api';

function Dashboard() {
  const navigate =
    useNavigate();

  const [history,
    setHistory] =
    useState([]);

  useEffect(() => {
    fetchHistory();
  }, []);

  async function fetchHistory() {
    try {
      const token =
        localStorage.getItem(
          'token'
        );

      const res =
        await api.get(
          '/resume/history',
          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }
        );

      setHistory(
        res.data
      );

    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="min-h-screenp-10">
      <h1 className="text-4xl font-bold mb-10">
        Resume Analyzer
      </h1>

      <h2 className="text-2xl mb-8">
        Welcome back 👋
      </h2>

      <button
        onClick={() =>navigate('/upload')}className=" bg-black text-white px-6 py-3 rounded mb-10">
        Upload Resume
      </button>

      <h2
        className="
          text-2xl
          font-bold
          mb-5
        "
      >
        Recent Analyses
      </h2>

      {
        history
          .slice(0, 3)
          .map((item) => (
            <div
              key={item.id}
              onClick={() =>
                navigate(
                  `/analysis/${item.id}`
                )
              }
              className="
                border
                p-5
                rounded
                mb-5
                cursor-pointer
              "
            >
              <h3
                className="
                  font-bold
                "
              >
                {
                  item.file_name
                }
              </h3>

              <p>
                Score:
                {' '}
                {
                  item.total_score
                }
              </p>
            </div>
          ))
      }

      <button
        onClick={() =>
          navigate(
            '/history'
          )
        }
        className="
          bg-slate-700
          text-white
          px-6
          py-3
          rounded
        "
      >
        View Full History
      </button>

    </div>
  );
}

export default Dashboard;