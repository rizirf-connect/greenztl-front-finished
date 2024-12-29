import { Button as AntdButton, ButtonProps as AntdButtonProps } from "antd";
import React from "react";

interface ButtonProps extends AntdButtonProps {
  text: string;
}

const Button: React.FC<ButtonProps> = ({ text, ...props }) => {
  return (
    <AntdButton
      {...props}
      className="text-sm !font-semibold py-3 px-5 !rounded-full hover:!bg-Primary1000 hover:!text-white"
    >
      {text}
    </AntdButton>
  );
};

export default Button;
