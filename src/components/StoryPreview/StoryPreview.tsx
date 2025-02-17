import React, { useState, useEffect } from "react";
import "./style.css";

interface Story {
  id: number;
  imageUrl: string;
  timestamp: string;
}

interface UserStory {
  userId: number;
  username: string;
  profilePicture: string;
  seen: boolean;
  stories: Story[];
}

interface StoryViewProps {
  userStory: UserStory;
  onClose: () => void;
}

const StoryPreview: React.FC<StoryViewProps> = ({ userStory, onClose }) => {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const handleNextStory = () => {
    if (currentStoryIndex < userStory.stories.length - 1) {
      setCurrentStoryIndex(currentStoryIndex + 1);
    } else {
      onClose();
    }
  };

  const handleSpecificStory = (index: number) => {
    setCurrentStoryIndex(index);
    setProgress(0);
  };

  useEffect(() => {
    setProgress(0);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev < 100) {
          return prev + 1;
        } else {
          clearInterval(progressInterval);
          handleNextStory();
          return 0;
        }
      });
    }, 50);

    return () => clearInterval(progressInterval);
  }, [currentStoryIndex]);

  return (
    <div className="story-view-wrapper">
      <div className="story-header">
        <img src={userStory.profilePicture} alt={userStory.username} className="profile-pic" />
        <p className="username">{userStory.username}</p>
        <p className="timestamp">{userStory.stories[currentStoryIndex].timestamp}</p>
        <button className="close-btn" onClick={onClose}>✖</button>
      </div>

      <div className="story-progress-bar">
        {userStory.stories.map((_, index) => (
          <div key={index} className="progress-container" onClick={() => handleSpecificStory(index)}>
            <div 
              role="button"
              className={`progress-bar ${index < currentStoryIndex ? "filled" : ""}`} 
              style={{
                width: index === currentStoryIndex ? `${progress}%` : index < currentStoryIndex ? '100%' : '0%'
              }}
            ></div>
          </div>
        ))}
      </div>

      <div className="story-content" onClick={handleNextStory}>
        <img src={userStory.stories[currentStoryIndex].imageUrl} alt={`Story ${currentStoryIndex + 1}`} />
      </div>
    </div>
  );
};

export default StoryPreview;
