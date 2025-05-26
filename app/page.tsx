"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Line,
  ComposedChart,
} from "recharts"
import {
  Zap,
  Car,
  Factory,
  Droplets,
  TrendingDown,
  TrendingUp,
  Target,
  Globe,
  CheckCircle2,
  Search,
  Filter,
  BarChart3,
  Activity,
  Sparkles,
  Flame,
  Star,
  Atom,
  MapPin,
  Eye,
  Layers,
  CloudLightning,
  X,
  ChevronRight,
  ChevronLeft,
  Play,
  AlertTriangle,
  Brain,
  Calendar,
  Bell,
  Lightbulb,
  ZapIcon,
  Settings,
  BarChart2,
  FileText,
  Trophy,
} from "lucide-react"
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps"
import type { Feature } from "geojson"

// Datos mejorados con países (datos reales aproximados)
const countriesData = [
  {
    name: "China",
    code: "CN",
    emissions2021: 11472,
    emissions2022: 11397,
    reduction: 0.7,
    trend: "down",
    color: "#ef4444",
    position: { x: 75, y: 35 },
    population: 1412,
    gdp: 17734,
  },
  {
    name: "Estados Unidos",
    code: "US",
    emissions2021: 5007,
    emissions2022: 4713,
    reduction: 5.9,
    trend: "down",
    color: "#8b5cf6",
    position: { x: 25, y: 40 },
    population: 331,
    gdp: 25462,
  },
  {
    name: "India",
    code: "IN",
    emissions2021: 2709,
    emissions2022: 2654,
    reduction: 2.0,
    trend: "down",
    color: "#f59e0b",
    position: { x: 70, y: 50 },
    population: 1380,
    gdp: 3385,
  },
  {
    name: "Rusia",
    code: "RU",
    emissions2021: 1756,
    emissions2022: 1661,
    reduction: 5.4,
    trend: "down",
    color: "#06b6d4",
    position: { x: 65, y: 25 },
    population: 146,
    gdp: 1829,
  },
  {
    name: "Japón",
    code: "JP",
    emissions2021: 1067,
    emissions2022: 1064,
    reduction: 0.3,
    trend: "down",
    color: "#10b981",
    position: { x: 80, y: 38 },
    population: 125,
    gdp: 4231,
  },
  {
    name: "Alemania",
    code: "DE",
    emissions2021: 675,
    emissions2022: 746,
    reduction: -10.5,
    trend: "up",
    color: "#3b82f6",
    position: { x: 52, y: 30 },
    population: 83,
    gdp: 4223,
  },
  {
    name: "Brasil",
    code: "BR",
    emissions2021: 2170,
    emissions2022: 2314,
    reduction: -6.6,
    trend: "up",
    color: "#84cc16",
    position: { x: 35, y: 70 },
    population: 215,
    gdp: 1869,
  },
  {
    name: "Reino Unido",
    code: "GB",
    emissions2021: 424,
    emissions2022: 417,
    reduction: 1.7,
    trend: "down",
    color: "#f97316",
    position: { x: 48, y: 28 },
    population: 67,
    gdp: 3131,
  },
]

// Datos de ejemplo para la organización
const emissionsData2021 = [
  { month: "Ene", scope1: 120, scope2: 180, scope3: 300, total: 600 },
  { month: "Feb", scope1: 115, scope2: 175, scope3: 290, total: 580 },
  { month: "Mar", scope1: 125, scope2: 185, scope3: 310, total: 620 },
  { month: "Abr", scope1: 110, scope2: 170, scope3: 285, total: 565 },
  { month: "May", scope1: 105, scope2: 165, scope3: 275, total: 545 },
  { month: "Jun", scope1: 100, scope2: 160, scope3: 270, total: 530 },
  { month: "Jul", scope1: 95, scope2: 155, scope3: 265, total: 515 },
  { month: "Ago", scope1: 90, scope2: 150, scope3: 260, total: 500 },
  { month: "Sep", scope1: 85, scope2: 145, scope3: 255, total: 485 },
  { month: "Oct", scope1: 80, scope2: 140, scope3: 250, total: 470 },
  { month: "Nov", scope1: 75, scope2: 135, scope3: 245, total: 455 },
  { month: "Dic", scope1: 70, scope2: 130, scope3: 240, total: 440 },
]

const emissionsData2022 = [
  { month: "Ene", scope1: 65, scope2: 125, scope3: 235, total: 425 },
  { month: "Feb", scope1: 60, scope2: 120, scope3: 230, total: 410 },
  { month: "Mar", scope1: 58, scope2: 118, scope3: 225, total: 401 },
  { month: "Abr", scope1: 55, scope2: 115, scope3: 220, total: 390 },
  { month: "May", scope1: 52, scope2: 112, scope3: 215, total: 379 },
  { month: "Jun", scope1: 50, scope2: 110, scope3: 210, total: 370 },
  { month: "Jul", scope1: 48, scope2: 108, scope3: 205, total: 361 },
  { month: "Ago", scope1: 45, scope2: 105, scope3: 200, total: 350 },
  { month: "Sep", scope1: 42, scope2: 102, scope3: 195, total: 339 },
  { month: "Oct", scope1: 40, scope2: 100, scope3: 190, total: 330 },
  { month: "Nov", scope1: 38, scope2: 98, scope3: 185, total: 321 },
  { month: "Dic", scope1: 35, scope2: 95, scope3: 180, total: 310 },
]

