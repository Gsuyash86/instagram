import React, { useState } from "react";
import "./style.css";
import StoryPreview from "../StoryPreview/StoryPreview";

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

const initialStoryData: UserStory[] = [
  {
    userId: 1,
    username: "Suyash_Gupta",
    profilePicture: "/1.jpeg",
    seen: false,
    stories: [
      {
        id: 1,
        imageUrl: "/1.jpeg",
        timestamp: "2 hours ago",
      },
      {
        id: 2,
        imageUrl: "/2.jpeg",
        timestamp: "1 hour ago",
      },
      {
        id: 3,
        imageUrl: "/3.jpeg",
        timestamp: "1 hour ago",
      },
      {
        id: 4,
        imageUrl: "/4.jpeg",
        timestamp: "1 hour ago",
      },
    ],
  },
  {
    userId: 2,
    username: "shrey28_._",
    profilePicture: "/2.jpeg",
    seen: false,
    stories: [
      {
        id: 1,
        imageUrl: "/4.jpeg",
        timestamp: "3 hours ago",
      },
    ],
  },
  {
    userId: 3,
    username: "shrey28_._",
    profilePicture: "/3.jpeg",
    seen: false,
    stories: [
      {
        id: 1,
        imageUrl: "/5.jpeg",
        timestamp: "3 hours ago",
      },
    ],
  },
  {
    userId: 4,
    username: "shrey28_._",
    profilePicture: "/4.jpeg",
    seen: false,
    stories: [
      {
        id: 1,
        imageUrl: "/1.jpeg",
        timestamp: "3 hours ago",
      },
    ],
  },
  {
    userId: 5,
    username: "shrey28_._",
    profilePicture: "/5.jpeg",
    seen: false,
    stories: [
      {
        id: 1,
        imageUrl: "/4.jpeg",
        timestamp: "3 hours ago",
      },
    ],
  },
  {
    userId: 6,
    username: "shrey28_._",
    profilePicture: "/Insta-Icon.jpg",
    seen: false,
    stories: [
      {
        id: 1,
        imageUrl: "/3.jpeg",
        timestamp: "3 hours ago",
      },
    ],
  },
];

const StoryList: React.FC = () => {
  const [storyData, setStoryData] = useState<UserStory[]>(initialStoryData);
  const [selectedStory, setSelectedStory] = useState<UserStory | null>(null);

  const handleStoryClick = (userStory: UserStory) => {
    // Update the story to be 'seen' when clicked
    const updatedStories = storyData.map((story) =>
      story.userId === userStory.userId
        ? { ...story, seen: true } // Mark the story as seen
        : story
    );

    setStoryData(updatedStories);
    setSelectedStory(userStory);
  };

  const handleCloseStoryView = () => {
    setSelectedStory(null);
  };

  return (
    <div className="stories-wrapper">
      {selectedStory ? (
        <StoryPreview userStory={selectedStory} onClose={handleCloseStoryView} />
      ) : (
        storyData.map((story) => (
          <div
            key={story.userId}
            className={`story ${story.seen ? "seen" : "unseen"}`}
            onClick={() => handleStoryClick(story)}
          >
            <img src={story.profilePicture} alt={story.username} />
            <p>{story.username}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default StoryList;
