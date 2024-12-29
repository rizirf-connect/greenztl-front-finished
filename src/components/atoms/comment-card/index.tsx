import React, { FC, useState } from "react";
import { useSelector } from "react-redux";
import { Comment } from "@/types";
import { FaThumbsUp, FaThumbsDown, FaReply } from "react-icons/fa";
import { Input, Button, Flex } from "antd";
import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Refetch } from "@/types";
import apiRequest from "@/utils/api-request";

interface CommentCardProps extends Comment {
  refetch: Refetch;
}

const CommentCard: FC<CommentCardProps> = ({
  _id,
  content,
  dislikes,
  likes,
  userId,
  createdAt,
  replies = [],
  refetch,
}) => {
  const user = useSelector((state: any) => state.user);
  const [showReplies, setShowReplies] = useState(false);
  const [likeCount, setLikeCount] = useState(likes?.length || 0);
  const [dislikeCount, setDislikeCount] = useState(dislikes?.length || 0);
  const [replyContent, setReplyContent] = useState("");
  const [replying, setReplying] = useState(false);

  const hasLiked = likes?.includes(user?.id);
  const hasDisliked = dislikes?.includes(user?.id);

  const toggleReplies = () => {
    setShowReplies(!showReplies);
    if (replies.length === 0) {
      setReplying(!replying);
    }
  };

  const { mutate: handleLikeDislike } = useMutation<
    { success: boolean; likes: string[]; dislikes: string[] },
    AxiosError, // error type
    { type: "like" | "dislike" }
  >({
    mutationFn: async ({ type }) => {
      return await apiRequest(`comments/${_id}/like-dislike`, {
        method: "POST",
        body: {
          userId: user.id,
          type,
        },
      });
    },
    onSuccess: (data: any) => {
      setLikeCount(data.comment.likes.length);
      setDislikeCount(data.comment.dislikes.length);
      refetch();
    },
    onError: (error: any) => {
      console.error("Error updating like/dislike:", error);
    },
  });

  const handleReplySubmit = () => {
    setReplyContent("");
    setReplying(false);
  };

  return (
    <div className="text-Black100 border border-Gray600 dark:border-Gray200 p-4 rounded-lg mb-4 dark:text-white">
      {/* User and Created At */}
      <div className="flex justify-between items-center mb-2">
        <span className="font-semibold dark:text-Gray200">{userId?.name}</span>
        {createdAt && (
          <span className="text-sm text-Gray800 dark:text-Gray400">
            {new Date(createdAt).toLocaleDateString()}
          </span>
        )}
      </div>

      {/* Comment Content */}
      <p className="dark:text-Gray300 mb-2">{content}</p>

      {/* Likes and Dislikes */}
      <div className="flex items-center space-x-4">
        <button
          onClick={() => handleLikeDislike({ type: "like" })}
          className={`flex items-center ${hasLiked ? "text-successDark" : ""}`}
        >
          <FaThumbsUp
            className={`mr-1 ${hasLiked ? "text-blue-500" : "text-gray-400"}`}
          />{" "}
          <span>{likeCount || 0}</span>
        </button>

        <button
          onClick={() => handleLikeDislike({ type: "dislike" })}
          className={`flex items-center ${
            hasDisliked ? "text-dangerDark" : ""
          }`}
        >
          <FaThumbsDown
            className={`mr-1 ${hasDisliked ? "text-red-500" : "text-gray-400"}`}
          />{" "}
          <span>{dislikeCount || 0}</span>
        </button>

        {/* Reply Button with Icon */}
        {/* <button
          onClick={toggleReplies}
          className="flex items-center mt-2 text-blue-600 text-sm font-medium"
        >
          <FaReply className="mr-1" />
          {replies.length === 0 && !replying
            ? "Reply"
            : showReplies
            ? "Hide Replies"
            : `${replies.length} Repl${replies.length > 1 ? "ies" : "y"}`}
        </button> */}
      </div>

      {/* Reply Input Field (Always render if replying is true) */}
      {replying && (
        <Flex className="mt-2">
          <Input.TextArea
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            placeholder="Write your reply..."
            autoSize={{ minRows: 1, maxRows: 5 }}
            className="w-full mb-2 dark:bg-Gray700 dark:text-white"
          />
          <Button onClick={handleReplySubmit} disabled={!replyContent.trim()}>
            Submit
          </Button>
        </Flex>
      )}

      {/* Replies (Expand/Collapse based on state) */}
      {showReplies && replies.length > 0 && (
        <div className="ml-4 border-l-2 border-Gray300 dark:border-Gray200 pl-4 mt-2">
          {replies.map((reply) => (
            <CommentCard key={reply._id} {...reply} refetch={refetch} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentCard;
