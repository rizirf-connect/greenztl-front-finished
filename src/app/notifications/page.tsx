"use client";
import React, { useState } from "react";
import NotificationCard from "@/components/atoms/notifications-card";
import { Empty, Pagination, Spin } from "antd";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ErrorMessage from "@/components/atoms/error-message";
import DataLoader from "@/components/atoms/data-loader";
import { formatDistanceToNow } from "date-fns";
import apiRequest from "@/utils/api-request";

interface Notification {
  _id: string;
  title: string;
  message: string;
  createdAt: Date;
}

const fetchNotifications = async (
  page: number,
  notificationsPerPage: number
) => {
  const data = await apiRequest(
    `notifications?page=${page}&limit=${notificationsPerPage}`
  );
  return data;
};

const Notifications: React.FC = () => {
  const notificationsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: notifications,
    isLoading,
    error,
  } = useQuery<Notification[], Error>({
    queryKey: ["notifications"],
    queryFn: () => fetchNotifications(currentPage, notificationsPerPage),
  });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-10">
        <DataLoader />
      </div>
    );
  }

  if (error) {
    return <ErrorMessage />;
  }

  return (
    <div className="px-2 md:px-8 lg:px-[8vw] xl:px-[15vw] py-4 bg-Gray200 dark:bg-Black100 space-y-4">
      {notifications && notifications.length > 0 ? (
        notifications?.map((notification) => (
          <NotificationCard
            key={notification._id}
            title={notification.title}
            message={notification.message}
            timeAgo={formatDistanceToNow(new Date(notification.createdAt), {
              addSuffix: true,
            })}
          />
        ))
      ) : (
        <Empty />
      )}

      <div className="flex justify-center mt-6">
        <Pagination
          current={currentPage}
          pageSize={notificationsPerPage}
          total={notifications?.length || 0}
          onChange={handlePageChange}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
};

export default Notifications;
