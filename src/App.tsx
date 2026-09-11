import "./App.css";
import { useState, useEffect, type FormEvent } from "react";
import Header from "./components/Header";
import QueueSummary from "./components/QueueSummary";
import QueueList from "./components/QueueList";
import AddGroupForm from "./components/AddGroupForm";
import BoardingStatus from "./components/BoardingStatus";
import QueueStatus from "./components/QueueStatus";
import type QueueEntry  from "./types/QueueEntry";
const QUEUE_URL = "/initial-queue.json";
async function fetchQueue(): Promise<QueueEntry[]> {
  const response = await fetch(QUEUE_URL);
  if (!response.ok) {
    throw new Error("Failed to fetch Queue");
  }
  const data = await response.json();
  return data;
}
function App() {
  const [queue, setQueue] = useState<QueueEntry[]>([]);
  const [isLoadingQueue, setIsLoadingQueue] = useState(true);
  const [hasQueueError, setHasQueueError] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [riders, setRiders] = useState("");
  const [lastBoarded, setLastBoarded] = useState<QueueEntry | null>(null);
  async function loadQueue() {
    setIsLoadingQueue(true);
    setHasQueueError(false);
    try {
      const QueueData = await fetchQueue();
      setQueue(QueueData);
    } catch (error) {
      console.error("Error loading Queue:", error);
      setHasQueueError(true);
    } finally {
      setIsLoadingQueue(false);
    }
  }
  useEffect(() => {
    loadQueue();
  }, []);
  const frontGroup = queue[0];
  const groupsWaiting = queue.length;
  const totalRiders = queue.reduce((total, group) => {
    return total + group.riders;
  }, 0);
  function handleAddGroup(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (groupName === "") return;
    if (riders === "") return;
    const ridersNumber = Number(riders);
    if (ridersNumber <= 0) return;
    if (Number.isNaN(ridersNumber)) return;
    const newGroup: QueueEntry = {
      id: Date.now(),
      groupName: groupName,
      riders: ridersNumber,
    };
    setQueue((currentQueue) => [...currentQueue, newGroup]);
    setGroupName("");
    setRiders("");
  }
  function handleBoardNext() {
    if (queue.length === 0) return;
    const boardNext = queue[0];
    setLastBoarded(boardNext);
    setQueue((currentQueue) => currentQueue.slice(1));
  }
  return (
    <div className="page">
      {" "}
      <div className="app">
        {" "}
        <Header />{" "}
        <main className="container">
          {" "}
          <QueueSummary
            groupsWaiting={groupsWaiting}
            totalRiders={totalRiders}
          />{" "}
          <section className="queue-section">
            {" "}
            <h2>Waiting Queue</h2>{" "}
            {queue.length === 0 ? (
              <div className="empty-queue">
                {" "}
                <p>No groups are currently waiting.</p>{" "}
              </div>
            ) : (
              queue.map((group) => (
                <QueueList
                  key={group.id}
                  groupName={group.groupName}
                  riders={group.riders}
                  isNext={group.id === frontGroup?.id}
                />
              ))
            )}{" "}
          </section>{" "}
          <AddGroupForm
            groupName={groupName}
            setGroupName={setGroupName}
            riders={riders}
            setRiders={setRiders}
            handleAddGroup={handleAddGroup}
          />{" "}
          <button
            type="button"
            className="board-button"
            onClick={handleBoardNext}
            disabled={queue.length === 0}
          >
            {" "}
            Board Next{" "}
          </button>{" "}
          <BoardingStatus lastBoarded={lastBoarded} />{" "}
          <QueueStatus
            isLoading={isLoadingQueue}
            hasError={hasQueueError}
            loadQueue={loadQueue}
          />{" "}
        </main>{" "}
      </div>{" "}
    </div>
  );
}
export default App;
