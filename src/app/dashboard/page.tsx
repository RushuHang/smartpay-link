"use client";

import React from "react";
import {
  Layout,
  Card,
  Row,
  Col,
  Typography,
  Button,
  Tag,
  Statistic,
  Space,
  Grid,
} from "antd";
import {
  ArrowUpOutlined,
  LinkOutlined,
  WalletOutlined,
  BankOutlined,
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
} from "recharts";

const { Title, Text } = Typography;
const { Content } = Layout;
const { useBreakpoint } = Grid;

// --- 1. THEME & COLORS ---
const colors = {
  primary: "#0066B3",
  navy: "#003A66",
  secondary: "#003A66",
  lightBlue: "#E6F2FF",
  white: "#FFFFFF",
  success: "#52c41a",
  textSecondary: "#64748b",
  esewa: "#60BB46",
  khalti: "#5C2D91",
  smartQr: "#003A66",
  netbanking: "#13C2C2",
  card: "#FAAD14",
};

// --- 2. MOCK DATA ---
const chartData = [
  { name: "Mon", income: 4000 },
  { name: "Tue", income: 3000 },
  { name: "Wed", income: 2000 },
  { name: "Thu", income: 2780 },
  { name: "Fri", income: 1890 },
  { name: "Sat", income: 2390 },
  { name: "Sun", income: 3490 },
];

const paymentData = [
  { name: "Smart QR", value: 35, color: colors.smartQr },
  { name: "eSewa", value: 25, color: colors.esewa },
  { name: "Khalti", value: 15, color: colors.khalti },
  { name: "Card", value: 15, color: colors.card },
  { name: "Netbanking", value: 10, color: colors.netbanking },
];

// --- 3. SUB-COMPONENTS ---

const DashboardCard = ({
  children,
  title,
  extra,
}: {
  children: React.ReactNode;
  title?: string;
  extra?: React.ReactNode;
}) => {
  const screens = useBreakpoint();
  
  return (
    <Card
      variant="borderless"
      title={
        title ? (
          <span style={{ color: colors.navy, fontWeight: 600, fontSize: screens.md ? 16 : 15 }}>
            {title}
          </span>
        ) : null
      }
      extra={extra}
      style={{
        borderRadius: "12px",
        boxShadow: "0 4px 20px rgba(0, 58, 102, 0.05)",
        height: "100%", // Ensures cards in the same row stretch to equal height
        display: "flex",
        flexDirection: "column",
      }}
      styles={{ 
        body: { 
          padding: screens.xs ? "16px" : "24px",
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minHeight: 0 // Prevent flex overflow
        },
        header: {
          padding: screens.xs ? "16px 16px 0 16px" : "24px 24px 0 24px",
          minHeight: screens.xs ? 48 : 56,
        }
      }}
    >
      {children}
    </Card>
  );
};

const StatCard = ({ title, value, prefix, icon }: any) => {
  const screens = useBreakpoint();
  
  return (
    <DashboardCard>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "16px",
        }}
      >
        <div>
          <Text type="secondary" style={{ fontSize: "14px", display: 'block', marginBottom: 4 }}>
            {title}
          </Text>
          <Statistic
            value={value}
            prefix={prefix}
            styles={{
              content:{
                color: colors.navy,
                fontWeight: 700,
                fontSize: screens.lg ? "28px" : screens.md ? "26px" : "24px",
                lineHeight: 1.2,
              }
            }}
          />
        </div>
        <div
          style={{
            backgroundColor: colors.lightBlue,
            padding: screens.xs ? "8px" : "12px",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            marginLeft: "12px",
          }}
        >
          {React.cloneElement(icon, {
            style: { fontSize: screens.xs ? "20px" : "24px", color: colors.primary },
          })}
        </div>
      </div>
      
      <div style={{ marginTop: "auto", display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
        <Tag
          color="blue"
          style={{
            margin: 0,
            borderRadius: "10px",
            backgroundColor: colors.lightBlue,
            color: colors.primary,
            border: "none",
            fontSize: "12px",
            lineHeight: "20px"
          }}
        >
          <ArrowUpOutlined /> 12%
        </Tag>
        <Text type="secondary" style={{ fontSize: "12px" }}>
          vs last week
        </Text>
      </div>
    </DashboardCard>
  );
};

// --- 4. MAIN COMPONENT ---

