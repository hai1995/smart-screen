import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polygon, CircleMarker } from 'react-leaflet';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import './App.css';

// 模拟数据
const deviceData = [
  { name: '01月', 正常: 454, 异常: 40 },
  { name: '02月', 正常: 456, 异常: 45 },
  { name: '03月', 正常: 466, 异常: 43 },
  { name: '04月', 正常: 444, 异常: 40 },
  { name: '05月', 正常: 454, 异常: 40 },
  { name: '06月', 正常: 456, 异常: 45 },
  { name: '07月', 正常: 466, 异常: 43 },
];

const deviceDistribution = [
  { name: '基础设施', value: 3444, percentage: 45 },
  { name: '外场设施', value: 2448, percentage: 32 },
  { name: '补光灯设备', value: 1444, percentage: 19 },
  { name: '水利设施', value: 3648, percentage: 48 },
];

const riskTrendData = [
  { year: '2017', 一般: 30, 较大: 45, 重大: 20 },
  { year: '2018', 一般: 25, 较大: 40, 重大: 15 },
  { year: '2019', 一般: 20, 较大: 35, 重大: 10 },
  { year: '2020', 一般: 15, 较大: 30, 重大: 8 },
  { year: '2021', 一般: 10, 较大: 25, 重大: 5 },
  { year: '2022', 一般: 8, 较大: 20, 重大: 3 },
  { year: '2023', 一般: 5, 较大: 15, 重大: 2 },
];

const treeTop5 = [
  { name: '梧桐', value: 143 },
  { name: '松树', value: 143 },
  { name: '银杏', value: 143 },
  { name: '白桦', value: 143 },
  { name: '雪松', value: 143 },
];

const ancientTreeData = [
  { subject: '5年以下', A: 1023, fullMark: 1500 },
  { subject: '5-10年', A: 441, fullMark: 1500 },
  { subject: '10-50年', A: 167, fullMark: 1500 },
  { subject: '50-100年', A: 17, fullMark: 1500 },
  { subject: '100年以上', A: 2345, fullMark: 1500 },
];

const maintenanceData = [
  { name: '云城绿建', score: 95, tasks: 20, completed: 15, pending: 5 },
  { name: '云城园林工程公司', score: 92, tasks: 107, completed: 135, pending: 441 },
  { name: '星辰建设集团', score: 92, tasks: 107, completed: 135, pending: 441 },
  { name: '星辰建设集团', score: 92, tasks: 107, completed: 135, pending: 441 },
  { name: '星辰建设集团', score: 92, tasks: 107, completed: 135, pending: 441 },
];

const dynamicInfo = [
  { name: '古树一号', type: '园林绿化', event: '养护中 浇水', time: '09-10 20:20' },
  { name: '古树一号', type: '园林绿化', event: '养护中 浇水', time: '09-10 20:20' },
  { name: '古树一号', type: '园林绿化', event: '养护中 浇水', time: '09-10 20:20' },
  { name: '古树一号', type: '园林绿化', event: '养护中 浇水', time: '09-10 20:20' },
  { name: '古树一号', type: '园林绿化', event: '养护中 浇水', time: '09-10 20:20' },
];

const facilityTypes = [
  { name: '基础设施', count: 2324, change: '+2.3%' },
  { name: '通用设施', count: 2324, change: '+2.3%' },
  { name: '垃圾站', count: 2324, change: '+2.3%' },
  { name: '停车场', count: 2324, change: '+2.3%' },
  { name: '公厕', count: 2324, change: '+2.3%' },
  { name: '雕塑小品', count: 2324, change: '+2.3%' },
  { name: '喷泉', count: 2324, change: '+2.3%' },
  { name: '管理房', count: 2324, change: '+2.3%' },
  { name: '志愿者服务站', count: 2324, change: '+2.3%' },
  { name: '道路', count: 2324, change: '+2.3%' },
  { name: '桥梁', count: 2324, change: '+2.3%' },
  { name: '安全设施', count: 2324, change: '+2.3%' },
  { name: '机井', count: 2324, change: '+2.3%' },
  { name: '体育设施', count: 2324, change: '+2.3%' },
  { name: '室外球场', count: 2324, change: '+2.3%' },
  { name: '室内球场', count: 2324, change: '+2.3%' },
  { name: '步道', count: 2324, change: '+2.3%' },
  { name: '健身场地', count: 2324, change: '+2.3%' },
];

