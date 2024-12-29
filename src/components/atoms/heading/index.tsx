import React from "react";

interface HeadingProps extends React.HTMLProps<HTMLHeadingElement> {
  text: string;
  className?: string;
}

const Heading: React.FC<HeadingProps> = ({ className, text, ...props }) => {
  return (
    <h1
      className={`text-lg text-Primary1000 dark:text-Primary1000 md:text-2xl pb-2 sm:pb-3 font-semibold dark:bg-Primary700 ${className}`}
      {...props}
    >
      {text}
    </h1>
  );
};

export default Heading;
