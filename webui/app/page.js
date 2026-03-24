"use client";
import { useState, useEffect } from "react";
import {
  Row,
  Col,
  Card,
  Layout,
  Spin,
  Typography,
  Pagination as AntPagination,
  Space,
  Image,
} from "antd";
import { fetchListings } from "./lib/api";
import FilterBar from "./components/FilterBar";
import { useRouter } from "next/navigation";

const { Title, Text } = Typography;
const { Content } = Layout;

export default function Home() {
  const router = useRouter();
  const [listings, setListings] = useState([]);
  const [initialLoading, setInitialLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit] = useState(12);
  const [total, setTotal] = useState(0);
  const [filters, setFilters] = useState({});
  const [loading, setLoading] = useState(false);
  const totalPages = Math.ceil(total / limit);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await fetchListings({ page, limit, ...filters });
        setListings(data.items || []);
        setTotal(data.total || 0);
      } catch (err) {
        console.error("Error fetching listings:", err);
      } finally {
        setLoading(false);
        setInitialLoading(false);
      }
    };
    fetchData();
  }, [page, filters]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setPage(1);
  };
  const goToDetail = (id) => {
    router.push(`/listings/${id}`);
  };

  if (initialLoading) {
    return (
      <div style={{ textAlign: "center", marginTop: 100 }}>
        <Spin size="large" />
      </div>
    );
  }
  return (
    <Layout
      style={{ background: "#ffffff", padding: "20px", minHeight: "100vh" }}
    >
      <Content>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px" }}>
          <Row justify="center" style={{ marginBottom: 20 }}>
            <Title level={2}>Real-Estate Property</Title>
          </Row>
          <div
            style={{
              marginBottom: 20,
              padding: 16,
              background: "#f5f5f5",
              borderRadius: 8,
            }}
          >
            <div style={{ marginBottom: 20 }}>
              <FilterBar onChange={handleFilterChange} />
            </div>
          </div>
          {loading ? (
            <Spin
              description="Loading Property..."
              size="large"
              style={{ display: "block", textAlign: "center", marginTop: 50 }}
            />
          ) : (
            <Row gutter={[16, 16]}>
              {listings.length > 0 ? (
                listings.map((listing) => (
                  <Col key={listing.id} xs={24} sm={12} md={8} lg={6}>
                    <Card
                      hoverable
                      onClick={() => goToDetail(listing.id)}
                      style={{
                        cursor: "pointer",
                        background: "#f5f5f5",
                        borderRadius: 8,
                      }}
                      cover={
                        <Image
                          alt={listing.title}
                          src={
                            listing.image ||
                            "https://www.satyamevgroups.com/blog/wp-content/uploads/2019/12/residential-apartment-in-patna-840x480.jpg"
                          }
                          style={{ height: 180, objectFit: "cover" }}
                        />
                      }
                    >
                      <Card.Meta
                        description={
                          <div>
                            <Space
                              orientation="vertical"
                              size={8}
                              style={{ width: "100%" }}
                            >
                              <Row justify="space-between" align="middle">
                                <Col>
                                  <Text strong style={{ fontSize: 16 }}>
                                    {listing.title}
                                  </Text>
                                </Col>
                                <Col>
                                  <Text strong style={{ color: "#1890ff" }}>
                                    NPR {listing.price.toLocaleString()}
                                  </Text>
                                </Col>
                              </Row>

                              <Row justify="space-between">
                                <Col>
                                  <Text>Beds: {listing.beds}</Text>
                                </Col>
                                <Col>
                                  <Text>Baths: {listing.baths}</Text>
                                </Col>
                              </Row>

                              <Text>Type: {listing.propertyType}</Text>
                              <Text>Location: {listing.suburb}</Text>
                              <Text>{listing.description}</Text>
                            </Space>
                          </div>
                        }
                      />
                    </Card>
                  </Col>
                ))
              ) : (
                <p>No properties found.</p>
              )}
            </Row>
          )}

          {totalPages > 1 && (
            <div
              style={{
                marginTop: 20,
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <AntPagination
                current={page}
                total={total}
                pageSize={limit}
                onChange={(p) => setPage(p)}
                showSizeChanger={false}
              />
            </div>
          )}
        </div>
      </Content>
    </Layout>
  );
}
