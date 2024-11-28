import React, { useState } from 'react';
import ConfettiExplosion from 'react-confetti-explosion';

const ENV_PORT = process.env.REACT_APP_PORT;
console.log("The application is running on port:", ENV_PORT);

function App() {
  const [catCount, setCatCount] = useState(0);
  const [dogCount, setDogCount] = useState(0);
  const [isCatHovered, setIsCatHovered] = useState(false);
  const [isDogHovered, setIsDogHovered] = useState(false);
  const [voteOption, setVote] = useState(null);
  const [isVoted, setIsVoted] = useState(false);
  const [showExplosion, setShowExplosion] = useState(false);

  // Vote 模式
  let totalCount = catCount + dogCount;
  let catPercentage = 50;
  let dogPercentage = 50;

  if (ENV_PORT == '6111') {
    // TODO: Result 模式
    catPercentage = totalCount === 0 ? 50 : (catCount / totalCount) * 100;
    dogPercentage = totalCount === 0 ? 50 : (dogCount / totalCount) * 100;
  } else {
    // Vote 模式
    if (voteOption) {
      catPercentage = voteOption === 'Cat' ? 100 : 0;
      dogPercentage = voteOption === 'Dog' ? 100 : 0;
    }
  }


  // TODO: 整合API
  const vote = async () => {
    setIsVoted(true);
    setShowExplosion(true);
    setTimeout(() => setShowExplosion(false), 3000); // 設置動畫持續時間
  }


  // TODO: 獲取投票結果
  const get_result = async () => {

  }

  return (
    <div className="flex flex-row h-screen w-screen">
      <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 '>
        {!isVoted && (
          <h1 className="mb-5 text-3xl font-bold text-white hover:scale-110 transition-all">Cats or Dogs?</h1>
        )}

        {!isVoted && (<>
          <button
            onClick={() => {
              // setCatCount(catCount + 1)
              setVote('Cat')
            }}
            className="bg-white  text-green-500 font-bold py-4 px-6 rounded m-2 transition-transform transform hover:scale-110 shadow-md"
            onMouseEnter={() => setIsCatHovered(true)}
            onMouseLeave={() => setIsCatHovered(false)}
          >
            Cat
            {/* ({catPercentage.toFixed(2)}%) */}
          </button>
          <button
            onClick={() => {
              // setDogCount(dogCount + 1)
              setVote('Dog')
            }}
            className="bg-white  text-blue-500 font-bold py-4 px-6 rounded m-2 transition-transform transform hover:scale-110 shadow-md"
            onMouseEnter={() => setIsDogHovered(true)}
            onMouseLeave={() => setIsDogHovered(false)}
          >
            Dog
            {/* ({dogPercentage.toFixed(2)}%) */}
          </button>
        </>)}

        {voteOption && (<div className='mt-5'>
          <h1 className="text-3xl font-bold text-white hover:scale-110 transition-all">You Choose {voteOption} ! 🎉🎊</h1>

          {!isVoted && (<button
            onClick={() => vote()}
            className="bg-white  text-black font-bold py-4 px-6 rounded m-2 transition-transform transform hover:scale-110 shadow-md"
          >
            Confirm Vote
          </button>)}
        </div>)}

        {isVoted && (<>
          {showExplosion && <ConfettiExplosion />}
          <button
            onClick={() => {
              // TODO: 查看投票結果，跳轉6111
              window.location.href = 'http://localhost:6111';
            }}
            className="bg-white  text-black font-bold py-4 px-6 rounded m-2 transition-transform transform hover:scale-110 shadow-md"
          >
            Check Result 🎉🎉🎉🎊🎊🎊
          </button>
        </>)}
      </div>


      {/* ###背景### */}
      {/* 綠色背景 */}
      <div
        // style={{ flexBasis: isCatHovered ? (catPercentage > 80 ? `${catPercentage}%` : '80%') : `${catPercentage}%` }}
        style={{ flexBasis: `${catPercentage}%` }}
        className="bg-green-400 transition-all duration-300"
        onMouseEnter={() => setIsCatHovered(true)}
        onMouseLeave={() => setIsCatHovered(false)}
      ></div>
      {/* 藍色背景 */}
      <div
        // style={{ flexBasis: isDogHovered ? (dogPercentage > 80 ? `${dogPercentage}%` : '80%') : `${dogPercentage}%` }}
        style={{ flexBasis: `${dogPercentage}%` }}
        className="bg-blue-400 transition-all duration-300"
        onMouseEnter={() => setIsDogHovered(true)}
        onMouseLeave={() => setIsDogHovered(false)}
      ></div>
    </div>
  )
}

export default App;