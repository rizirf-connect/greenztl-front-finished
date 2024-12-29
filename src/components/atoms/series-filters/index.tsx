import { SortFilter, statusFilter } from "@/enums";
import { Flex, Segmented, Select } from "antd";
import React from "react";
import { genres as abc } from "@/constants/index";

interface SeriesFiltersProps {
  sort: string;
  setSort: (sort: string) => void;
  status: string;
  setStatus: (status: string) => void;
  genres: string[];
  setGenres: (genres: string[]) => void;
  order: string;
  setOrder: (order: string) => void;
}

const SeriesFilters: React.FC<SeriesFiltersProps> = ({
  sort,
  setSort,
  status,
  setStatus,
  genres,
  setGenres,
  order,
  setOrder,
}) => {
  return (
    <Flex gap={24} className="max-md:flex-col max-sm:!gap-1">
      <Flex gap={24} wrap="wrap" className="max-sm:!gap-1">
        <div>
          <h1 className="text-sm md:text-lg">Sort</h1>
          <Segmented
            options={[
              { label: "Popular", value: SortFilter.POPULAR },
              { label: "Recent", value: SortFilter.RECENT },
              { label: "Views", value: SortFilter.VIEWS },
            ]}
            value={sort}
            onChange={setSort}
          />
        </div>

        {sort === SortFilter.VIEWS && (
          <div>
            <h1 className="text-sm md:text-lg">Order</h1>
            <Segmented
              options={[
                { label: "Descending", value: "desc" }, // Descending option
                { label: "Ascending", value: "asc" }, // Ascending option
              ]}
              value={order} // Bind the order value
              onChange={setOrder} // Update the order when changed
            />
          </div>
        )}

        <div>
          <h1 className="text-sm md:text-lg">Status</h1>
          <Segmented
            options={[
              { label: "All", value: statusFilter.ALL },
              { label: "Ongoing", value: statusFilter.ONGOING },
              { label: "Completed", value: statusFilter.COMPLETED },
            ]}
            value={status}
            onChange={setStatus}
          />
        </div>
      </Flex>

      <div className="flex-1">
        <h1 className="text-sm md:text-lg">Genres</h1>
        <Select
          mode="multiple"
          placeholder="Select genres"
          style={{ width: "100%" }}
          value={genres}
          onChange={setGenres}
          options={Object.values(abc).map((key) => ({
            label: genres[key as keyof typeof genres],
            value: key,
          }))}
        />
      </div>
    </Flex>
  );
};

export default SeriesFilters;
