# 云城智慧园林平台

一个基于 React + Vite 构建的智慧园林可视化平台，展示设施概况、绿化概况和养护情况三个主要视图。

## ✨ 功能特性

- **设施概况**：展示各类基础设施的分布和状态
- **绿化概况**：展示城市绿化数据和树木统计
- **养护情况**：展示养护任务和公司绩效
- **交互式地图**：支持地图缩放、标记点显示
- **数据可视化**：包含柱状图、饼图、雷达图等多种图表
- **响应式设计**：支持左右面板展开/收起

## 🛠️ 技术栈

- **前端框架**: React 18
- **构建工具**: Vite 5
- **地图组件**: Leaflet + React-Leaflet
- **图表组件**: Recharts
- **样式**: CSS3 + Flexbox
- **部署**: GitHub Pages

## 🚀 快速开始

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

访问 http://localhost:5173 查看应用。

### 构建生产版本

```bash
npm run build
```

构建产物将输出到 `dist` 目录。

### 预览生产版本

```bash
npm run preview
```

## 📁 项目结构

```
smart-screen/
├── src/
│   ├── App.jsx          # 主应用组件
│   ├── App.css          # 全局样式
│   ├── main.jsx         # 入口文件
│   └── index.css        # 基础样式
├── .github/
│   └── workflows/
│       └── static.yml   # GitHub Pages 部署配置
├── index.html           # HTML 模板
├── vite.config.js       # Vite 配置
├── package.json         # 项目配置
└── README.md            # 项目说明
```

## 🗺️ 视图说明

### 设施概况
- 展示基础设施、停车场、公厕等设施类型
- 设备健康率统计
- 设备运行情况图表

### 绿化概况
- 城市地类概况
- 指标数据展示
- 树木总量和树种排行
- 古树名木树龄分析

### 养护情况
- 养护动态信息
- 区域设施增减趋势
- 养护公司绩效排名

## 🎨 设计特点

- 深色主题配色方案
- 科技感透明面板效果
- 蓝色发光装饰线条
- 响应式布局设计

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！
