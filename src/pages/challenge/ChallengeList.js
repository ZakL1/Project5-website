import { useEffect, useState } from "react";
import axios from "axios";

const ChallengeList = () => {
  const [challenges, setChallenges] = useState([]);

  useEffect(() => {
    axios.get("/api/challenges/")
      .then(res => setChallenges(res.data))
      .catch(err => console.error("Error fetching challenges", err));
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Photo Challenges</h1>
      <div className="space-y-6">
        {challenges.length > 0 ? (
          challenges.map((challenge) => (
            <div key={challenge.id} className="bg-white shadow-md rounded-xl p-6 border border-gray-200">
              <h2 className="text-xl font-semibold mb-2 text-blue-600">{challenge.title}</h2>
              <p className="text-gray-700 mb-3">{challenge.description}</p>
              <p className="text-sm text-gray-500">
                🗓 {challenge.start_date} – {challenge.end_date}
              </p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600">No challenges found. Check back soon!</p>
        )}
      </div>
    </div>
  );
};

export default ChallengeList;