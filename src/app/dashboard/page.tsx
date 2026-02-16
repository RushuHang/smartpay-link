"use client";

import React from "react";
import { Layout, Card, Row, Col, Typography, Button, Tag, Statistic, Space } from "antd";
import { ArrowUpOutlined, LinkOutlined, WalletOutlined, BankOutlined } from "@ant-design/icons";
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
  Cell
} from "recharts";

const { Title, Text } = Typography;
const { Content } = Layout;

// --- 1. THEME & COLORS ---
const colors = {
  primary: "#0066B3",
  navy: "#003A66",
  secondary: "#003A66",
  lightBlue: "#E6F2FF",
  white: "#FFFFFF",
  success: "#52c41a",
  textSecondary: "#64748b",
  // Brand Specific Colors
  esewa: "#60BB46",
  khalti: "#5C2D91",
  smartQr: "#003A66",
  netbanking: "#13C2C2",
  card: "#FAAD14"
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

const DashboardCard = ({ children, title, extra }: { children: React.ReactNode; title?: string; extra?: React.ReactNode }) => (
  <Card
    bordered={false}
    title={title ? <span style={{ color: colors.navy, fontWeight: 600 }}>{title}</span> : null}
    extra={extra}
    style={{
      borderRadius: "12px",
      boxShadow: "0 4px 20px rgba(0, 58, 102, 0.05)",
      height: "100%",
    }}
    styles={{ body:{padding: "24px"} }}
  >
    {children}
  </Card>
);

const StatCard = ({ title, value, prefix, icon }: any) => (
  <DashboardCard>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <div>
        <Text type="secondary" style={{ fontSize: "14px" }}>
          {title}
        </Text>
        <div style={{ marginTop: "8px" }}>
          <Statistic value={value} prefix={prefix} valueStyle={{ color: colors.navy, fontWeight: 700, fontSize: "28px" }} />
        </div>
      </div>
      <div
        style={{
          backgroundColor: colors.lightBlue,
          padding: "12px",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {React.cloneElement(icon, { style: { fontSize: "24px", color: colors.primary } })}
      </div>
    </div>
    <div style={{ marginTop: "16px", display: "flex", gap: "8px", alignItems: "center" }}>
      <Tag color="blue" style={{ margin: 0, borderRadius: "10px", backgroundColor: colors.lightBlue, color: colors.primary, border: "none" }}>
        <ArrowUpOutlined /> 12%
      </Tag>
      <Text type="secondary" style={{ fontSize: "12px" }}>
        vs last week
      </Text>
    </div>
  </DashboardCard>
);

// --- 4. MAIN COMPONENT ---

export default function MerchantDashboard() {
  return (
    <Layout style={{ backgroundColor: "#F5F7FA", minHeight: "100vh" }}>
      <Content style={{ padding: "24px 40px" }}>
        {/* --- HEADER --- */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" }}>
          <div>
            <Title level={2} style={{ color: colors.navy, margin: 0 }}>
              Dashboard
            </Title>
            <Text type="secondary">Overview of your financial performance</Text>
          </div>
        </div>

        {/* --- STATS ROW --- */}
        <Row gutter={[24, 24]}>
          <Col xs={24} sm={12} lg={6}>
            <StatCard title="Total Revenue" value="24,500" prefix="$" icon={<WalletOutlined />} />
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <StatCard title="Active Links" value="12" icon={<LinkOutlined />} />
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <StatCard title="Settlements Pending" value="1,250" prefix="$" icon={<BankOutlined />} />
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card
              bordered={false}
              style={{
                backgroundColor: colors.navy,
                borderRadius: "12px",
                height: "100%",
                color: colors.white,
              }}
            >
              <Statistic
                title={<span style={{ color: colors.lightBlue }}>Plan Usage</span>}
                value={85}
                suffix="/ 100 Links"
                valueStyle={{ color: colors.white }}
              />
              <div style={{ marginTop: "12px" }}>
                <Text style={{ color: colors.lightBlue }}>Pro Plan Active</Text>
              </div>
            </Card>
          </Col>
        </Row>

        {/* --- MAIN CONTENT ROW --- */}
        <Row gutter={[24, 24]} style={{ marginTop: "24px" }}>
          
          {/* 1. REVENUE CHART (Adjusted width) */}
          <Col xs={24} lg={12}>
            <DashboardCard title="Revenue Trends">
              <div style={{ height: 300, width: "100%" }}>
                <ResponsiveContainer>
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={colors.primary} stopOpacity={0.2} />
                        <stop offset="95%" stopColor={colors.primary} stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: colors.textSecondary }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: colors.textSecondary }} />
                    <Tooltip contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }} />
                    <Area type="monotone" dataKey="income" stroke={colors.primary} strokeWidth={3} fillOpacity={1} fill="url(#colorIncome)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </DashboardCard>
          </Col>

          {/* 2. PAYMENT METHODS PIE CHART (New Component) */}
          <Col xs={24} lg={6}>
            <DashboardCard title="Payment Methods">
              <div style={{ height: 200, width: "100%" }}>
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      data={paymentData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={70}
                      paddingAngle={4}
                      dataKey="value"
                      stroke="none"
                    >
                      {paymentData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value: number) => `${value}%`}
                      contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }} 
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              {/* Custom Legend Indicators */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "10px", justifyContent: "center" }}>
                {paymentData.map((item) => (
                  <div key={item.name} style={{ display: "flex", alignItems: "center", fontSize: "12px" }}>
                    <div 
                      style={{ 
                        width: 8, 
                        height: 8, 
                        borderRadius: "50%", 
                        backgroundColor: item.color, 
                        marginRight: 6 
                      }} 
                    />
                    <Text type="secondary">{item.name}</Text>
                  </div>
                ))}
              </div>
            </DashboardCard>
          </Col>

          {/* 3. TOP LINKS (Adjusted width) */}
          <Col xs={24} lg={6}>
            <DashboardCard title="Top Performing Links">
              <Space direction="vertical" style={{ width: "100%" }} size="middle">
                {["Summer Sale 2024", "Consultation", "E-Book V1"].map((item, index) => (
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
                    <Space>
                      <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: colors.primary }}></div>
                      <Text strong style={{ color: colors.navy, fontSize: "13px" }}>
                        {item}
                      </Text>
                    </Space>
                    <Text type="secondary" style={{ fontSize: "13px" }}>$1,200</Text>
                  </div>
                ))}
              </Space>
              <Button type="dashed" block style={{ marginTop: "32px", borderColor: colors.primary, color: colors.primary }}>
                View All Links
              </Button>
            </DashboardCard>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}