import { act } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import StoryPreview from "./StoryPreview";

const mockUserStory = {
  userId: 1,
  username: "john_doe",
  profilePicture: "4.jpeg",
  seen: false,
  stories: [
    { id: 1, imageUrl: "1.jpeg", timestamp: "10:00 AM" },
    { id: 2, imageUrl: "2.jpeg", timestamp: "10:05 AM" },
    { id: 3, imageUrl: "3.jpeg", timestamp: "10:10 AM" },
  ],
};

describe("StoryPreview Component", () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.useFakeTimers();
    render(<StoryPreview userStory={mockUserStory} onClose={mockOnClose} />);
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.clearAllMocks();
  });

  test("renders user profile and username", () => {
    const profilePic = screen.getByAltText("john_doe");
    expect(profilePic).toBeInTheDocument();
    expect(profilePic).toHaveAttribute("src", "4.jpeg");
    const username = screen.getByText("john_doe");
    expect(username).toBeInTheDocument();
  });

  test("renders the first story initially", () => {
    const storyImage = screen.getByAltText("Story 1");
    expect(storyImage).toBeInTheDocument();
    expect(storyImage).toHaveAttribute("src", "1.jpeg");
  });

  test("navigates to the next story automatically", () => {
    act(() => {
      jest.advanceTimersByTime(6000);
    });
    const storyImage = screen.getByAltText("Story 2");
    expect(storyImage).toBeInTheDocument();
  });

  // test("closes story view after the last story", () => {
  //   act(() => {
  //     jest.advanceTimersByTime(20000);
  //   });
  //   expect(mockOnClose).toHaveBeenCalledTimes(1);
  // });

  test("clicking on progress bar navigates to specific story", () => {
    const progressContainers = screen.getAllByRole("button");
    fireEvent.click(progressContainers[3]);
    const storyImage = screen.getByAltText("Story 3");
    expect(storyImage).toBeInTheDocument();
  });

  test("clicking on close button triggers onClose", () => {
    const closeButton = screen.getByText("✖");
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalled();
  });

  test("clicking on story content goes to next story", () => {
    const storyContent = screen.getByRole("img", { name: "Story 1" });
    fireEvent.click(storyContent);

    const storyImage = screen.getByAltText("Story 2");
    expect(storyImage).toBeInTheDocument();
  });

  test("progress resets when changing stories manually", () => {
    const progressContainers = screen.getAllByRole("button");
    fireEvent.click(progressContainers[1]);

    const progressBars = screen.getAllByRole("button");
    expect(progressBars[1]).toHaveStyle("width: 0%");
  });
});
