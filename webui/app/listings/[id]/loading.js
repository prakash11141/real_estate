"use client";

import { Spin, Row, Col } from "antd";

export default function Loading() {
  return (
    <Row justify="center" align="middle" style={{ height: "80vh" }}>
      <Col>
        <Spin size="large" />
      </Col>
    </Row>
  );
}
