import React, { useState, useEffect } from 'react';
import ConfettiExplosion from 'react-confetti-explosion';

// set PORT=5000 && npm start 修改端口，6110投票 6111結果 
const ENV_PORT = window.location.port;
console.log("The application is running on port:", ENV_PORT);

// localhost本地開發，backend_app容器開發，似乎不需要，只要空出localhost的8000端口即可
// const HOST = 'backend_app';
const HOST = 'localhost';

function App() {
  const [catCount, setCatCount] = useState(0);
  const [dogCount, setDogCount] = useState(0);
  const [isCatHovered, setIsCatHovered] = useState(false);
  const [isDogHovered, setIsDogHovered] = useState(false);
  const [voteOption, setVote] = useState(null);
  const [isVoted, setIsVoted] = useState(false);
  const [showExplosion, setShowExplosion] = useState(false);
  const [lastVote, setLastVote] = useState(null);
  const [catLastVote, setCatLastVote] = useState(null);
  const [dogLastVote, setDogLastVote] = useState(null);

  // Vote 模式
  let totalCount = catCount + dogCount;
  let catPercentage = 50;
  let dogPercentage = 50;

  const webMode = ENV_PORT == '6111' ? 'result' : 'vote';
  if (webMode == 'result') {
    // TODO: Result 模式
    catPercentage = totalCount === 0 ? 50 : (catCount / totalCount) * 100;
    dogPercentage = totalCount === 0 ? 50 : (dogCount / totalCount) * 100;
  } else {
    // Vote 模式
    if (voteOption) {
      catPercentage = voteOption === 'Cats' ? 100 : 0;
      dogPercentage = voteOption === 'Dogs' ? 100 : 0;
    }
  }

  useEffect(() => {
    if (webMode == 'result') {
      get_result();
    }
  }, [])

  // 訪問後端投票API
  const vote = async () => {
    setIsVoted(true);
    setShowExplosion(true);

    const res = await fetch(`http://${HOST}:8000/vote`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ option: voteOption })
    });
    console.log('res:', res);
    if (res.status === 200) {
      console.log('投票成功');
      setTimeout(() => setShowExplosion(false), 3000); // 設置動畫持續時間
    } else {
      alert('投票失敗');
    }
  }


  // 獲取投票結果
  const get_result = async () => {
    const res = await fetch(`http://${HOST}:8000/results`);
    const data = await res.json();
    let catJSON = data.find((item) => item.option === 'Cats');
    let dogJSON = data.find((item) => item.option === 'Dogs');
    console.log('catJSON:', catJSON);
    console.log('dogJSON:', dogJSON);
    setCatCount(catJSON.vote_number);
    setDogCount(dogJSON.vote_number);
    setCatLastVote(catJSON.last_vote);
    setDogLastVote(dogJSON.last_vote);
  }

  return (
    <div className="flex flex-row h-screen w-screen">
      <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 '>
        {/* 投票頁 */}
        {webMode == 'vote' ? (<>
          {!isVoted && (
            <h1 className="mb-5 text-3xl font-bold text-white hover:scale-110 transition-all">Cats or Dogs?</h1>
          )}

          {!isVoted && (<>
            <button
              onClick={() => {
                // setCatCount(catCount + 1)
                setVote('Cats')
              }}
              className="bg-white  text-green-500 font-bold py-4 px-6 rounded m-2 transition-transform transform 
            hover:scale-110 hover:text-lg shadow-md"
              onMouseEnter={() => setIsCatHovered(true)}
              onMouseLeave={() => setIsCatHovered(false)}
            >
              Cats🐱
              {/* ({catPercentage.toFixed(2)}%) */}
            </button>
            <button
              onClick={() => {
                // setDogCount(dogCount + 1)
                setVote('Dogs')
              }}
              className="bg-white  text-blue-500 font-bold py-4 px-6 rounded m-2 transition-transform transform 
            hover:scale-110 hover:text-lg shadow-md"
              onMouseEnter={() => setIsDogHovered(true)}
              onMouseLeave={() => setIsDogHovered(false)}
            >
              Dogs🐶
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
                // 查看投票結果，跳轉6111
                window.location.href = `http://localhost:6111`;
              }}
              className="bg-white  text-black font-bold py-4 px-6 rounded m-2 transition-transform transform hover:scale-110 shadow-md"
            >
              Check Result 🎉🎉🎉🎊🎊🎊
            </button>
          </>)}
        </>) : (<>
          {/* 結果頁 */}
          <h1 className="text-3xl font-bold text-white hover:scale-110 transition-all">Voting Results</h1>
          <h2 className="text-2xl font-bold text-white hover:scale-110 transition-all">Cats🐱: {catCount} Votes  {catPercentage.toFixed(2)}%</h2>
          <h1 className="text-l font-bold text-white hover:scale-110 transition-all">Last Vote: {new Date(catLastVote).toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' })}</h1>
          <br />
          <h2 className="text-2xl font-bold text-white hover:scale-110 transition-all">Dogs🐶: {dogCount} Votes  {dogPercentage.toFixed(2)}%</h2>
          <h1 className="text-l font-bold text-white hover:scale-110 transition-all">Last Vote: {new Date(dogLastVote).toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' })}</h1>
          <button
            onClick={() => {
              // 繼續投票，跳轉6110
              window.location.href = `http://localhost:6110`;
            }}
            className="bg-white  text-black font-bold py-4 px-6 rounded m-2 transition-transform transform hover:scale-110 shadow-md"
          >
            Vote Again🐱🐶
          </button>
        </>)}</div>


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