# Autonomous Driving Dashboard

A Tesla-inspired, dark-themed dashboard for monitoring autonomous vehicle systems across three providers: Gatik, NVIDIA, and Applied Intuition.

## 🧱 Atomic Design Structure

This dashboard follows atomic design principles:

### Atoms (Basic building blocks)
- **KpiCard** (`action-panel.tsx`): Reusable metric display cards with colored themes, icons, and trend indicators
- **Card Components**: Base UI components from the UI library

### Molecules (Combinations of atoms)
- **ProviderHeader** (`chat-dashboard.tsx`): Sticky headers with provider logos and titles
- **ChartContainer** (`info-panel.tsx`): Wrapper for chart content with consistent styling
- **BarChart** (`info-panel.tsx`): Horizontal bar charts with color-coded thresholds
- **Timeline** (`info-panel.tsx`): Timeline visualization for events

### Organisms (Complex UI components)
- **AutonomousDashboard** (`index.tsx`): Main dashboard layout combining all molecules and atoms

## 🎨 Theme

- **Background**: Pure black (#000000)
- **Cards**: Dark gray (#1F2937) with gray borders
- **Text**: White primary, gray-400 secondary
- **Accent Colors**: 
  - Blue: Gatik branding and metrics
  - Green: NVIDIA branding and positive metrics
  - Purple: Applied Intuition branding
  - Yellow/Orange/Red: Status indicators

## 📊 Layout

Three equal-width columns in a single row:

### Column 1: Gatik - Driving Intelligence
- **KPIs**: Autonomous miles, disengagements, detection accuracy, energy use
- **Heatmap**: Houston test loop with disengagement markers
- **Line Chart**: 7-day disengagement trends

### Column 2: NVIDIA - System Performance  
- **KPIs**: System uptime, GPU load, thermal alerts
- **Bar Chart**: Compute load by vehicle with color thresholds
- **Timeline**: Thermal events across fleet

### Column 3: Applied Intuition - Simulation & Validation
- **Pass/Fail Matrix**: Test results across build versions
- **Donut Chart**: Scenario coverage breakdown
- **Simulation Panel**: Real vs simulated behavior comparison

## 🔧 Footer
Fixed bottom banner with fleet summary and executive briefing status.

## 🚀 Usage

```tsx
import AutonomousDashboard from './components/measles-dashboard';

export default function Page() {
  return <AutonomousDashboard />;
}
```

## 📱 Responsive Design

- Desktop-first design optimized for large screens
- Three-column layout with sticky headers
- Scalable charts and visualizations
- Fixed footer banner for status updates 