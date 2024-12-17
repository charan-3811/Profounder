import { useEffect, useState } from "react";
import alldata from "../data.json"; 
import "./Dashboard.css"; 
import TradingLineChart from "./TradeGraph";
import { SlArrowLeft,SlArrowRight, SlControlEnd, SlControlStart } from "react-icons/sl";

function Dashboard() {
  // eslint-disable-next-line no-unused-vars
  const [data, setData] = useState(alldata);
  const [top10, setTop10] = useState([]);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [entities, setEntities] = useState(20);
  const [filterOption, setFilterOption] = useState("return%");

  // Top 10 calculation
  useEffect(() => {
    let sortedData = [...data];
    if (filterOption === "return%") {
      sortedData = sortedData.sort((a, b) => b.percentReturn - a.percentReturn);
    } else if (filterOption === "profit") {
      sortedData = sortedData.sort(
        (a, b) =>
          b.currentBalance - b.startingBalance - (a.currentBalance - a.startingBalance)
      );
    }
    const toplist = sortedData.slice(0, 10);
    setTop10(toplist);
    if (toplist.length > 0) setSelectedPerson(toplist[0]);
  }, [data, filterOption]);

  useEffect(() => {
    setCurrentPage(1);
  }, [entities]);

  const paginatedLogs =
    selectedPerson?.tradingLog.slice(
      (currentPage - 1) * entities,
      currentPage * entities
    ) || [];


  return (
    <div className="dashboard">
      {/**Filter section */}
      <div className="filter-section">
        <label >Filter by:
          <select  onChange={(e) => setFilterOption(e.target.value)}>
            <option value="return%">Return%</option>
            <option value="profit">profit</option>
          </select>
        </label>
      </div>
      {/* Top Section */}
      <div className="topsection">
        {/* Leaderboard Section */}
        <div className="leaderboard">
          <h2>Leaderboard</h2>
          <table>
            <thead>
              <tr>
                <th>#Rank</th>
                <th>Name</th>
                <th>Return%</th>
                <th>Profit</th>
              </tr>
            </thead>
            <tbody>
              {top10.map((person, index) => (
                <tr
                  key={index}
                  className="leaderboard-item"
                  onClick={() => setSelectedPerson(person)}
                >
                  <td className="rank">{index + 1}.</td>
                  <td className="name">{person.name}</td>
                  <td className="return">{person.percentReturn.toFixed(2)}%</td>
                  <td className="profit"> {(person.currentBalance-person.startingBalance).toFixed()}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p>This is a collection of the top 10 Funded FunderPro Traders who are eligible for payouts. We have chosen
             to only display the top 10 for motivational purposes!
          </p>
        </div>

        {/* Performance Section */}
        {selectedPerson && (
          <div>
            <h2>{selectedPerson.name} - Performance Details</h2>
            <div className="performance">
              <div className="performance-item">
                <span>${selectedPerson.startingBalance.toFixed(2)}</span>
                <span>Starting Balance</span>
              </div>
              <div className="performance-item">
                <span>${selectedPerson.currentBalance.toFixed(2)}</span>
                <span>Current Balance</span>
              </div>
              <div className="performance-item">
                <span>${selectedPerson.cumulativePnl.toFixed(2)}</span>
                <span>Cumulative P&L</span>
              </div>
              <div className="performance-item">
                <span>{selectedPerson.percentReturn.toFixed(2)}%</span>
                <span>Return %</span>
              </div>
              <div className="performance-item">
                <span>{selectedPerson.activeDays}</span>
                <span>Active Days</span>
              </div>
              <div className="performance-item">
                <span>${selectedPerson.avgWinningTrade}</span>
                <span>AVG. Winning Trade</span>
              </div>
              <div className="performance-item">
                <span>{selectedPerson.profitFactor}</span>
                <span>Profit Factor</span>
              </div>
              <div className="performance-item">
                <span>{selectedPerson.numTradesPlaced}</span>
                <span>NO. Trades Placed</span>
              </div>
            </div>

            {/* Graph Display */}
            <TradingLineChart tradingLog={selectedPerson.tradingLog} />
          </div>
        )}
      </div>

      {/* Trading Log Section */}
      {selectedPerson && (
        <div className="trading-log">
          <h2>Trading Log</h2>
          <table>
            <thead>
              <tr>
                <th>Open Time</th>
                <th>Symbol</th>
                <th>Position Id</th>
                <th>Type</th>
                <th>Volume</th>
                <th>Open Price</th>
                <th>Close Time</th>
                <th>Close Price</th>
                <th>Profit</th>
                <th>Change</th>
              </tr>
            </thead>
            <tbody>
              {paginatedLogs.map((log, index) => (
                <tr key={index}>
                  <td>{log.openTime}</td>
                  <td>{log.symbol}</td>
                  <td>{log.positionId}</td>
                  <td>{log.type}</td>
                  <td>{log.volume}</td>
                  <td>${log.openPrice}</td>
                  <td>{log.closeTime}</td>
                  <td>${log.closePrice}</td>
                  <td>${log.profit}</td>
                  <td>{log.change}%</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination Controls */}
          <div className="pagination">
            <button onClick={() => setCurrentPage(1)}>
              <SlControlStart />
            </button>
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            >
              <SlArrowLeft />
            </button>
            <span>
              Page {currentPage} /{" "}
              {Math.ceil(selectedPerson.tradingLog.length / entities)}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) =>
                  Math.min(
                    prev + 1,
                    Math.ceil(selectedPerson.tradingLog.length / entities)
                  )
                )
              }
            >
              <SlArrowRight />
            </button>
            <button
              onClick={() =>
                setCurrentPage(
                  Math.ceil(selectedPerson.tradingLog.length / entities)
                )
              }
            >
              <SlControlEnd />
            </button>
            <label>
              Go To:
              <input
                type="number"
                min="1"
                max={Math.ceil(selectedPerson.tradingLog.length / entities)}
                value={currentPage}
                onChange={(e) => setCurrentPage(parseInt(e.target.value) || 1)}
              />
            </label>
            <label>
              Entities:
              <input
                type="number"
                min="1"
                value={entities}
                onChange={(e) => setEntities(parseInt(e.target.value) || 20)}
              />
            </label>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