const greenAreaData = [
  { name: '建成区总面积', value: '14530 m²' },
  { name: '人口总数', value: '1122.4 万', change: '+1.6%' },
  { name: '建成区绿化覆盖面积', value: '9905 公顷', change: '-1.2%' },
];

const urbanGreenTypes = [
  { name: '公园', value: '15.2 公顷' },
  { name: '广场', value: '15.2 公顷' },
  { name: '游园', value: '15.2 公顷' },
  { name: '水系绿地', value: '15.2 公顷' },
  { name: '防护绿地', value: '15.2 公顷' },
  { name: '道路绿地', value: '15.2 公顷' },
];

const indicatorData = [
  { name: '建成区绿地率', value: '95%', change: '+2.6%' },
  { name: '人均公园绿地面积', value: '95%', change: '+2.3%' },
  { name: '绿化覆盖率', value: '95%', change: '+2.3%' },
  { name: '道路绿化普及率', value: '95%', change: '+2.3%' },
  { name: '湿地净化率', value: '95%', change: '+2.3%' },
  { name: '乔木占比', value: '95%', change: '+2.3%' },
  { name: '人均绿地建设面积', value: '95%', change: '+2.3%' },
  { name: '公园绿地服务半径覆盖率', value: '95%', change: '+2.3%' },
];

const urbanGreenData = [
  { name: '城市绿地总面积', value: '123456 m²' },
];

const treeStatistics = [
  { name: '树木总量', value: '603370 株' },
  { name: '公园广场', value: '190 个' },
  { name: '道路节点', value: '190 个' },
  { name: '绿道', value: '1910 公里' },
  { name: '绿廊', value: '32 公里' },
];

const COLORS = ['#00e5ff', '#00b2ff', '#0080ff', '#004dff'];
const RADAR_COLORS = ['#00e5ff', '#00b2ff', '#0080ff', '#004dff', '#001aff'];

