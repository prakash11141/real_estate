"use client";

import { useState } from "react";
import { Input, InputNumber, Select, Button, Row, Col, Typography } from "antd";

const { Option } = Select;
const { Text } = Typography;

export default function FilterBar({ onChange }) {
  const [filters, setFilters] = useState({
    keyword: "",
    price_min: undefined,
    price_max: undefined,
    beds: undefined,
    baths: undefined,
    suburb: "",
    propertyType: "",
  });

  const handleSearch = () => {
    const cleanedFilters = Object.fromEntries(
      Object.entries(filters).filter(
        ([_, v]) => v !== undefined && v !== "" && !Number.isNaN(v),
      ),
    );

    onChange(cleanedFilters);
  };
  return (
    <div style={{ padding: 20 }}>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={3} lg={3}>
          <Text strong>Keyword</Text>
          <Input
            placeholder="Keyword"
            value={filters.keyword}
            onChange={(e) =>
              setFilters({ ...filters, keyword: e.target.value })
            }
          />
        </Col>

        <Col xs={24} sm={12} md={3} lg={3}>
          <Text strong>Min Price</Text>
          <InputNumber
            placeholder="Min Price"
            value={filters.price_min}
            onChange={(value) =>
              setFilters({ ...filters, price_min: value ?? undefined })
            }
            style={{ width: "100%" }}
            min={0}
          />
        </Col>

        <Col xs={24} sm={12} md={3} lg={3}>
          <Text strong>Max Price</Text>
          <InputNumber
            placeholder="Max Price"
            value={filters.price_max}
            onChange={(value) =>
              setFilters({ ...filters, price_max: value ?? undefined })
            }
            style={{ width: "100%" }}
            min={0}
          />
        </Col>

        <Col xs={24} sm={12} md={3} lg={3}>
          <Text strong>Beds</Text>
          <InputNumber
            placeholder="Beds"
            value={filters.beds}
            onChange={(value) =>
              setFilters({ ...filters, beds: value ?? undefined })
            }
            style={{ width: "100%" }}
            min={0}
          />
        </Col>

        <Col xs={24} sm={12} md={3} lg={3}>
          <Text strong>Baths</Text>
          <InputNumber
            placeholder="Baths"
            value={filters.baths}
            onChange={(value) =>
              setFilters({ ...filters, baths: value ?? undefined })
            }
            style={{ width: "100%" }}
            min={0}
          />
        </Col>

        <Col xs={24} sm={12} md={3} lg={3}>
          <Text strong>Location</Text>
          <Input
            placeholder="Suburb"
            value={filters.suburb}
            onChange={(e) => setFilters({ ...filters, suburb: e.target.value })}
          />
        </Col>

        <Col xs={24} sm={12} md={3} lg={3}>
          <Text strong>Property Type</Text>
          <Select
            placeholder="Property Type"
            value={filters.propertyType || undefined}
            onChange={(value) =>
              setFilters({ ...filters, propertyType: value })
            }
            style={{ width: "100%" }}
            allowClear
          >
            <Option value="apartment">Apartment</Option>
            <Option value="house">House</Option>
            <Option value="banglo">Banglo</Option>
            <Option value="villa">Villa</Option>
          </Select>
        </Col>

        <Col
          xs={24}
          sm={12}
          md={8}
          lg={3}
          style={{ display: "flex", alignItems: "end" }}
        >
          <Button
            type="primary"
            onClick={handleSearch}
            style={{ width: "100%" }}
          >
            Search
          </Button>
        </Col>
      </Row>
    </div>
  );
}
