import React, { useState } from "react";
import { Modal, Form, Input } from "antd";
import { useMutation } from "@tanstack/react-query";
import Button from "@/components/atoms/button";
import { toast } from "react-toastify";
import VerifyOtpModal from "@/components/molecules/opt-modal";
import apiRequest from "@/utils/api-request";

// Define the types for new user data and API response
interface NewUser {
  name: string;
  email: string;
  password: string;
}

interface SignupModalProps {
  isVisible: boolean;
  onClose: () => void;
  switchToLogin: () => void;
}

const SignupModal: React.FC<SignupModalProps> = ({
  isVisible,
  onClose,
  switchToLogin,
}) => {
  const [form] = Form.useForm();
  const [otpVisible, setOtpVisible] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  // Mutation for handling signup
  const { isPending, mutate } = useMutation({
    mutationFn: (newUser: NewUser) =>
      apiRequest("auth/register", {
        body: newUser,
        method: "POST",
      }),
    onSuccess: (response: any) => {
      const { message, data } = response;
      toast.success(message || "Registration successful!");
      form.resetFields();
      if (data && data._id) {
        setUserId(data._id);
        setOtpVisible(true);
      }
      onClose();
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message ||
          "Registration failed. Please try again."
      );
    },
  });

  // Handle form submission
  const onFinish = (values: {
    username: string;
    email: string;
    password: string;
  }) => {
    mutate({
      name: values.username,
      email: values.email,
      password: values.password,
    });
  };

  return (
    <>
      <Modal title="Sign Up" open={isVisible} onCancel={onClose} footer={null}>
        <Form
          form={form}
          name="signup_form"
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please enter your username!" }]}
          >
            <Input placeholder="Enter your username" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: "Please enter your password!" },
              { min: 6, message: "Password must be at least 6 characters!" },
            ]}
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>

          <Form.Item
            label="Confirm Password"
            name="confirm_password"
            dependencies={["password"]}
            rules={[
              { required: true, message: "Please confirm your password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Passwords do not match!"));
                },
              }),
            ]}
          >
            <Input.Password placeholder="Confirm your password" />
          </Form.Item>

          <Form.Item>
            <Button
              text="Sign Up"
              htmlType="submit"
              loading={isPending}
              block
            />
          </Form.Item>
        </Form>

        <div className="text-center dark:text-white">
          <span className="text-xs md:text-base font-semibold">
            Already have an account?{" "}
          </span>
          <Button type="dashed" text="Log in" onClick={switchToLogin} />
        </div>
      </Modal>

      {/* OTP Verification Modal */}
      <VerifyOtpModal
        isVisible={otpVisible}
        onClose={() => setOtpVisible(false)}
        userId={userId}
      />
    </>
  );
};

export default SignupModal;