const projectionData = [
  { year: "2019", emissions: 1400, target: 1400, prediction: 1400 },
  { year: "2020", emissions: 1250, target: 1350, prediction: 1280 },
  { year: "2021", emissions: 1200, target: 1300, prediction: 1150 },
  { year: "2022", emissions: 850, target: 1250, prediction: 900 },
  { year: "2023", emissions: null, target: 1200, prediction: 720 },
  { year: "2024", emissions: null, target: 1150, prediction: 580 },
  { year: "2025", emissions: null, target: 1100, prediction: 450 },
  { year: "2026", emissions: null, target: 1050, prediction: 350 },
  { year: "2027", emissions: null, target: 1000, prediction: 280 },
  { year: "2028", emissions: null, target: 950, prediction: 220 },
  { year: "2029", emissions: null, target: 900, prediction: 170 },
  { year: "2030", emissions: null, target: 850, prediction: 120 },
]

const sourceData = [
  { name: "Transporte", value: 35, color: "#8b5cf6", icon: Car },
  { name: "Electricidad", value: 28, color: "#06b6d4", icon: Zap },
  { name: "Manufactura", value: 22, color: "#f59e0b", icon: Factory },
  { name: "Agua", value: 10, color: "#10b981", icon: Droplets },
  { name: "Otros", value: 5, color: "#ef4444", icon: Globe },
]

const radarData = [
  { subject: "Transporte", A: 120, B: 85, fullMark: 150 },
  { subject: "Energía", A: 98, B: 70, fullMark: 150 },
  { subject: "Industria", A: 86, B: 60, fullMark: 150 },
  { subject: "Residuos", A: 99, B: 75, fullMark: 150 },
  { subject: "Agricultura", A: 85, B: 65, fullMark: 150 },
  { subject: "Edificios", A: 65, B: 45, fullMark: 150 },
]

// Nuevos datos para gráficos adicionales
const monthlyComparisonData = [
  { month: "Ene", actual: 425, budget: 450, lastYear: 600 },
  { month: "Feb", actual: 410, budget: 440, lastYear: 580 },
  { month: "Mar", actual: 401, budget: 430, lastYear: 620 },
  { month: "Abr", actual: 390, budget: 420, lastYear: 565 },
  { month: "May", actual: 379, budget: 410, lastYear: 545 },
  { month: "Jun", actual: 370, budget: 400, lastYear: 530 },
]

const efficiencyData = [
  { category: "Energía Renovable", percentage: 78, target: 85 },
  { category: "Eficiencia Energética", percentage: 92, target: 90 },
  { category: "Transporte Limpio", percentage: 65, target: 75 },
  { category: "Gestión Residuos", percentage: 88, target: 80 },
  { category: "Agua", percentage: 94, target: 90 },
]

const alertsData = [
  {
    type: "warning",
    title: "Meta Mensual en Riesgo",
    description: "Las emisiones de transporte están 15% por encima del objetivo",
    priority: "high",
  },
  {
    type: "success",
    title: "Objetivo Alcanzado",
    description: "Reducción del 8% en emisiones de manufactura este mes",
    priority: "medium",
  },
  {
    type: "info",
    title: "Oportunidad de Mejora",
    description: "Implementar energía solar podría reducir 25% las emisiones",
    priority: "low",
  },
]

// Pasos del tour actualizados
const tourSteps = [
  {
    id: "welcome",
    title: "Bienvenido a EcoVision Pro",
    content: "Este dashboard muestra datos de emisiones GHG. En 'Vista General' ves datos de tu organización, y en 'Por Países' ves datos globales reales.",
    target: null,
    icon: Sparkles,
  },
  {
    id: "header",
    title: "Panel de Control Principal",
    content: "Aquí tienes todos los controles: búsqueda de países, cambio de vistas, actualización de datos y este tour guiado.",
    target: "header",
    icon: Settings,
  },
  {
    id: "kpi-cards",
    title: "Indicadores Clave (KPIs)",
    content: "Estas tarjetas muestran los datos más importantes de tu organización: emisiones totales, metas, eficiencia y progreso.",
    target: "kpi-cards",
    icon: BarChart3,
  },
  {
    id: "trend-chart",
    title: "Tendencias y Predicciones",
    content: "Este gráfico muestra datos históricos, objetivos y predicciones con IA. La línea verde son emisiones reales, roja los objetivos, y azul las predicciones.",
    target: "trend-chart",
    icon: TrendingUp,
  },
  {
    id: "alerts-section",
    title: "Alertas Inteligentes",
    content: "Aquí ves alertas automáticas sobre el estado de tus emisiones: advertencias, logros y oportunidades de mejora.",
    target: "alerts-section",
    icon: Bell,
  },
  {
    id: "countries-tab",
    title: "Vista de Países",
    content: "¡Ahora vamos a ver los datos globales! Esta vista muestra datos REALES de emisiones por país a nivel global.",
    target: "countries-tab",
    icon: Globe,
    action: () => {
      const tab = document.querySelector('[value="countries"]') as HTMLButtonElement
      if (tab) tab.click()
    },
  },
  {
    id: "world-map",
    title: "Top 10 Emisores Globales",
    content: "Este gráfico muestra los 10 países con mayores emisiones de CO₂. Cada barra representa un país con sus emisiones reales y tendencia de cambio.",
    target: "world-map",
    icon: BarChart2,
  },
  {
    id: "country-details",
    title: "Detalles del País",
    content: "Aquí ves datos reales del país seleccionado: emisiones 2021, 2022, cambio porcentual, población y PIB.",
    target: "country-details",
    icon: FileText,
  },
  {
    id: "country-ranking",
    title: "Ranking Global Real",
    content: "Lista de países ordenados por emisiones reales. China, Estados Unidos e India son los mayores emisores mundiales.",
    target: "country-ranking",
    icon: Trophy,
  },
  {
    id: "final",
    title: "¡Tour Completado!",
    content: "¡Perfecto! Ahora conoces ambas vistas: datos organizacionales (Vista General) y datos globales reales (Por Países). ¡Explora libremente!",
    target: null,
    icon: CheckCircle2,
  },
]

