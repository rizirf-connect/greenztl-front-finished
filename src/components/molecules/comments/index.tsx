import React, { useState } from "react";
import CommentCard from "@/components/atoms/comment-card";
import { GoInfo } from "react-icons/go";
import { Flex, Popover, Input, Button, Spin } from "antd";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { Comment } from "@/types";
import apiRequest from "@/utils/api-request";

interface NewComment {
  userId: string;
  chapterId: string;
  content: string;
}

const popoverContent = (
  <div className="p-2 max-w-sm">
    <h2 className="text-lg font-semibold mb-4">Community Guidelines:</h2>
    <ul className="list-disc list-inside text-sm text-Gray700 space-y-2">
      <li>Be respectful and kind to others</li>
      <li>Stay on topic and avoid spam or self-promotion</li>
      <li>Use appropriate language for the target audience</li>
      <li>
        Write clear, meaningful comments that contribute to the discussion
      </li>
    </ul>
    <p className="text-sm text-Gray600 mt-4">
      Violating these guidelines may result in temporary suspension of Atom
      rewards.
    </p>
    <p className="text-sm text-Gray600 mt-2">
      Please report any violations to help maintain a positive community.
    </p>
  </div>
);

const ChapterComments = () => {
  const [newComment, setNewComment] = useState<string>("");
  const user = useSelector((state: any) => state.user);
  const { chapter: chapterId } = useParams();
  const {
    data: fetchedComments,
    isLoading: isCommentsLoading,
    refetch,
  } = useQuery({
    queryKey: ["comments", chapterId],
    queryFn: async () => {
      const data = await apiRequest(`/comments?chapterId=${chapterId}`, {
        method: "GET",
      });
      return data;
    },
    enabled: !!chapterId,
  });

  // Mutation to add a new comment
  const { isPending: isSubmitting, mutate: addComment } = useMutation({
    mutationFn: (newComment: NewComment) =>
      apiRequest("/comments", { method: "POST", body: newComment }),
    onSuccess: (response) => {
      const { message } = response;
      setNewComment("");
      toast.success(message || "Comment added successfully!");
      refetch();
    },
  });

  const handleCommentSubmit = () => {
    if (!user.isLoggedIn) {
      toast.warn("Please log in to add comments");
      setNewComment("");
      return;
    }

    const commentData: NewComment = {
      userId: user.id,
      chapterId: chapterId as string,
      content: newComment,
    };

    addComment(commentData);
  };

  return (
    <div className="w-full px-[4vw] lg:px-[20vw] mx-auto dark:bg-Gray900 text-white">
      <Flex align="center" className="text-black dark:text-white">
        <Popover content={popoverContent}>
          <GoInfo className="cursor-help" size={20} />
        </Popover>
        <h1 className="text-xl font-semibold p-4">
          {fetchedComments?.length || 0} Comments
        </h1>
      </Flex>

      <Flex className="mb-4">
        <Input.TextArea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add your comment..."
          autoSize={{ minRows: 1, maxRows: 5 }}
          className="w-full mb-2 dark:bg-Gray700 dark:text-white"
        />
        <Button
          onClick={handleCommentSubmit}
          disabled={!newComment.trim() || isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </Flex>

      {isCommentsLoading ? (
        <Spin tip="Loading comments..." />
      ) : (
        fetchedComments?.map((comment: Comment) => (
          <CommentCard key={comment._id} {...comment} refetch={refetch} />
        ))
      )}
    </div>
  );
};

export default ChapterComments;