function App() {
  const [activeView, setActiveView] = useState('facility');
  const [activeFooter, setActiveFooter] = useState('green');
  const [leftCollapsed, setLeftCollapsed] = useState(false);
  const [rightCollapsed, setRightCollapsed] = useState(false);

  return (
    <div className="app">
      <header className="header">
        <div className="header-decoration-left">
          <div className="deco-line"></div>
          <div className="deco-line"></div>
          <div className="deco-line"></div>
        </div>
        <div className="header-left">
          <div className="time">2023-09-13 13:45:34</div>
        </div>
        <div className="header-center">
          <div className="title-container">
            <div className="title-line-left"></div>
            <h1>云城智慧园林平台</h1>
            <div className="title-line-right"></div>
          </div>
        </div>
        <div className="header-right">
          <div className="weather-icon">☁️</div>
          <div className="weather">28℃</div>
          <div className="air-quality">空气质量 良</div>
          <div className="user">管理员</div>
        </div>
        <div className="header-decoration-right">
          <div className="deco-line"></div>
          <div className="deco-line"></div>
          <div className="deco-line"></div>
        </div>
      </header>

      <div className="content">
        <nav className={`sidebar ${leftCollapsed ? 'collapsed' : ''}`}>
          <div className="nav-header">
            <h3>功能菜单</h3>
          </div>
          <div className={`nav-item ${activeView === 'facility' ? 'active' : ''}`} onClick={() => setActiveView('facility')}>
            <span className="nav-icon">📋</span>
            <span>设施概况</span>
            <span className="nav-badge">19:00:00</span>
          </div>
          <div className={`nav-item ${activeView === 'green' ? 'active' : ''}`} onClick={() => setActiveView('green')}>
            <span className="nav-icon">🌳</span>
            <span>绿化概况</span>
          </div>
          <div className={`nav-item ${activeView === 'maintenance' ? 'active' : ''}`} onClick={() => setActiveView('maintenance')}>
            <span className="nav-icon">🔧</span>
            <span>养护情况</span>
          </div>
          
          {activeView === 'facility' && (
            <div className="facility-list">
              <div className="facility-category">
                <h4>基础设施</h4>
                <div className="facility-item">
                  <span>通用设施</span>
                  <span className="facility-count">2324</span>
                  <span className="facility-change">+2.3%</span>
                </div>
                <div className="facility-item">
                  <span>垃圾站</span>
                  <span className="facility-count">2324</span>
                  <span className="facility-change">+2.3%</span>
                </div>
              </div>
              <div className="facility-category">
                <h4>停车场</h4>
                <div className="facility-item">
                  <span>停车场</span>
                  <span className="facility-count">2324</span>
                  <span className="facility-change">+2.3%</span>
                </div>
                <div className="facility-item">
                  <span>公厕</span>
                  <span className="facility-count">2324</span>
                  <span className="facility-change">+2.3%</span>
                </div>
              </div>
              <div className="facility-category">
                <h4>雕塑小品</h4>
                <div className="facility-item">
                  <span>雕塑小品</span>
                  <span className="facility-count">2324</span>
                  <span className="facility-change">+2.3%</span>
                </div>
                <div className="facility-item">
                  <span>喷泉</span>
                  <span className="facility-count">2324</span>
                  <span className="facility-change">+2.3%</span>
                </div>
              </div>
              <div className="facility-category">
                <h4>管理房</h4>
                <div className="facility-item">
                  <span>管理房</span>
                  <span className="facility-count">2324</span>
                  <span className="facility-change">+2.3%</span>
                </div>
                <div className="facility-item">
                  <span>志愿者服务站</span>
                  <span className="facility-count">2324</span>
                  <span className="facility-change">+2.3%</span>
                </div>
              </div>
              <div className="facility-category">
                <h4>道路</h4>
                <div className="facility-item">
                  <span>道路</span>
                  <span className="facility-count">2324</span>
                  <span className="facility-change">+2.3%</span>
                </div>
                <div className="facility-item">
                  <span>桥梁</span>
                  <span className="facility-count">2324</span>
                  <span className="facility-change">+2.3%</span>
                </div>
              </div>
              <div className="facility-category">
                <h4>安全设施</h4>
                <div className="facility-item">
                  <span>安全设施</span>
                  <span className="facility-count">2324</span>
                  <span className="facility-change">+2.3%</span>
                </div>
                <div className="facility-item">
                  <span>机井</span>
                  <span className="facility-count">2324</span>
                  <span className="facility-change">+2.3%</span>
                </div>
              </div>
              <div className="facility-category">
                <h4>体育设施</h4>
                <div className="facility-item">
                  <span>室外球场</span>
                  <span className="facility-count">2324</span>
                  <span className="facility-change">+2.3%</span>
                </div>
                <div className="facility-item">
                  <span>室内球场</span>
                  <span className="facility-count">2324</span>
                  <span className="facility-change">+2.3%</span>
                </div>
              </div>
              <div className="facility-category">
                <h4>步道</h4>
                <div className="facility-item">
                  <span>步道</span>
                  <span className="facility-count">2324</span>
                  <span className="facility-change">+2.3%</span>
                </div>
                <div className="facility-item">
                  <span>健身场地</span>
                  <span className="facility-count">2324</span>
                  <span className="facility-change">+2.3%</span>
                </div>
              </div>
            </div>
          )}
          
          {activeView === 'green' && (
            <div className="green-list">
              <div className="green-stat">
                <span className="green-label">建成区总面积</span>
                <span className="green-value">14530 m²</span>
              </div>
              <div className="green-stat">
                <span className="green-label">人口总数</span>
                <span className="green-value">1122.4 万</span>
                <span className="green-change">+1.6%</span>
              </div>
              <div className="green-stat">
                <span className="green-label">建成区绿化覆盖面积</span>
                <span className="green-value">9905 公顷</span>
                <span className="green-change">-1.2%</span>
              </div>
              <div className="green-title">城市地类概况</div>
              <div className="green-types">
                {urbanGreenTypes.map((item, index) => (
                  <div key={index} className="green-type-item">
                    <span className="green-type-name">{item.name}</span>
                    <span className="green-type-value">{item.value}</span>
                  </div>
                ))}
              </div>
              <div className="green-title">指标数据</div>
              <div className="indicator-list">
                {indicatorData.map((item, index) => (
                  <div key={index} className="indicator-item">
                    <span className="indicator-name">{item.name}</span>
                    <span className="indicator-value">{item.value}</span>
                    <span className="indicator-change">{item.change}</span>
                  </div>
                ))}
              </div>
              <div className="green-title">城市绿地</div>
              <div className="urban-green-stat">
                <span className="urban-green-label">城市绿地总面积</span>
                <span className="urban-green-value">123456 m²</span>
              </div>
            </div>
          )}
          
          {activeView === 'maintenance' && (
            <div className="maintenance-list">
              <div className="maintenance-title">养护动态</div>
              {dynamicInfo.map((item, index) => (
                <div key={index} className="maintenance-item">
                  <span className="maintenance-name">{item.name}</span>
                  <span className="maintenance-type">{item.type}</span>
                  <span className="maintenance-event">{item.event}</span>
                  <span className="maintenance-time">{item.time}</span>
                </div>
              ))}
            </div>
          )}
        </nav>

        <button
          className={`toggle-btn left ${leftCollapsed ? 'collapsed' : ''}`}
          onClick={() => setLeftCollapsed(!leftCollapsed)}
        >
          {leftCollapsed ? '>' : '<'}
        </button>

        <button
          className={`toggle-btn right ${rightCollapsed ? 'collapsed' : ''}`}
          onClick={() => setRightCollapsed(!rightCollapsed)}
        >
          {rightCollapsed ? '<' : '>'}
        </button>

        <div className="main">
          {activeView === 'facility' && (
            <div className="view">
              <div className="map-container">
                <MapContainer center={[33.47, 118.19]} zoom={13} style={{ height: '100%', width: '100%' }}>
                  <TileLayer
                    url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                  />
                  <Marker position={[33.47, 118.19]}>
                    <Popup>云城中心花坛</Popup>
                  </Marker>
                  <Marker position={[33.475, 118.2]}>
                    <Popup>云城城东公园</Popup>
                  </Marker>
                  <Marker position={[33.465, 118.18]}>
                    <Popup>云城汽车客运站</Popup>
                  </Marker>
                  <CircleMarker center={[33.47, 118.19]} radius={500} fillOpacity={0.1} color="#00e5ff">
                    <Popup>云城城市公园</Popup>
                  </CircleMarker>
                </MapContainer>
              </div>
              <div className={`data-panel ${rightCollapsed ? 'collapsed' : ''}`}>
                <div className="panel-section">
                  <div className="section-header">
                    <span className="section-icon">📊</span>
                    <span>设备健康率</span>
                  </div>
                  <div className="stat-number">76%</div>
                </div>
                <div className="panel-section">
                  <div className="section-header">
                    <span className="section-icon">🔄</span>
                    <span>设备运行情况</span>
                  </div>
                  <div className="stat-number">123456 次</div>
                  <div className="chart-container">
                    <ResponsiveContainer width="100%" height={120}>
                      <BarChart data={deviceData}>
                        <Bar dataKey="正常" fill="#00e5ff" />
                        <Bar dataKey="异常" fill="#ff4444" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                <div className="panel-section">
                  <div className="section-header">
                    <span className="section-icon">📦</span>
                    <span>设备分布</span>
                  </div>
                  <div className="chart-container">
                    <ResponsiveContainer width="100%" height={120}>
                      <PieChart>
                        <Pie data={deviceDistribution} dataKey="value" nameKey="name">
                          {deviceDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="distribution-list">
                    {deviceDistribution.map((item, index) => (
                      <div key={index} className="distribution-item">
                        <span className="distribution-color" style={{ backgroundColor: COLORS[index % COLORS.length] }}></span>
                        <span className="distribution-name">{item.name}</span>
                        <span className="distribution-value">{item.value}</span>
                        <span className="distribution-percent">{item.percentage}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeView === 'green' && (
            <div className="view">
              <div className="map-container">
                <MapContainer center={[33.47, 118.19]} zoom={13} style={{ height: '100%', width: '100%' }}>
                  <TileLayer
                    url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                  />
                  <Marker position={[33.47, 118.19]}>
                    <Popup>云城中心花坛</Popup>
                  </Marker>
                  <Marker position={[33.475, 118.2]}>
                    <Popup>云城城东公园</Popup>
                  </Marker>
                  <Polygon positions={[[33.45, 118.15], [33.49, 118.15], [33.49, 118.23], [33.45, 118.23]]} color="#00e5ff" fillOpacity={0.2}>
                    <Popup>绿化区域</Popup>
                  </Polygon>
                </MapContainer>
              </div>
              <div className={`data-panel ${rightCollapsed ? 'collapsed' : ''}`}>
                <div className="panel-section">
                  <div className="tree-stat-grid">
                    {treeStatistics.map((item, index) => (
                      <div key={index} className="tree-stat-item">
                        <div className="tree-stat-icon">🌳</div>
                        <div className="tree-stat-value">{item.value}</div>
                        <div className="tree-stat-label">{item.name}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="panel-section">
                  <div className="section-header">
                    <span className="section-icon">🌲</span>
                    <span>树木总量</span>
                  </div>
                  <div className="tree-total-value">603370 株</div>
                </div>
                <div className="panel-section">
                  <div className="section-header">
                    <span className="section-icon">🥇</span>
                    <span>树种排行TOP5</span>
                  </div>
                  <div className="tree-ranking">
                    {treeTop5.map((item, index) => (
                      <div key={index} className="tree-rank-item">
                        <span className="tree-rank">{index + 1}</span>
                        <span className="tree-name">{item.name}</span>
                        <div className="tree-bar-container">
                          <div className="tree-bar" style={{ width: `${(item.value / 150) * 100}%` }}></div>
                        </div>
                        <span className="tree-count">{item.value} 株</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="panel-section">
                  <div className="section-header">
                    <span className="section-icon">🌿</span>
                    <span>古树名木树龄</span>
                  </div>
                  <div className="chart-container">
                    <ResponsiveContainer width="100%" height={150}>
                      <RadarChart data={ancientTreeData}>
                        <PolarGrid stroke="#00e5ff" />
                        <PolarAngleAxis dataKey="subject" />
                        <Radar name="数量" dataKey="A" stroke="#00e5ff" fill="#00e5ff" fillOpacity={0.3} />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="ancient-tree-list">
                    {ancientTreeData.map((item, index) => (
                      <div key={index} className="ancient-tree-item">
                        <span className="ancient-tree-label">{item.subject}</span>
                        <span className="ancient-tree-value">{item.A} 株</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeView === 'maintenance' && (
            <div className="view">
              <div className="map-container">
                <MapContainer center={[33.47, 118.19]} zoom={13} style={{ height: '100%', width: '100%' }}>
                  <TileLayer
                    url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                  />
                  <Marker position={[33.47, 118.19]}>
                    <Popup>云城中心花坛</Popup>
                  </Marker>
                  <Marker position={[33.475, 118.2]}>
                    <Popup>云城城东公园</Popup>
                  </Marker>
                </MapContainer>
              </div>
              <div className={`data-panel ${rightCollapsed ? 'collapsed' : ''}`}>
                <div className="panel-section">
                  <div className="section-header">
                    <span className="section-icon">🔧</span>
                    <span>养护数量</span>
                  </div>
                  <div className="maintenance-count">245 项</div>
                </div>
                <div className="panel-section">
                  <div className="section-header">
                    <span className="section-icon">📈</span>
                    <span>区域设施增减趋势</span>
                  </div>
                  <div className="chart-container">
                    <ResponsiveContainer width="100%" height={150}>
                      <LineChart data={riskTrendData}>
                        <Line type="monotone" dataKey="一般" stroke="#00e5ff" strokeWidth={2} />
                        <Line type="monotone" dataKey="较大" stroke="#00b2ff" strokeWidth={2} />
                        <Line type="monotone" dataKey="重大" stroke="#ff4444" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                <div className="panel-section">
                  <div className="section-header">
                    <span className="section-icon">🏢</span>
                    <span>养护公司</span>
                  </div>
                  <div className="company-list">
                    {maintenanceData.map((item, index) => (
                      <div key={index} className="company-item">
                        <div className="company-header">
                          <span className="company-name">{item.name}</span>
                          <span className="company-score">{item.score}分</span>
                        </div>
                        <div className="company-tasks">
                          <span className="task-item">完成: {item.completed}</span>
                          <span className="task-item">任务: {item.tasks}</span>
                          <span className="task-item">未完成: {item.pending}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <footer className="footer">
          <div className={`footer-item ${activeFooter === 'green' ? 'active' : ''}`} onClick={() => setActiveFooter('green')}>
            <span>绿化生产</span>
          </div>
          <div className={`footer-item ${activeFooter === 'maintenance' ? 'active' : ''}`} onClick={() => setActiveFooter('maintenance')}>
            <span>养护管理</span>
          </div>
          <div className={`footer-item ${activeFooter === 'forest' ? 'active' : ''}`} onClick={() => setActiveFooter('forest')}>
            <span>园林执法</span>
          </div>
          <div className={`footer-item ${activeFooter === 'event' ? 'active' : ''}`} onClick={() => setActiveFooter('event')}>
            <span>事件管理</span>
          </div>
          <div className={`footer-item ${activeFooter === 'monitor' ? 'active' : ''}`} onClick={() => setActiveFooter('monitor')}>
            <span>变化监测</span>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