interface AnimatedCounterProps {
  value: number
  duration?: number
  suffix?: string
}

const AnimatedCounter = ({ value, duration = 2000, suffix = "" }: AnimatedCounterProps) => {
  const [count, setCount] = useState(0)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    let startTimestamp: number
    const animate = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp
      const progress = Math.min((timestamp - startTimestamp) / duration, 1)
      setCount(Math.floor(progress * value))
      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }
    requestAnimationFrame(animate)
  }, [value, duration])

  if (!isClient) {
    return <span>0{suffix}</span>
  }

  return <span>{count}{suffix}</span>
}

interface TourOverlayProps {
  isActive: boolean
  currentStep: number
  onNext: () => void
  onPrev: () => void
  onClose: () => void
}

const TourOverlay = ({ isActive, currentStep, onNext, onPrev, onClose }: TourOverlayProps) => {
  const [mounted, setMounted] = useState(false)
  const tooltipRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!isActive || !mounted) return

    const targetElement = document.querySelector(`[data-tour="${tourSteps[currentStep].target}"]`)
    if (!targetElement) return

    const highlightElement = () => {
      targetElement.classList.add('ring-2', 'ring-violet-500', 'ring-offset-2', 'z-50', 'relative')
    }

    const removeHighlight = () => {
      targetElement.classList.remove('ring-2', 'ring-violet-500', 'ring-offset-2', 'z-50', 'relative')
    }

    highlightElement()
    return () => removeHighlight()
  }, [isActive, currentStep, mounted])

  if (!isActive || !mounted) return null

  const currentStepData = tourSteps[currentStep]
  const IconComponent = currentStepData.icon

  return (
    <div className="fixed inset-0 bg-black/50 z-40">
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div
          ref={tooltipRef}
          className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6 relative"
        >
          <div className="mb-6">
            <div className="flex items-center space-x-3 mb-2">
              {IconComponent && <IconComponent className="w-6 h-6 text-violet-600" />}
              <h3 className="text-xl font-bold text-slate-900">{currentStepData.title}</h3>
            </div>
            <p className="text-slate-600">{currentStepData.content}</p>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <button
                onClick={onPrev}
                disabled={currentStep === 0}
                className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                  currentStep === 0
                    ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                    : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                }`}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={onNext}
                className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-all duration-200"
              >
                {currentStep === tourSteps.length - 1 ? 'Finalizar' : <ChevronRight className="w-5 h-5" />}
              </button>
            </div>
            
            <div className="flex items-center space-x-1">
              {tourSteps.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    index === currentStep ? 'bg-violet-600' : 'bg-slate-200'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors duration-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

interface WorldMapProps {
  countries: any[]
  selectedCountry: string | null
  onCountrySelect: (code: string) => void
}

const WorldMap = ({ countries, selectedCountry, onCountrySelect }: WorldMapProps) => {
  const sortedCountries = [...countries].sort((a, b) => b.emissions2022 - a.emissions2022).slice(0, 10)

  return (
    <div
      className="relative w-full h-[600px] bg-gradient-to-br from-slate-50 to-slate-100 rounded-3xl overflow-hidden border border-slate-200 shadow-xl p-8"
      data-tour="world-map"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-purple-500/5"></div>
      
      {/* Título y descripción */}
      <div className="relative mb-8">
        <h3 className="text-2xl font-bold text-slate-900 mb-2">Top 10 Emisores Globales</h3>
        <p className="text-slate-600">Emisiones de CO₂ por país en millones de toneladas (2022)</p>
      </div>

      {/* Gráfico de barras */}
      <div className="relative h-[400px] flex items-end justify-between gap-4">
        {sortedCountries.map((country, index) => {
          const maxEmissions = sortedCountries[0].emissions2022
          const height = (country.emissions2022 / maxEmissions) * 100
          const isSelected = selectedCountry === country.code

          return (
            <div
              key={country.code}
              className="flex-1 flex flex-col items-center group cursor-pointer"
              onClick={() => onCountrySelect(country.code)}
            >
              {/* Barra */}
              <div
                className={`w-full relative transition-all duration-500 ${
                  isSelected ? 'scale-105' : 'hover:scale-105'
                }`}
                style={{ height: `${height}%` }}
              >
                <div
                  className="absolute inset-0 rounded-t-xl bg-gradient-to-t"
                  style={{
                    backgroundImage: `linear-gradient(to top, ${country.color}, ${country.color}80)`,
                    boxShadow: `0 0 20px ${country.color}40`,
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent rounded-t-xl"></div>
                </div>
                
                {/* Efecto de brillo */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Nombre del país */}
              <div className="mt-4 text-center">
                <div className="text-sm font-medium text-slate-700">{country.name}</div>
                <div className="text-xs text-slate-500">
                  {country.emissions2022.toLocaleString()} MtCO₂e
                </div>
              </div>

              {/* Indicador de tendencia */}
              <div className="mt-2 flex items-center space-x-1">
                {country.trend === "down" ? (
                  <TrendingDown className="w-4 h-4 text-emerald-500" />
                ) : (
                  <TrendingUp className="w-4 h-4 text-red-500" />
                )}
                <span className={`text-xs font-medium ${
                  country.trend === "down" ? "text-emerald-500" : "text-red-500"
                }`}>
                  {Math.abs(country.reduction)}%
                </span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Leyenda */}
      <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm px-6 py-4 rounded-xl shadow-lg">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-emerald-500 rounded-full shadow-lg"></div>
            <span className="font-medium text-slate-700">Reduciendo</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full shadow-lg"></div>
            <span className="font-medium text-slate-700">Aumentando</span>
          </div>
        </div>
      </div>

      {/* Información adicional */}
      <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm px-6 py-4 rounded-xl shadow-lg">
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <div className="text-sm text-slate-600">Total Global</div>
            <div className="text-xl font-bold text-slate-900">
              {sortedCountries.reduce((sum, country) => sum + country.emissions2022, 0).toLocaleString()} MtCO₂e
            </div>
          </div>
          <div className="h-12 w-px bg-slate-200"></div>
          <div className="text-right">
            <div className="text-sm text-slate-600">Países Analizados</div>
            <div className="text-xl font-bold text-slate-900">{sortedCountries.length}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ModernGHGDashboard() {
  const [isClient, setIsClient] = useState(false)
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null)
  const [isTourActive, setIsTourActive] = useState(false)
  const [currentTourStep, setCurrentTourStep] = useState(0)
  const [viewMode, setViewMode] = useState<"overview" | "countries">("overview")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedYear, setSelectedYear] = useState("2022")
  const [selectedScope, setSelectedScope] = useState<"all" | "scope1" | "scope2" | "scope3">("all")
  const [animationKey, setAnimationKey] = useState(0)

  const currentData = selectedYear === "2021" ? emissionsData2021 : emissionsData2022
  const selectedCountryData = countriesData.find((c) => c.code === selectedCountry)
  const filteredCountries = countriesData.filter(
    (country) =>
      country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      country.code.toLowerCase().includes(searchTerm.toLowerCase())
  )

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  const startTour = () => {
    setIsTourActive(true)
    setCurrentTourStep(0)
  }

  const nextTourStep = () => {
    if (currentTourStep === tourSteps.length - 1) {
      closeTour()
      return
    }
    
    const nextStep = currentTourStep + 1
    setCurrentTourStep(nextStep)
    
    // Ejecutar acción si existe
    if (tourSteps[nextStep].action) {
      tourSteps[nextStep].action()
    }
  }

  const prevTourStep = () => {
    if (currentTourStep > 0) {
      setCurrentTourStep(currentTourStep - 1)
    }
  }

  const closeTour = () => {
    setIsTourActive(false)
    setCurrentTourStep(0)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 relative overflow-hidden">
      {/* Tour Overlay */}
      <TourOverlay
        isActive={isTourActive}
        currentStep={currentTourStep}
        onNext={nextTourStep}
        onPrev={prevTourStep}
        onClose={closeTour}
      />

      {/* Fondo con efectos modernos */}
      <div className="absolute inset-0 opacity-60">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-violet-400 to-purple-400 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
      </div>

      {/* Header moderno */}
      <header
        className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/60 shadow-sm"
        data-tour="header"
      >
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-violet-500 via-purple-500 to-indigo-500 rounded-2xl flex items-center justify-center shadow-2xl shadow-violet-500/25 animate-pulse-glow">
                  <Atom className="w-8 h-8 text-white animate-spin-slow" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500 to-indigo-500 rounded-2xl blur-lg opacity-50 animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 via-violet-700 to-indigo-700 bg-clip-text text-transparent">
                  EcoVision Pro
                </h1>
                <p className="text-slate-600 text-lg font-medium">Dashboard Inteligente de Emisiones GHG</p>
                <div className="flex items-center space-x-2 mt-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-slate-500 font-medium">
                    {viewMode === "overview" ? "Datos organizacionales simulados" : "Datos globales reales"}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative" data-tour="search-input">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <Input
                  placeholder="Buscar país..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 w-64 bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-violet-500 focus:ring-violet-500/20 transition-all duration-300 rounded-xl shadow-sm"
                />
              </div>

              <Tabs
                value={viewMode}
                onValueChange={(value) => setViewMode(value as "overview" | "countries")}
                className="bg-slate-100 rounded-xl p-1 shadow-sm"
                data-tour="view-tabs"
              >
                <TabsList className="bg-transparent">
                  <TabsTrigger
                    value="overview"
                    className="text-slate-700 data-[state=active]:bg-white data-[state=active]:text-violet-700 data-[state=active]:shadow-sm"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Vista General
                  </TabsTrigger>
                  <TabsTrigger
                    value="countries"
                    className="text-slate-700 data-[state=active]:bg-white data-[state=active]:text-violet-700 data-[state=active]:shadow-sm"
                    data-tour="countries-tab"
                  >
                    <MapPin className="w-4 h-4 mr-2" />
                    Por Países
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              <Button
                variant="outline"
                size="sm"
                className="bg-gradient-to-r from-violet-500 to-purple-500 border-0 text-white hover:from-violet-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-xl rounded-xl"
                onClick={() => setAnimationKey((prev) => prev + 1)}
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Actualizar
              </Button>

              {/* Botón del Tour - Siempre visible */}
              <Button
                onClick={startTour}
                className="bg-gradient-to-r from-emerald-500 to-teal-500 border-0 text-white hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 shadow-lg hover:shadow-xl rounded-xl relative z-50"
                style={{ zIndex: 50 }}
              >
                <Play className="w-4 h-4 mr-2" />
                Tour Guiado
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="relative z-10 container mx-auto px-6 py-8">
        {viewMode === "overview" && (
          <>
            {/* Tarjeta explicativa */}
            <Card
              className="mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 shadow-lg rounded-2xl"
              data-tour="context-card"
            >
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Globe className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">📊 Vista General - Datos Organizacionales</h3>
                    <p className="text-slate-700 leading-relaxed">
                      <strong>Esta vista muestra datos simulados de una organización</strong> para demostrar cómo
                      monitorear emisiones GHG a nivel empresarial. Incluye:
                    </p>
                    <ul className="mt-3 space-y-1 text-slate-600">
                      <li>
                        • <strong>KPIs organizacionales:</strong> Emisiones totales, metas y eficiencia
                      </li>
                      <li>
                        • <strong>Análisis por alcance:</strong> Scope 1, 2 y 3 según estándares GHG Protocol
                      </li>
                      <li>
                        • <strong>Predicciones con IA:</strong> Proyecciones basadas en tendencias
                      </li>
                      <li>
                        • <strong>Alertas inteligentes:</strong> Notificaciones automáticas sobre el progreso
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* KPI Cards modernas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12" data-tour="kpi-cards">
              <Card className="group bg-white border-0 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 animate-slide-up rounded-2xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-teal-500/10"></div>
                <CardHeader className="pb-4 relative">
                  <div className="flex items-center justify-between">
                    <div className="relative">
                      <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-emerald-500/50 transition-all duration-300">
                        <Globe className="w-7 h-7 text-white group-hover:animate-spin transition-transform duration-300" />
                      </div>
                    </div>
                    <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 font-medium">Total 2022</Badge>
                  </div>
                </CardHeader>
                <CardContent className="relative">
                  <div className="space-y-3">
                    <p className="text-5xl font-bold text-slate-900">
                      <AnimatedCounter value={850} />
                    </p>
                    <p className="text-lg text-slate-600 font-medium">tCO₂e</p>
                    <div className="flex items-center space-x-2">
                      <TrendingDown className="w-5 h-5 text-emerald-600" />
                      <span className="text-lg font-bold text-emerald-600">
                        -<AnimatedCounter value={29.2} suffix="%" />
                      </span>
                      <span className="text-slate-500">vs 2021</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="group bg-white border-0 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 animate-slide-up animation-delay-200 rounded-2xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-purple-500/10"></div>
                <CardHeader className="pb-4 relative">
                  <div className="flex items-center justify-between">
                    <div className="relative">
                      <div className="w-14 h-14 bg-gradient-to-br from-violet-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-violet-500/50 transition-all duration-300">
                        <Target className="w-7 h-7 text-white group-hover:animate-pulse transition-transform duration-300" />
                      </div>
                    </div>
                    <Badge className="bg-violet-100 text-violet-700 border-violet-200 font-medium">Meta 2030</Badge>
                  </div>
                </CardHeader>
                <CardContent className="relative">
                  <div className="space-y-3">
                    <p className="text-5xl font-bold text-slate-900">
                      <AnimatedCounter value={120} />
                    </p>
                    <p className="text-lg text-slate-600 font-medium">tCO₂e objetivo</p>
                    <div className="flex items-center space-x-2">
                      <CheckCircle2 className="w-5 h-5 text-violet-600" />
                      <span className="text-lg font-bold text-violet-600">
                        <AnimatedCounter value={86} suffix="%" />
                      </span>
                      <span className="text-slate-500">completado</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="group bg-white border-0 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 animate-slide-up animation-delay-400 rounded-2xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10"></div>
                <CardHeader className="pb-4 relative">
                  <div className="flex items-center justify-between">
                    <div className="relative">
                      <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-cyan-500/50 transition-all duration-300">
                        <CloudLightning className="w-7 h-7 text-white group-hover:animate-bounce transition-transform duration-300" />
                      </div>
                    </div>
                    <Badge className="bg-cyan-100 text-cyan-700 border-cyan-200 font-medium">Eficiencia</Badge>
                  </div>
                </CardHeader>
                <CardContent className="relative">
                  <div className="space-y-3">
                    <p className="text-5xl font-bold text-slate-900">
                      <AnimatedCounter value={94} suffix="%" />
                    </p>
                    <p className="text-lg text-slate-600 font-medium">Optimización</p>
                    <div className="flex items-center space-x-2">
                      <Star className="w-5 h-5 text-cyan-600" />
                      <span className="text-lg font-bold text-cyan-600">Excelente</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="group bg-white border-0 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 animate-slide-up animation-delay-600 rounded-2xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-red-500/10"></div>
                <CardHeader className="pb-4 relative">
                  <div className="flex items-center justify-between">
                    <div className="relative">
                      <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-orange-500/50 transition-all duration-300">
                        <Activity className="w-7 h-7 text-white group-hover:animate-pulse transition-transform duration-300" />
                      </div>
                    </div>
                    <Badge className="bg-orange-100 text-orange-700 border-orange-200 font-medium">Tendencia</Badge>
                  </div>
                </CardHeader>
                <CardContent className="relative">
                  <div className="space-y-3">
                    <p className="text-5xl font-bold text-slate-900">
                      <AnimatedCounter value={78} suffix="%" />
                    </p>
                    <p className="text-lg text-slate-600 font-medium">Progreso</p>
                    <div className="flex items-center space-x-2">
                      <TrendingDown className="w-5 h-5 text-orange-600" />
                      <span className="text-lg font-bold text-orange-600">En meta</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Tendencia Global con Predicciones IA */}
            <Card
              className="mb-8 bg-white border-0 shadow-xl rounded-2xl overflow-hidden animate-fade-in"
              data-tour="trend-chart"
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl font-bold text-slate-900 flex items-center space-x-3">
                      <Brain className="w-6 h-6 text-violet-600" />
                      <span>Tendencias y Predicciones con IA</span>
                    </CardTitle>
                    <CardDescription className="text-slate-600 text-lg">
                      Proyección hacia 2030 vs Objetivos con Machine Learning
                    </CardDescription>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                      <span className="text-sm text-slate-600 font-medium">Real</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span className="text-sm text-slate-600 font-medium">Objetivo</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span className="text-sm text-slate-600 font-medium">Predicción IA</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400} key={animationKey}>
                  <ComposedChart data={projectionData}>
                    <defs>
                      <linearGradient id="colorEmissions" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="colorPrediction" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="year" stroke="#64748b" fontSize={12} />
                    <YAxis stroke="#64748b" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "white",
                        border: "1px solid #e2e8f0",
                        borderRadius: "12px",
                        boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                        color: "#1e293b",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="emissions"
                      stroke="#10b981"
                      strokeWidth={3}
                      fillOpacity={1}
                      fill="url(#colorEmissions)"
                    />
                    <Line
                      type="monotone"
                      dataKey="target"
                      stroke="#ef4444"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      dot={false}
                    />
                    <Line
                      type="monotone"
                      dataKey="prediction"
                      stroke="#3b82f6"
                      strokeWidth={3}
                      strokeDasharray="8 4"
                      dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Alertas Inteligentes */}
            <Card
              className="mb-8 bg-white border-0 shadow-xl rounded-2xl overflow-hidden animate-fade-in"
              data-tour="alerts-section"
            >
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-slate-900 flex items-center space-x-3">
                  <Bell className="w-6 h-6 text-orange-600" />
                  <span>Alertas Inteligentes</span>
                </CardTitle>
                <CardDescription className="text-slate-600 text-lg">
                  Notificaciones automáticas sobre el estado de tus emisiones
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {alertsData.map((alert, index) => (
                    <Alert
                      key={index}
                      className={`border-l-4 ${
                        alert.type === "warning"
                          ? "border-l-orange-500 bg-orange-50"
                          : alert.type === "success"
                            ? "border-l-emerald-500 bg-emerald-50"
                            : "border-l-blue-500 bg-blue-50"
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        {alert.type === "warning" ? (
                          <AlertTriangle className="w-5 h-5 text-orange-600 mt-0.5" />
                        ) : alert.type === "success" ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5" />
                        ) : (
                          <Lightbulb className="w-5 h-5 text-blue-600 mt-0.5" />
                        )}
                        <div className="flex-1">
                          <h4 className="font-semibold text-slate-900">{alert.title}</h4>
                          <AlertDescription className="text-slate-600">{alert.description}</AlertDescription>
                        </div>
                        <Badge
                          variant="outline"
                          className={`${
                            alert.priority === "high"
                              ? "border-red-200 text-red-700"
                              : alert.priority === "medium"
                                ? "border-orange-200 text-orange-700"
                                : "border-blue-200 text-blue-700"
                          }`}
                        >
                          {alert.priority === "high" ? "Alta" : alert.priority === "medium" ? "Media" : "Baja"}
                        </Badge>
                      </div>
                    </Alert>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Nuevos gráficos */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              {/* Análisis de Eficiencia */}
              <Card
                className="bg-white border-0 shadow-xl rounded-2xl overflow-hidden animate-fade-in"
                data-tour="efficiency-chart"
              >
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-slate-900 flex items-center space-x-3">
                    <ZapIcon className="w-6 h-6 text-yellow-600" />
                    <span>Análisis de Eficiencia</span>
                  </CardTitle>
                  <CardDescription className="text-slate-600 text-lg">
                    Progreso vs Objetivos por Categoría
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {efficiencyData.map((item, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-slate-700">{item.category}</span>
                          <span className="text-sm text-slate-500">
                            {item.percentage}% / {item.target}%
                          </span>
                        </div>
                        <div className="relative">
                          <div className="w-full bg-slate-200 rounded-full h-3">
                            <div
                              className={`h-3 rounded-full transition-all duration-1000 ${
                                item.percentage >= item.target ? "bg-emerald-500" : "bg-blue-500"
                              }`}
                              style={{ width: `${Math.min(item.percentage, 100)}%` }}
                            ></div>
                          </div>
                          <div
                            className="absolute top-0 w-1 h-3 bg-red-400 rounded"
                            style={{ left: `${item.target}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Comparación Mensual */}
              <Card
                className="bg-white border-0 shadow-xl rounded-2xl overflow-hidden animate-fade-in"
                data-tour="monthly-comparison"
              >
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-slate-900 flex items-center space-x-3">
                    <Calendar className="w-6 h-6 text-purple-600" />
                    <span>Comparación Mensual</span>
                  </CardTitle>
                  <CardDescription className="text-slate-600 text-lg">
                    Actual vs Presupuesto vs Año Anterior
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={monthlyComparisonData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
                      <YAxis stroke="#64748b" fontSize={12} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "white",
                          border: "1px solid #e2e8f0",
                          borderRadius: "12px",
                          boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                          color: "#1e293b",
                        }}
                      />
                      <Bar dataKey="actual" fill="#10b981" name="Actual" radius={[2, 2, 0, 0]} />
                      <Bar dataKey="budget" fill="#3b82f6" name="Presupuesto" radius={[2, 2, 0, 0]} />
                      <Bar dataKey="lastYear" fill="#ef4444" name="Año Anterior" radius={[2, 2, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Gráficos existentes mejorados */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              {/* Análisis de Eficiencia */}
              <Card className="bg-white border-0 shadow-xl rounded-2xl overflow-hidden animate-fade-in animation-delay-200">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-slate-900 flex items-center space-x-3">
                    <Layers className="w-6 h-6 text-cyan-600" />
                    <span>Análisis Sectorial</span>
                  </CardTitle>
                  <CardDescription className="text-slate-600 text-lg">Comparación 2021 vs 2022</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <RadarChart data={radarData}>
                      <PolarGrid stroke="#e2e8f0" />
                      <PolarAngleAxis dataKey="subject" tick={{ fill: "#64748b", fontSize: 12 }} />
                      <PolarRadiusAxis tick={{ fill: "#64748b", fontSize: 10 }} />
                      <Radar
                        name="2021"
                        dataKey="A"
                        stroke="#ef4444"
                        fill="#ef4444"
                        fillOpacity={0.2}
                        strokeWidth={2}
                      />
                      <Radar
                        name="2022"
                        dataKey="B"
                        stroke="#10b981"
                        fill="#10b981"
                        fillOpacity={0.2}
                        strokeWidth={2}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "white",
                          border: "1px solid #e2e8f0",
                          borderRadius: "12px",
                          boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                          color: "#1e293b",
                        }}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Emisiones por fuente mejorado */}
              <Card className="bg-white border-0 shadow-xl rounded-2xl overflow-hidden animate-fade-in animation-delay-400">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-slate-900 flex items-center space-x-3">
                    <Flame className="w-6 h-6 text-orange-600" />
                    <span>Por Fuente</span>
                  </CardTitle>
                  <CardDescription className="text-slate-600 text-lg">Distribución actual</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={sourceData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={120}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {sourceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "white",
                          border: "1px solid #e2e8f0",
                          borderRadius: "12px",
                          boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                          color: "#1e293b",
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="space-y-3 mt-6">
                    {sourceData.map((source, index) => {
                      const IconComponent = source.icon
                      return (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-all duration-300"
                        >
                          <div className="flex items-center space-x-3">
                            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: source.color }}></div>
                            <IconComponent className="w-5 h-5 text-slate-600" />
                            <span className="text-slate-900 font-medium">{source.name}</span>
                          </div>
                          <span className="text-xl font-bold text-slate-900">{source.value}%</span>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Análisis por alcance mejorado */}
            <div className="grid grid-cols-1 lg:grid-cols-1 gap-8 mb-12">
              <Card className="bg-white border-0 shadow-xl rounded-2xl overflow-hidden animate-fade-in">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-2xl font-bold text-slate-900 flex items-center space-x-3">
                        <BarChart3 className="w-6 h-6 text-blue-600" />
                        <span>Análisis por Alcance</span>
                      </CardTitle>
                      <CardDescription className="text-slate-600 text-lg">
                        Emisiones mensuales {selectedYear}
                      </CardDescription>
                    </div>
                    <Tabs
                      value={selectedScope}
                      onValueChange={(value) => setSelectedScope(value as "all" | "scope1" | "scope2" | "scope3")}
                      className="bg-slate-100 rounded-xl p-1"
                    >
                      <TabsList className="bg-transparent grid grid-cols-4">
                        <TabsTrigger
                          value="all"
                          className="text-slate-700 data-[state=active]:bg-white data-[state=active]:text-blue-700"
                        >
                          Todos
                        </TabsTrigger>
                        <TabsTrigger
                          value="scope1"
                          className="text-slate-700 data-[state=active]:bg-white data-[state=active]:text-blue-700"
                        >
                          Scope 1
                        </TabsTrigger>
                        <TabsTrigger
                          value="scope2"
                          className="text-slate-700 data-[state=active]:bg-white data-[state=active]:text-blue-700"
                        >
                          Scope 2
                        </TabsTrigger>
                        <TabsTrigger
                          value="scope3"
                          className="text-slate-700 data-[state=active]:bg-white data-[state=active]:text-blue-700"
                        >
                          Scope 3
                        </TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={currentData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
                      <YAxis stroke="#64748b" fontSize={12} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "white",
                          border: "1px solid #e2e8f0",
                          borderRadius: "12px",
                          boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                          color: "#1e293b",
                        }}
                      />
                      {(selectedScope === "all" || selectedScope === "scope1") && (
                        <Bar dataKey="scope1" stackId="a" fill="#3b82f6" radius={[0, 0, 0, 0]} />
                      )}
                      {(selectedScope === "all" || selectedScope === "scope2") && (
                        <Bar dataKey="scope2" stackId="a" fill="#10b981" radius={[0, 0, 0, 0]} />
                      )}
                      {(selectedScope === "all" || selectedScope === "scope3") && (
                        <Bar dataKey="scope3" stackId="a" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                      )}
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </>
        )}

        {viewMode === "countries" && (
          <>
            {/* Tarjeta explicativa para países */}
            <Card className="mb-8 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 shadow-lg rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Globe className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">
                      🌍 Vista de Países - Datos Globales Reales
                    </h3>
                    <p className="text-slate-700 leading-relaxed">
                      <strong>Esta vista muestra datos REALES de emisiones por país</strong> basados en reportes
                      oficiales de organizaciones internacionales. Incluye:
                    </p>
                    <ul className="mt-3 space-y-1 text-slate-600">
                      <li>
                        • <strong>Emisiones por país:</strong> Datos reales de CO₂ en millones de toneladas
                      </li>
                      <li>
                        • <strong>Tendencias globales:</strong> Países que reducen vs aumentan emisiones
                      </li>
                      <li>
                        • <strong>Ranking mundial:</strong> Los mayores emisores del planeta
                      </li>
                      <li>
                        • <strong>Datos socioeconómicos:</strong> Población, PIB y emisiones per cápita
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Mapa mundial interactivo */}
            <Card className="mb-12 bg-white border-0 shadow-xl rounded-2xl overflow-hidden animate-fade-in">
              <CardHeader>
                <CardTitle className="text-3xl font-bold text-slate-900 flex items-center space-x-3">
                  <Globe className="w-8 h-8 text-violet-600" />
                  <span>Mapa Global de Emisiones</span>
                </CardTitle>
                <CardDescription className="text-slate-600 text-xl">
                  Haz clic en cualquier país para ver sus datos reales detallados
                </CardDescription>
              </CardHeader>
              <CardContent>
                <WorldMap
                  countries={filteredCountries}
                  selectedCountry={selectedCountry}
                  onCountrySelect={setSelectedCountry}
                />
              </CardContent>
            </Card>

            {/* Detalles del país seleccionado */}
            {selectedCountryData && (
              <Card
                className="mb-12 bg-white border-0 shadow-xl rounded-2xl overflow-hidden animate-bounce-in"
                data-tour="country-details"
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-3xl font-bold text-slate-900 flex items-center space-x-3">
                        <div
                          className="w-8 h-8 rounded-full"
                          style={{ backgroundColor: selectedCountryData.color }}
                        ></div>
                        <span>{selectedCountryData.name}</span>
                      </CardTitle>
                      <CardDescription className="text-slate-600 text-xl">
                        Análisis detallado de emisiones reales
                      </CardDescription>
                    </div>
                    <Badge
                      className={`text-lg px-4 py-2 font-medium ${
                        selectedCountryData.trend === "down"
                          ? "bg-emerald-100 text-emerald-700 border-emerald-200"
                          : "bg-red-100 text-red-700 border-red-200"
                      }`}
                    >
                      {selectedCountryData.trend === "down" ? "Reduciendo" : "Aumentando"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                    <div className="text-center p-6 bg-slate-50 rounded-2xl">
                      <p className="text-3xl font-bold text-slate-900 mb-2">
                        <AnimatedCounter value={selectedCountryData.emissions2022} />
                      </p>
                      <p className="text-slate-600 text-sm font-medium">MtCO₂e (2022)</p>
                    </div>
                    <div className="text-center p-6 bg-slate-50 rounded-2xl">
                      <p className="text-3xl font-bold text-slate-900 mb-2">
                        <AnimatedCounter value={selectedCountryData.emissions2021} />
                      </p>
                      <p className="text-slate-600 text-sm font-medium">MtCO₂e (2021)</p>
                    </div>
                    <div className="text-center p-6 bg-slate-50 rounded-2xl">
                      <p
                        className={`text-3xl font-bold mb-2 ${
                          selectedCountryData.trend === "down" ? "text-emerald-600" : "text-red-600"
                        }`}
                      >
                        {selectedCountryData.trend === "down" ? "-" : "+"}
                        <AnimatedCounter value={Math.abs(selectedCountryData.reduction)} suffix="%" />
                      </p>
                      <p className="text-slate-600 text-sm font-medium">Cambio anual</p>
                    </div>
                    <div className="text-center p-6 bg-slate-50 rounded-2xl">
                      <p className="text-3xl font-bold text-slate-900 mb-2">
                        <AnimatedCounter value={selectedCountryData.population} />M
                      </p>
                      <p className="text-slate-600 text-sm font-medium">Población</p>
                    </div>
                    <div className="text-center p-6 bg-slate-50 rounded-2xl">
                      <p className="text-3xl font-bold text-slate-900 mb-2">
                        <AnimatedCounter
                          value={Math.round(
                            (selectedCountryData.emissions2022 / selectedCountryData.population) * 1000,
                          )}
                        />
                      </p>
                      <p className="text-slate-600 text-sm font-medium">tCO₂e per cápita</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Lista de países */}
            <Card
              className="bg-white border-0 shadow-xl rounded-2xl overflow-hidden animate-fade-in"
              data-tour="country-ranking"
            >
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-slate-900 flex items-center space-x-3">
                  <Filter className="w-6 h-6 text-blue-600" />
                  <span>Ranking Global Real</span>
                </CardTitle>
                <CardDescription className="text-slate-600 text-lg">
                  Países ordenados por emisiones reales 2022 (MtCO₂e)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredCountries
                    .sort((a, b) => b.emissions2022 - a.emissions2022)
                    .map((country, index) => (
                      <div
                        key={country.code}
                        className={`p-6 rounded-2xl cursor-pointer transition-all duration-500 transform hover:scale-105 ${
                          selectedCountry === country.code
                            ? "bg-gradient-to-br from-violet-50 to-purple-50 border-2 border-violet-200 shadow-lg"
                            : "bg-slate-50 hover:bg-slate-100 border border-slate-200"
                        }`}
                        onClick={() => setSelectedCountry(country.code)}
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-4">
                            <div className="text-2xl font-bold text-slate-400">#{index + 1}</div>
                            <div
                              className="w-6 h-6 rounded-full shadow-lg"
                              style={{ backgroundColor: country.color }}
                            ></div>
                            <div>
                              <h3 className="text-xl font-bold text-slate-900">{country.name}</h3>
                              <p className="text-slate-600">{country.population}M habitantes</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-slate-900">
                              <AnimatedCounter value={country.emissions2022} />
                            </p>
                            <p className="text-slate-600">MtCO₂e</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            {country.trend === "down" ? (
                              <TrendingDown className="w-5 h-5 text-emerald-600" />
                            ) : (
                              <TrendingUp className="w-5 h-5 text-red-600" />
                            )}
                            <span
                              className={`font-bold ${country.trend === "down" ? "text-emerald-600" : "text-red-600"}`}
                            >
                              {country.trend === "down" ? "-" : "+"}
                              {Math.abs(country.reduction)}%
                            </span>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-slate-600">
                              {Math.round((country.emissions2022 / country.population) * 1000)} tCO₂e per cápita
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </main>
    </div>
  )
}