export default function MerchantDashboard() {
  const screens = useBreakpoint();

  // Dynamic spacing based on screen size
  const gutter: [number, number] = screens.md ? [24, 24] : [16, 16];
  const chartHeight = screens.xs ? 220 : 300;
  const pieHeight = screens.xs ? 180 : 200;

  return (
    <Layout style={{ backgroundColor: "#F5F7FA", minHeight: "100vh" }}>
      <Content 
        style={{ 
          padding: screens.lg ? "32px 40px" : screens.md ? "24px" : "16px",
          maxWidth: "1600px", 
          margin: "0 auto",
          width: "100%"
        }}
      >
        {/* --- HEADER --- */}
        <div
          style={{
            display: "flex",
            flexDirection: screens.md ? "row" : "column",
            justifyContent: "space-between",
            alignItems: screens.md ? "center" : "flex-start",
            marginBottom: screens.md ? "32px" : "24px",
            gap: "12px",
          }}
        >
          <div>
            <Title 
              level={2} 
              style={{ 
                color: colors.navy, 
                margin: "0 0 4px 0", 
                fontSize: screens.lg ? "30px" : screens.md ? "26px" : "24px" 
              }}
            >
              Dashboard
            </Title>
            <Text type="secondary" style={{ fontSize: screens.xs ? "13px" : "14px" }}>
              Overview of your financial performance
            </Text>
          </div>
        </div>

        {/* --- STATS ROW --- */}
        <Row gutter={gutter}>
          <Col xs={24} sm={12} md={12} lg={6}>
            <StatCard
              title="Total Revenue"
              value="24,500"
              prefix="$"
              icon={<WalletOutlined />}
            />
          </Col>
          <Col xs={24} sm={12} md={12} lg={6}>
            <StatCard title="Active Links" value="12" icon={<LinkOutlined />} />
          </Col>
          <Col xs={24} sm={12} md={12} lg={6}>
            <StatCard
              title="Settlements Pending"
              value="1,250"
              prefix="$"
              icon={<BankOutlined />}
            />
          </Col>
          <Col xs={24} sm={12} md={12} lg={6}>
            <Card
              variant="borderless"
              style={{
                backgroundColor: colors.navy,
                borderRadius: "12px",
                height: "100%",
                color: colors.white,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                boxShadow: "0 4px 20px rgba(0, 58, 102, 0.05)",
              }}
              styles={{ body: { padding: screens.xs ? "20px" : "24px" } }}
            >
              <Statistic
                title={
                  <span style={{ color: colors.lightBlue, fontSize: "14px" }}>Plan Usage</span>
                }
                value={85}
                suffix={<span style={{fontSize: '14px', marginLeft: 4}}>/ 100 Links</span>}
                styles={{ 
                  content:{
                    color: colors.white, 
                    fontSize: screens.lg ? "28px" : "24px",
                    fontWeight: 700 
                  }
                }}
              />
              <div style={{ marginTop: "12px" }}>
                <Text style={{ color: colors.lightBlue, fontSize: "13px" }}>Pro Plan Active</Text>
              </div>
            </Card>
          </Col>
        </Row>

        {/* --- MAIN CONTENT ROW --- */}
        <Row gutter={gutter} style={{ marginTop: screens.md ? "24px" : "16px" }}>
          
          {/* 1. REVENUE CHART */}
          <Col xs={24} md={24} lg={12}>
            <DashboardCard title="Revenue Trends">
              <div style={{ width: "100%", minWidth: 0 }}>
                {/* FIX: Passed chartHeight directly to ResponsiveContainer */}
                <ResponsiveContainer width="100%" height={chartHeight}>
                  <AreaChart data={chartData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={colors.primary} stopOpacity={0.2} />
                        <stop offset="95%" stopColor={colors.primary} stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                    <XAxis
                      dataKey="name"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: colors.textSecondary, fontSize: 12 }}
                      interval="preserveStartEnd"
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
                      dataKey="income"
                      stroke={colors.primary}
                      strokeWidth={3}
                      fillOpacity={1}
                      fill="url(#colorIncome)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </DashboardCard>
          </Col>

          {/* 2. PAYMENT METHODS PIE CHART */}
          <Col xs={24} md={12} lg={6}>
            <DashboardCard title="Payment Methods">
              <div style={{ width: "100%", minWidth: 0 }}>
                {/* FIX: Passed pieHeight directly to ResponsiveContainer */}
                <ResponsiveContainer width="100%" height={pieHeight}>
                  <PieChart>
                    <Pie
                      data={paymentData}
                      cx="50%"
                      cy="50%"
                      innerRadius={screens.xs ? 45 : 50}
                      outerRadius={screens.xs ? 65 : 70}
                      paddingAngle={4}
                      dataKey="value"
                      stroke="none"
                    >
                      {paymentData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value) => (value != null ? `${value}%` : "")}
                      contentStyle={{
                        borderRadius: "8px",
                        border: "none",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Legend with Auto-Wrap */}
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "8px 12px",
                  marginTop: "auto",
                  paddingTop: "16px",
                  justifyContent: "center",
                }}
              >
                {paymentData.map((item) => (
                  <div
                    key={item.name}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      fontSize: "12px",
                    }}
                  >
                    <div
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        backgroundColor: item.color,
                        marginRight: 6,
                        flexShrink: 0,
                      }}
                    />
                    <Text type="secondary" style={{ fontSize: "12px" }}>{item.name}</Text>
                  </div>
                ))}
              </div>
            </DashboardCard>
          </Col>

          {/* 3. TOP LINKS */}
          <Col xs={24} md={12} lg={6}>
            <DashboardCard title="Top Performing Links">
              <Space
                orientation="vertical"
                style={{ width: "100%" }}
                size="middle"
              >
                {["Summer Sale 2024", "Consultation", "E-Book V1"].map(
                  (item, index) => (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        paddingBottom: "12px",
                        borderBottom: index < 2 ? "1px solid #f0f0f0" : "none",
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0, flex: 1 }}>
                        <div
                          style={{
                            width: 8,
                            height: 8,
                            borderRadius: "50%",
                            backgroundColor: colors.primary,
                            flexShrink: 0
                          }}
                        />
                        <Text
                          strong
                          ellipsis
                          style={{ color: colors.navy, fontSize: "13px" }}
                        >
                          {item}
                        </Text>
                      </div>
                      <Text type="secondary" style={{ fontSize: "13px", marginLeft: 8, whiteSpace: 'nowrap' }}>
                        $1,200
                      </Text>
                    </div>
                  ),
                )}
              </Space>
              <div style={{ marginTop: 'auto', paddingTop: '24px' }}>
                 <Button
                  type="dashed"
                  block
                  style={{
                    borderColor: colors.primary,
                    color: colors.primary,
                    fontSize: "13px",
                    height: "36px"
                  }}
                >
                  View All Links
                </Button>
              </div>
            </DashboardCard>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}