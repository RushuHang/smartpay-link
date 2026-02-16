"use client";

import React from "react";
import { Layout, Card, Row, Col, Typography, Tag, Statistic, Grid, Table, Avatar, Button, Space } from "antd";

import {
  ShopOutlined,
  TransactionOutlined,
  BankOutlined,
  SafetyCertificateOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  UserAddOutlined,
  WarningOutlined,
  CheckCircleOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";

const { Title, Text } = Typography;
const { Content } = Layout;
const { useBreakpoint } = Grid;

// --- 1. THEME & COLORS (Matches Merchant Dashboard) ---
const colors = {
  primary: "#0066B3",
  navy: "#003A66",
  lightBlue: "#E6F2FF",
  white: "#FFFFFF",
  success: "#52c41a",
  warning: "#faad14",
  error: "#ff4d4f",
  textSecondary: "#64748b",
  // Chart Colors
  chart1: "#0066B3",
  chart2: "#60BB46",
  chart3: "#5C2D91",
  chart4: "#FAAD14",
  chart5: "#13C2C2",
};

// --- 2. ADMIN MOCK DATA ---

// Platform Revenue Trend
const revenueData = [
  { name: "Jan", revenue: 45000 },
  { name: "Feb", revenue: 52000 },
  { name: "Mar", revenue: 48000 },
  { name: "Apr", revenue: 61000 },
  { name: "May", revenue: 55000 },
  { name: "Jun", revenue: 67000 },
  { name: "Jul", revenue: 72000 },
];

// Payment Method Distribution (Platform Wide)
const paymentMethodData = [
  { name: "Smart QR", value: 400, color: colors.navy },
  { name: "eSewa", value: 300, color: colors.chart2 },
  { name: "Khalti", value: 200, color: colors.chart3 },
  { name: "Cards", value: 150, color: colors.chart4 },
  { name: "Netbanking", value: 100, color: colors.chart5 },
];

// Top Merchants Data
const topMerchants = [
  {
    key: "1",
    name: "TechGadgets Nepal",
    revenue: "$12,450",
    txns: 342,
    status: "Active",
  },
  {
    key: "2",
    name: "Himalayan Coffee",
    revenue: "$9,200",
    txns: 512,
    status: "Active",
  },
  {
    key: "3",
    name: "Kathmandu Gear",
    revenue: "$8,100",
    txns: 120,
    status: "Warning",
  },
  {
    key: "4",
    name: "Urban Sole",
    revenue: "$6,500",
    txns: 210,
    status: "Active",
  },
  {
    key: "5",
    name: "Organic Farms",
    revenue: "$3,200",
    txns: 85,
    status: "Suspended",
  },
];

// Recent Activity / Alerts
const recentActivity = [
  {
    type: "signup",
    message: "New merchant 'Bhatbhateni Online' registered",
    time: "10 min ago",
  },
  {
    type: "alert",
    message: "High failure rate detected on Bank X",
    time: "45 min ago",
  },
  {
    type: "settlement",
    message: "Batch settlement #9921 approved",
    time: "2 hrs ago",
  },
  {
    type: "signup",
    message: "Merchant 'Pokhara Stays' KYC submitted",
    time: "5 hrs ago",
  },
];

// --- 3. REUSABLE COMPONENTS ---

// Consistent Card Style
const DashboardCard = ({ children, title, extra, bodyStyle }: any) => {
  const screens = useBreakpoint();
  return (
    <Card
      variant="borderless"
      title={
        title ? (
          <span
            style={{ color: colors.navy, fontWeight: 600, fontSize: "16px" }}
          >
            {title}
          </span>
        ) : null
      }
      extra={extra}
      style={{
        borderRadius: "12px",
        boxShadow: "0 4px 20px rgba(0, 58, 102, 0.05)",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
      styles={{
        body: {
          padding: screens.xs ? "16px" : "24px",
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minHeight: 0,
          ...bodyStyle,
        },
        header: {
          padding: screens.xs ? "16px 16px 0 16px" : "24px 24px 0 24px",
          minHeight: 48,
        },
      }}
    >
      {children}
    </Card>
  );
};

// Stat Card (Adapted for Admin Data)
const StatCard = ({ title, value, prefix, icon, trend, subValue }: any) => {
  const screens = useBreakpoint();

  return (
    <DashboardCard>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "16px",
        }}
      >
        <div>
          <Text
            type="secondary"
            style={{ fontSize: "14px", display: "block", marginBottom: 4 }}
          >
            {title}
          </Text>
          <Statistic
            value={value}
            prefix={prefix}
            styles={{
              content: {
                color: colors.navy,
                fontWeight: 700,
                fontSize: screens.lg ? "28px" : "24px",
              },
            }}
          />
          {subValue && (
            <Text type="secondary" style={{ fontSize: "12px" }}>
              {subValue}
            </Text>
          )}
        </div>
        <div
          style={{
            backgroundColor: colors.lightBlue,
            padding: "12px",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "48px",
            width: "48px",
          }}
        >
          {React.cloneElement(icon, {
            style: { fontSize: "24px", color: colors.primary },
          })}
        </div>
      </div>

      <div
        style={{
          marginTop: "auto",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <Tag
          style={{
            margin: 0,
            borderRadius: "10px",
            backgroundColor: trend > 0 ? "#f6ffed" : "#fff1f0",
            color: trend > 0 ? colors.success : colors.error,
            border: "none",
            fontSize: "12px",
          }}
        >
          {trend > 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}{" "}
          {Math.abs(trend)}%
        </Tag>
        <Text type="secondary" style={{ fontSize: "12px" }}>
          vs last month
        </Text>
      </div>
    </DashboardCard>
  );
};

// --- 4. MAIN ADMIN DASHBOARD ---

export default function AdminDashboard() {
  const screens = useBreakpoint();
  const gutter: [number, number] = [24, 24];

  return (
    <Layout style={{ backgroundColor: "#F5F7FA", minHeight: "100vh" }}>
      <Content
        style={{
          padding: screens.lg ? "32px 40px" : "24px",
          maxWidth: "1600px",
          margin: "0 auto",
          width: "100%",
        }}
      >
        {/* HEADER */}
        <div style={{ marginBottom: "32px" }}>
          <Title level={2} style={{ color: colors.navy, margin: "0 0 4px 0" }}>
            Admin Dashboard
          </Title>
          <Text type="secondary">
            Overview of platform performance and merchant activity
          </Text>
        </div>

        {/* TOP STATS CARDS */}
        <Row gutter={gutter}>
          <Col xs={24} sm={12} lg={6}>
            <StatCard
              title="Total Merchants"
              value="1,245"
              icon={<ShopOutlined />}
              trend={8.5}
            />
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <StatCard
              title="Total Transactions"
              value="$4.2M"
              subValue="850k Transactions"
              icon={<TransactionOutlined />}
              trend={12.4}
            />
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <StatCard
              title="Pending Settlements"
              value="$125k"
              icon={<BankOutlined />}
              trend={-2.1}
            />
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <StatCard
              title="Active Subscriptions"
              value="892"
              icon={<SafetyCertificateOutlined />}
              trend={5.3}
            />
          </Col>
        </Row>

        {/* CHARTS SECTION */}
        <Row gutter={gutter} style={{ marginTop: "24px" }}>
          {/* Revenue Chart */}
          <Col xs={24} lg={16}>
            <DashboardCard title="Platform Revenue Trends">
              <div style={{ height: 300, width: "100%" }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={revenueData}
                    margin={{ top: 10, right: 0, left: -20, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                        <stop
                          offset="5%"
                          stopColor={colors.primary}
                          stopOpacity={0.2}
                        />
                        <stop
                          offset="95%"
                          stopColor={colors.primary}
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="#f0f0f0"
                    />
                    <XAxis
                      dataKey="name"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: colors.textSecondary, fontSize: 12 }}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: colors.textSecondary, fontSize: 12 }}
                    />
                    <Tooltip
                      contentStyle={{
                        borderRadius: "8px",
                        border: "none",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stroke={colors.primary}
                      strokeWidth={3}
                      fillOpacity={1}
                      fill="url(#colorRev)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </DashboardCard>
          </Col>

          {/* Payment Methods Pie */}
          <Col xs={24} lg={8}>
            <DashboardCard title="Payment Distribution">
              <div style={{ height: 220, width: "100%" }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={paymentMethodData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {paymentMethodData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              {/* Custom Legend */}
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  gap: "8px 16px",
                  marginTop: 16,
                }}
              >
                {paymentMethodData.map((item) => (
                  <div
                    key={item.name}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      fontSize: 12,
                    }}
                  >
                    <span
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        background: item.color,
                        marginRight: 6,
                      }}
                    ></span>
                    <Text type="secondary">{item.name}</Text>
                  </div>
                ))}
              </div>
            </DashboardCard>
          </Col>
        </Row>

        {/* BOTTOM SECTION: TABLES & ACTIVITY */}
        <Row gutter={gutter} style={{ marginTop: "24px" }}>
          {/* Top Merchants Table */}
          <Col xs={24} lg={15}>
            <DashboardCard
              title="Top Performing Merchants"
              extra={
                <Button type="link" size="small">
                  View All
                </Button>
              }
              bodyStyle={{ padding: 0 }} // Remove padding for table edge-to-edge look
            >
              <Table
                dataSource={topMerchants}
                pagination={false}
                rowKey="key"
                columns={[
                  {
                    title: "Merchant Name",
                    dataIndex: "name",
                    key: "name",
                    render: (text) => (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 12,
                        }}
                      >
                        <Avatar
                          style={{
                            backgroundColor: colors.lightBlue,
                            color: colors.primary,
                          }}
                        >
                          {text[0]}
                        </Avatar>
                        <Text strong style={{ color: colors.navy }}>
                          {text}
                        </Text>
                      </div>
                    ),
                  },
                  {
                    title: "Revenue",
                    dataIndex: "revenue",
                    key: "revenue",
                  },
                  {
                    title: "Txns",
                    dataIndex: "txns",
                    key: "txns",
                    responsive: ["md"],
                  },
                  {
                    title: "Status",
                    dataIndex: "status",
                    key: "status",
                    render: (status) => {
                      let color =
                        status === "Active"
                          ? "success"
                          : status === "Warning"
                            ? "warning"
                            : "error";
                      return (
                        <Tag color={color} style={{ borderRadius: 10 }}>
                          {status}
                        </Tag>
                      );
                    },
                  },
                ]}
              />
            </DashboardCard>
          </Col>

          {/* Recent Activity Feed */}
          <Col xs={24} lg={9}>
            <DashboardCard
              title="Recent Activity"
              extra={<Button type="text" icon={<MoreOutlined />} />}
            >
              <Space orientation="vertical" style={{ width: "100%" }}>
                {recentActivity.map((item, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      gap: 12,
                      alignItems: "center",
                      padding: "12px 0",
                      borderBottom:
                        index === recentActivity.length - 1
                          ? "none"
                          : "1px solid #f0f0f0",
                    }}
                  >
                    <div
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: "50%",
                        background:
                          item.type === "alert"
                            ? "#fff1f0"
                            : item.type === "signup"
                              ? "#f6ffed"
                              : "#e6f7ff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {item.type === "alert" && (
                        <WarningOutlined style={{ color: colors.error }} />
                      )}
                      {item.type === "signup" && (
                        <UserAddOutlined style={{ color: colors.success }} />
                      )}
                      {item.type === "settlement" && (
                        <CheckCircleOutlined
                          style={{ color: colors.primary }}
                        />
                      )}
                    </div>
                    <div>
                      <Text style={{ fontSize: 13, fontWeight: 500 }}>
                        {item.message}
                      </Text>
                      <br />
                      <Text type="secondary" style={{ fontSize: 12 }}>
                        {item.time}
                      </Text>
                    </div>
                  </div>
                ))}
              </Space>
            </DashboardCard>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}
