import React, { useState } from "react";
import { Modal, Form, Input } from "antd";
import axios from "axios";
import { toast } from "react-toastify";
import Button from "@/components/atoms/button";
import apiRequest from "@/utils/api-request";

interface VerifyOtpModalProps {
  isVisible: boolean;
  onClose: () => void;
  userId: string | null;
}

const VerifyOtpModal: React.FC<VerifyOtpModalProps> = ({
  isVisible,
  onClose,
  userId,
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: { otp: string }) => {
    if (!userId) return;

    setLoading(true);
    try {
      const response = await apiRequest("/auth/verify", {
        body: {
          userId,
          otp: values.otp,
        },
        method: "POST",
      });
      toast.success(response.message || "OTP verified successfully!");
      form.resetFields();
      onClose();
    } catch (error) {
      toast.error("OTP verification failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal title="Verify OTP" open={isVisible} onCancel={onClose} footer={null}>
      <Form
        form={form}
        name="verify_otp_form"
        onFinish={onFinish}
        layout="vertical"
      >
        <Form.Item
          label="Enter OTP"
          name="otp"
          rules={[{ required: true, message: "Please enter the OTP!" }]}
        >
          <Input maxLength={6} placeholder="Enter the OTP sent to your email" />
        </Form.Item>
        <Form.Item>
          <Button text="Verify OTP" htmlType="submit" loading={loading} block />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default VerifyOtpModal;
