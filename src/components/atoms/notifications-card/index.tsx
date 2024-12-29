import React from "react";

interface NotificationCardProps {
  title: string;
  message: string;
  timeAgo: string;
}

const NotificationCard: React.FC<NotificationCardProps> = ({
  title,
  message,
  timeAgo,
}) => {
  return (
    <div className="mx-auto bg-white dark:bg-Black90 border border-gray-300 rounded-lg shadow-sm p-4">
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-semibold text-Gray900 dark:text-Gray50">
          {title}
        </h3>
        <button className="text-gray-400 hover:text-gray-600 hidden">✕</button>
      </div>
      <p className="text-Gray700 dark:text-Gray300 mt-2">{message}</p>
      <div className="flex items-center mt-4">
        <span className="h-2 w-2 bg-Primary500 rounded-full mr-2"></span>
        <p className="text-sm text-Gray500 dark:text-Gray200">{timeAgo}</p>
      </div>
    </div>
  );
};

export default NotificationCard;
