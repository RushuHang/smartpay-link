"use client";

import React from "react";
import { Layout, Card, Row, Col, Typography, Button, Tag, Statistic, Space, Table, Avatar, Badge } from "antd";
import { 
  ArrowUpOutlined, 
  UserOutlined, 
  SafetyCertificateOutlined, 
  GlobalOutlined, 
  TransactionOutlined,
  MoreOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined
} from "@ant-design/icons";
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell
} from "recharts";

const { Title, Text } = Typography;
const { Content } = Layout;

// --- 1. THEME & COLORS ---
const colors = {
  primary: "#0066B3", // Admin Brand Blue
  navy: "#001529",
  success: "#52c41a",
  warning: "#faad14",
  error: "#ff4d4f",
  lightBlue: "#e6f7ff",
  background: "#f0f2f5",
  textSecondary: "#64748b",
};

// --- 2. MOCK DATA FOR ADMIN ---
const platformVolumeData = [
  { name: "Mon", volume: 450000 },
  { name: "Tue", volume: 520000 },
  { name: "Wed", volume: 480000 },
  { name: "Thu", volume: 610000 },
  { name: "Fri", volume: 590000 },
  { name: "Sat", volume: 400000 },
  { name: "Sun", volume: 420000 },
];

const merchantListData = [
  { key: '1', name: 'Himalayan Coffee', email: 'ops@himalayan.com', status: 'Active', volume: '$12,400', joinDate: '2023-10-12' },
  { key: '2', name: 'Tech Gear Nepal', email: 'sales@techgear.np', status: 'Pending KYC', volume: '$0', joinDate: '2023-11-01' },
  { key: '3', name: 'Bhat-Bhateni Superstore', email: 'finance@bbsm.com', status: 'Active', volume: '$89,200', joinDate: '2022-05-15' },
  { key: '4', name: 'Urban Outfitters', email: 'contact@urban.com', status: 'Suspended', volume: '$2,100', joinDate: '2023-08-20' },
];

// --- 3. REUSABLE COMPONENTS ---

const AdminCard = ({ children, title, extra }: any) => (
  <Card
    bordered={false}
    title={title ? <span style={{ color: colors.navy, fontWeight: 600 }}>{title}</span> : null}
    extra={extra}
    style={{ borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)", height: "100%" }}
  >
    {children}
  </Card>
);

const AdminStat = ({ title, value, icon, trend, color = colors.primary }: any) => (
  <AdminCard>
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div>
        <Text type="secondary" style={{ fontSize: "12px", textTransform: "uppercase", fontWeight: 600 }}>{title}</Text>
        <div style={{ marginTop: "4px" }}>
          <Title level={3} style={{ margin: 0 }}>{value}</Title>
        </div>
        <Tag color={trend > 0 ? "success" : "error"} style={{ marginTop: "8px", borderRadius: "4px", border: 'none' }}>
          {trend > 0 ? "+" : ""}{trend}% vs last month
        </Tag>
      </div>
      <Avatar size={48} icon={icon} style={{ backgroundColor: color + "15", color: color }} />
    </div>
  </AdminCard>
);

// --- 4. MAIN ADMIN DASHBOARD ---

export default function AdminDashboard() {
  const columns = [
    {
      title: 'Merchant',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <Text strong>{text}</Text>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        let color = status === 'Active' ? 'success' : status === 'Pending KYC' ? 'processing' : 'error';
        return <Badge status={color as any} text={status} />;
      },
    },
    {
      title: 'Monthly Volume',
      dataIndex: 'volume',
      key: 'volume',
    },
    {
      title: 'Actions',
      key: 'action',
      render: () => <Button type="text" icon={<MoreOutlined />} />,
    },
  ];

  return (
    <Layout style={{ backgroundColor: colors.background, minHeight: "100vh" }}>
      <Content style={{ padding: "32px" }}>
        {/* HEADER */}
        <div style={{ marginBottom: "32px" }}>
          <Title level={2} style={{ marginBottom: 4 }}>System Overview</Title>
          <Text type="secondary">Real-time platform performance and merchant management.</Text>
        </div>

        {/* TOP STATS */}
        <Row gutter={[24, 24]}>
          <Col xs={24} sm={12} lg={6}>
            <AdminStat title="Total Merchants" value="1,284" icon={<UserOutlined />} trend={8} />
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <AdminStat title="Platform TPV" value="$3.2M" icon={<TransactionOutlined />} trend={12} color={colors.success} />
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <AdminStat title="Pending KYC" value="42" icon={<SafetyCertificateOutlined />} trend={-2} color={colors.warning} />
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <AdminStat title="Active Sessions" value="892" icon={<GlobalOutlined />} trend={15} color="#722ed1" />
          </Col>
        </Row>

        <Row gutter={[24, 24]} style={{ marginTop: "24px" }}>
          {/* VOLUME CHART */}
          <Col xs={24} lg={16}>
            <AdminCard title="Gross Transaction Volume (7D)">
              <div style={{ height: 350 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={platformVolumeData}>
                    <defs>
                      <linearGradient id="adminGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={colors.primary} stopOpacity={0.1}/>
                        <stop offset="95%" stopColor={colors.primary} stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} tickFormatter={(value) => `$${value/1000}k`} />
                    <Tooltip />
                    <Area type="monotone" dataKey="volume" stroke={colors.primary} strokeWidth={3} fillOpacity={1} fill="url(#adminGradient)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </AdminCard>
          </Col>

          {/* QUICK ACTIONS / SYSTEM HEALTH */}
          <Col xs={24} lg={8}>
            <AdminCard title="System Health">
              <Space direction="vertical" style={{ width: '100%' }} size="large">
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Text><CheckCircleOutlined style={{ color: colors.success }} /> API Gateway</Text>
                  <Tag color="success">Operational</Tag>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Text><CheckCircleOutlined style={{ color: colors.success }} /> Payment Processor</Text>
                  <Tag color="success">99.9% Uptime</Tag>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Text><ClockCircleOutlined style={{ color: colors.warning }} /> Settlement Job</Text>
                  <Tag color="warning">Delayed (5m)</Tag>
                </div>
                
                <div style={{ marginTop: '20px', padding: '16px', background: colors.lightBlue, borderRadius: '8px' }}>
                  <Text strong style={{ color: colors.primary }}>Admin Alert</Text>
                  <br />
                  <Text style={{ fontSize: '12px' }}>5 merchants have exceeded their monthly transaction limit. Review required.</Text>
                  <Button type="primary" size="small" block style={{ marginTop: '12px' }}>Review Limits</Button>
                </div>
              </Space>
            </AdminCard>
          </Col>
        </Row>

        {/* RECENT MERCHANTS TABLE */}
        <Row style={{ marginTop: "24px" }}>
          <Col span={24}>
            <AdminCard 
              title="Recent Merchant Signups" 
              extra={<Button type="link">View All Merchants</Button>}
            >
              <Table 
                columns={columns} 
                dataSource={merchantListData} 
                pagination={false} 
              />
            </AdminCard>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}