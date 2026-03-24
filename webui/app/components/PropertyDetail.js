"use client";

import {
  Card,
  Row,
  Col,
  Typography,
  Divider,
  Space,
  Tag,
  Image,
  Alert,
} from "antd";
import { EnvironmentOutlined, UserOutlined } from "@ant-design/icons";

export default function PropertyDetail({ listing }) {
  const propertyImage =
    listing.image_url ||
    "https://www.satyamevgroups.com/blog/wp-content/uploads/2019/12/residential-apartment-in-patna-840x480.jpg";

  return (
    <Row justify="center" style={{ padding: "30px" }}>
      <Col xs={24} sm={22} md={18} lg={14}>
        <Card
          variant={false}
          style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.1)" }}
        >
          <Space orientation="vertical" size="middle" style={{ width: "100%" }}>
            <Image
              src={propertyImage}
              alt={listing.title}
              width="100%"
              style={{ borderRadius: 8 }}
            />

            <Row justify="space-between" align="middle">
              <Col>
                <Typography.Title level={2} style={{ margin: 0 }}>
                  {listing.title}
                </Typography.Title>
              </Col>
              <Col>
                <Typography.Text
                  strong
                  style={{ fontSize: 18, color: "#1890ff" }}
                >
                  NPR {listing.price.toLocaleString()}
                </Typography.Text>
              </Col>
            </Row>

            <Space size="middle">
              <Tag color="blue">{listing.beds} Beds</Tag>
              <Tag color="green">{listing.baths} Baths</Tag>
              {listing.propertyType && (
                <Tag color="purple">{listing.propertyType}</Tag>
              )}
            </Space>
            <Divider />

            <Row gutter={16} align="middle">
              <Col span={12}>
                <Typography.Text strong>
                  <UserOutlined style={{ marginRight: 6 }} />
                  Agent:
                </Typography.Text>
                <Typography.Text style={{ marginLeft: 4 }}>
                  {listing.agent.name}
                </Typography.Text>
              </Col>
              <Col span={12}>
                <Typography.Text strong>
                  <EnvironmentOutlined style={{ marginRight: 6 }} />
                  Location:
                </Typography.Text>
                <Typography.Text style={{ marginLeft: 4 }}>
                  {listing.suburb}
                </Typography.Text>
              </Col>
            </Row>

            <Divider />

            <div>
              <Typography.Text strong>Description:</Typography.Text>
              <Typography.Paragraph style={{ marginTop: 4 }}>
                {listing.description}
              </Typography.Paragraph>
            </div>

            {listing.internalNotes && (
              <Alert
                title="Admin Notes"
                description={listing.internalNotes}
                type="warning"
                showIcon
                style={{ marginTop: 16 }}
              />
            )}
          </Space>
        </Card>
      </Col>
    </Row>
  );
}
