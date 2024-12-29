import { Segmented } from "antd";
import React from "react";

interface SegmentsProps {
  onSegmentChange: (value: string) => void;
}

const Segments: React.FC<SegmentsProps> = ({ onSegmentChange }) => {
  const handleChange = (value: string) => {
    onSegmentChange(value);
  };

  return (
    <Segmented
      className="!mb-5"
      options={[
        { label: "Fantasy", value: "fantasy" },
        { label: "Action", value: "action" },
        { label: "Romance", value: "romance" },
      ]}
      onChange={handleChange}
    />
  );
};

export default Segments;
