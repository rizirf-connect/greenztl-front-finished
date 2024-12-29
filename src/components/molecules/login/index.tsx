import React, { useState } from "react";
import { Modal, Form, Input } from "antd";
import Button from "@/components/atoms/button";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { setUser } from "@/store/slices/user.slice";
import ApiRequest from "@/utils/api-request";

interface LoginModalProps {
  isVisible: boolean;
  onClose: () => void;
  switchToSignup: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({
  isVisible,
  onClose,
  switchToSignup,
}) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const onFinish = async (values: { email: string; password: string }) => {
    setLoading(true);
    try {
      const response = await ApiRequest("auth/login", {
        method: "POST",
        body: values,
      });
      dispatch(setUser({ ...response.user, token: response.token }));
      toast.success(response.message);
      setLoading(false);
      onClose();
      form.resetFields();
    } catch (error: any) {
      console.log(error);
      toast.error(error.message || "Login failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <Modal title="Login" open={isVisible} onCancel={onClose} footer={null}>
      <Form name="login_form" onFinish={onFinish} layout="vertical">
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please enter your email!" }]}
        >
          <Input placeholder="Enter your email" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please enter your password!" }]}
        >
          <Input.Password placeholder="Enter your password" />
        </Form.Item>

        <Form.Item>
          <Button text="Login" htmlType="submit" loading={loading} block />
        </Form.Item>
      </Form>

      <div className="text-center dark:text-white">
        <span>Don&#39;t have an account? </span>
        <Button type="dashed" text="Sign up" onClick={switchToSignup} />
      </div>
    </Modal>
  );
};

export default LoginModal;
