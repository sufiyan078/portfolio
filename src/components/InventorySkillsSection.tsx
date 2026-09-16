import React, { useState } from 'react';
import { SKILLS } from '../data/skills';
import { INVENTORY_CATEGORIES } from '../data/inventory';
import { Package, Cpu, Database, Server, CheckCircle2, Layout, Box, Bot, Zap, BarChart3, Rocket } from './ui/RealmIcons';
import { getUniversalAudioProps } from '../utils/soundEffects';
import { HoverMarqueeText } from './ui/HoverMarqueeText';
import { IntelDisclosure } from './ui/IntelDisclosure';

interface InventorySkillsSectionProps {
  activeTab?: 'abilities' | 'inventory';
  onTabChange?: (tab: 'abilities' | 'inventory') => void;
}

export const InventorySkillsSection: React.FC<InventorySkillsSectionProps> = ({
  activeTab: controlledActiveTab,
  onTabChange
}) => {
  const [localActiveTab, setLocalActiveTab] = useState<'abilities' | 'inventory'>('abilities');
  const activeTab = controlledActiveTab !== undefined ? controlledActiveTab : localActiveTab;

  const handleTabSelect = (tab: 'abilities' | 'inventory') => {
    if (onTabChange) {
      onTabChange(tab);
    } else {
      setLocalActiveTab(tab);
    }
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Bot': return Bot;
      case 'Zap': return Zap;
      case 'BarChart3': return BarChart3;
      case 'Layout': return Layout;
      case 'Rocket': return Rocket;
      case 'Server': return Server;
      case 'Database': return Database;
      case 'Cpu': return Cpu;
      case 'Box': return Box;
      default: return Cpu;
    }
  };

  const getCategoryStyle = (category: string) => {
    switch (category) {
      case 'AI SYSTEMS':
        return {
          cardBorder: 'border-emerald-500/50 hover:border-emerald-400',
          hoverShadow: 'hover:shadow-[0_12px_28px_rgba(16,185,129,0.3)]',
          badge: 'bg-emerald-500/15 border-emerald-500/50 text-emerald-400',
          lvlBadge: 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400',
          iconBox: 'bg-emerald-500/15 border-emerald-500/50 text-emerald-400',
          accentText: 'text-emerald-400',
          scoreText: 'text-emerald-400',
          hoverTitle: 'group-hover:text-emerald-400',
          barFill: 'bg-emerald-400',
          glowColor: 'rgba(16, 185, 129, 0.22)',
          cardBg: 'from-emerald-950/50 via-[#1F150C]/90 to-[#0A160F]/95',
        };
      case 'AUTOMATION':
        return {
          cardBorder: 'border-amber-500/50 hover:border-amber-400',
          hoverShadow: 'hover:shadow-[0_12px_28px_rgba(255,143,0,0.3)]',
          badge: 'bg-amber-500/15 border-amber-500/50 text-amber-400',
          lvlBadge: 'bg-amber-500/20 border-amber-500/50 text-amber-400',
          iconBox: 'bg-amber-500/15 border-amber-500/50 text-amber-400',
          accentText: 'text-amber-400',
          scoreText: 'text-amber-400',
          hoverTitle: 'group-hover:text-amber-400',
          barFill: 'bg-amber-400',
          glowColor: 'rgba(255, 143, 0, 0.22)',
          cardBg: 'from-amber-950/50 via-[#1F150C]/90 to-[#180E04]/95',
        };
      case 'BI & ANALYTICS':
        return {
          cardBorder: 'border-sky-500/50 hover:border-sky-400',
          hoverShadow: 'hover:shadow-[0_12px_28px_rgba(14,165,233,0.3)]',
          badge: 'bg-sky-500/15 border-sky-500/50 text-sky-400',
          lvlBadge: 'bg-sky-500/20 border-sky-500/50 text-sky-400',
          iconBox: 'bg-sky-500/15 border-sky-500/50 text-sky-400',
          accentText: 'text-sky-400',
          scoreText: 'text-sky-400',
          hoverTitle: 'group-hover:text-sky-400',
          barFill: 'bg-sky-400',
          glowColor: 'rgba(14, 165, 233, 0.22)',
          cardBg: 'from-sky-950/50 via-[#1F150C]/90 to-[#07131D]/95',
        };
      case 'WEB ENGINEERING':
        return {
          cardBorder: 'border-indigo-500/50 hover:border-indigo-400',
          hoverShadow: 'hover:shadow-[0_12px_28px_rgba(99,102,241,0.3)]',
          badge: 'bg-indigo-500/15 border-indigo-500/50 text-indigo-400',
          lvlBadge: 'bg-indigo-500/20 border-indigo-500/50 text-indigo-400',
          iconBox: 'bg-indigo-500/15 border-indigo-500/50 text-indigo-400',
          accentText: 'text-indigo-400',
          scoreText: 'text-indigo-400',
          hoverTitle: 'group-hover:text-indigo-400',
          barFill: 'bg-indigo-400',
          glowColor: 'rgba(99, 102, 241, 0.22)',
          cardBg: 'from-indigo-950/50 via-[#1F150C]/90 to-[#0D0B1E]/95',
        };
      case 'SAAS PRODUCTS':
        return {
          cardBorder: 'border-amber-400/50 hover:border-amber-300',
          hoverShadow: 'hover:shadow-[0_12px_28px_rgba(251,191,36,0.3)]',
          badge: 'bg-amber-400/15 border-amber-400/50 text-amber-300',
          lvlBadge: 'bg-amber-400/20 border-amber-400/50 text-amber-300',
          iconBox: 'bg-amber-400/15 border-amber-400/50 text-amber-300',
          accentText: 'text-amber-300',
          scoreText: 'text-amber-300',
          hoverTitle: 'group-hover:text-amber-300',
          barFill: 'bg-amber-300',
          glowColor: 'rgba(251, 191, 36, 0.22)',
          cardBg: 'from-yellow-950/50 via-[#1F150C]/90 to-[#181404]/95',
        };
      case 'BACKEND & APIS':
        return {
          cardBorder: 'border-rose-500/50 hover:border-rose-400',
          hoverShadow: 'hover:shadow-[0_12px_28px_rgba(244,63,94,0.3)]',
          badge: 'bg-rose-500/15 border-rose-500/50 text-rose-400',
          lvlBadge: 'bg-rose-500/20 border-rose-500/50 text-rose-400',
          iconBox: 'bg-rose-500/15 border-rose-500/50 text-rose-400',
          accentText: 'text-rose-400',
          scoreText: 'text-rose-400',
          hoverTitle: 'group-hover:text-rose-400',
          barFill: 'bg-rose-400',
          glowColor: 'rgba(244, 63, 94, 0.22)',
          cardBg: 'from-rose-950/50 via-[#1F150C]/90 to-[#1D080E]/95',
        };
      case 'DATA PIPELINES':
        return {
          cardBorder: 'border-teal-500/50 hover:border-teal-400',
          hoverShadow: 'hover:shadow-[0_12px_28px_rgba(20,184,166,0.3)]',
          badge: 'bg-teal-500/15 border-teal-500/50 text-teal-400',
          lvlBadge: 'bg-teal-500/20 border-teal-500/50 text-teal-400',
          iconBox: 'bg-teal-500/15 border-teal-500/50 text-teal-400',
          accentText: 'text-teal-400',
          scoreText: 'text-teal-400',
          hoverTitle: 'group-hover:text-teal-400',
          barFill: 'bg-teal-400',
          glowColor: 'rgba(20, 184, 166, 0.22)',
          cardBg: 'from-teal-950/50 via-[#1F150C]/90 to-[#061715]/95',
        };
      case 'SYSTEM INTEGRATIONS':
        return {
          cardBorder: 'border-purple-500/50 hover:border-purple-400',
          hoverShadow: 'hover:shadow-[0_12px_28px_rgba(168,85,247,0.3)]',
          badge: 'bg-purple-500/15 border-purple-500/50 text-purple-400',
          lvlBadge: 'bg-purple-500/20 border-purple-500/50 text-purple-400',
          iconBox: 'bg-purple-500/15 border-purple-500/50 text-purple-400',
          accentText: 'text-purple-400',
          scoreText: 'text-purple-400',
          hoverTitle: 'group-hover:text-purple-400',
          barFill: 'bg-purple-400',
          glowColor: 'rgba(168, 85, 247, 0.22)',
          cardBg: 'from-purple-950/50 via-[#1F150C]/90 to-[#170822]/95',
        };
      default:
        return {
          cardBorder: 'border-[#FF8F00]/30 hover:border-[#FF8F00]',
          hoverShadow: 'hover:shadow-[0_12px_28px_rgba(255,143,0,0.18)]',
          badge: 'bg-[#FF8F00]/15 border-[#FF8F00]/30 text-[#FF8F00]',
          lvlBadge: 'bg-[#FF8F00]/15 border-[#FF8F00]/30 text-[#FF8F00]',
          iconBox: 'bg-[#FF8F00]/15 border-[#FF8F00]/40 text-[#FF8F00]',
          accentText: 'text-[#FF8F00]',
          scoreText: 'text-[#FF8F00]',
          hoverTitle: 'group-hover:text-[#FF8F00]',
          barFill: 'bg-[#FF8F00]',
          glowColor: 'rgba(255, 143, 0, 0.18)',
          cardBg: 'from-[#FF8F00]/20 via-[#1F150C]/90 to-[#120B06]/95',
        };
    }
  };

  return (
    <section id="inventory" className="py-24 px-4 max-w-7xl mx-auto relative font-sans">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-16">
        <div className="badge-tag border border-[#FF8F00]/40 bg-[#FF8F00]/10 text-[#FF8F00] mb-3 group">
          <Package className="w-4 h-4 text-[#FF8F00] transition-transform duration-300 group-hover:scale-110" />
          <span className="text-[#FF8F00] font-bold">ABILITIES & LOADOUT</span>
        </div>
        <h2 className="font-heading font-extrabold text-[32px] sm:text-[38px] text-white tracking-tight">
          DEVELOPER <span className="text-[#FF8F00]">ABILITIES & ARSENAL</span>
        </h2>
        <p className="font-mono text-sm text-gray-400 mt-3 max-w-2xl">
          Choose an ability. Explore the tools behind it.
        </p>

        {/* View Toggle Tabs */}
        <div className="flex items-center gap-2 mt-8 p-1.5 rounded-2xl bg-[#000000]/80 border border-white/15 max-w-md w-full">
          <button
            {...getUniversalAudioProps('CARD_CLICK', 'CARD_HOVER', () => handleTabSelect('abilities'))}
            className={`flex-1 px-4 sm:px-6 py-2.5 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer text-center ${
              activeTab === 'abilities'
                ? 'bg-[#FF8F00]/20 text-[#FF8F00] border border-[#FF8F00]/80 shadow-[0_0_15px_rgba(255,143,0,0.4)]'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            ABILITIES
          </button>
          <button
            {...getUniversalAudioProps('CARD_CLICK', 'CARD_HOVER', () => handleTabSelect('inventory'))}
            className={`flex-1 px-4 sm:px-6 py-2.5 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer text-center ${
              activeTab === 'inventory'
                ? 'bg-[#FF8F00]/20 text-[#FF8F00] border border-[#FF8F00]/80 shadow-[0_0_15px_rgba(255,143,0,0.4)]'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            INVENTORY
          </button>
        </div>
      </div>

      {/* Abilities View - 8 Distinctly Color-Coded Builder Capability Cards */}
      {activeTab === 'abilities' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SKILLS.map((skill) => {
            const IconComp = getIcon(skill.iconName);
            const style = getCategoryStyle(skill.category);

            return (
              <div
                key={skill.id}
                {...getUniversalAudioProps('CARD_CLICK', 'CARD_HOVER')}
                className={`glass-panel p-5 sm:p-6 flex flex-col justify-between group border-2 ${style.cardBorder} hover:-translate-y-2 hover:scale-[1.02] ${style.hoverShadow} transition-all duration-300 relative overflow-hidden cursor-pointer min-h-[280px]`}
              >
                <div>
                  {/* Top Bar: Category on left, LVL on right */}
                  <div className="realm-ability-meta flex flex-wrap items-center justify-between gap-2 mb-4">
                    <span className={`font-mono text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${style.badge} whitespace-nowrap`}>
                      {skill.category}
                    </span>
                    <span className={`font-mono text-[9px] font-bold px-2 py-0.5 rounded border ${style.lvlBadge} whitespace-nowrap`}>
                      LVL {skill.percentage}
                    </span>
                  </div>

                  {/* Icon & Title Block */}
                  <div className="flex items-center gap-3 mb-3.5">
                    <div className={`w-14 h-14 rounded-xl border flex items-center justify-center shrink-0 ${style.iconBox}`}>
                      <IconComp className="w-8 h-8" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <HoverMarqueeText
                        text={skill.name}
                        className={`font-heading font-bold text-base text-white ${style.hoverTitle} transition-colors leading-tight`}
                      />
                      <HoverMarqueeText
                        text={skill.capabilityTag}
                        className={`font-nova text-xs font-semibold block mt-1 ${style.accentText} leading-tight`}
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <IntelDisclosure label="Inspect ability">
                    {skill.description}
                  </IntelDisclosure>
                </div>

                {/* Bottom Capability Score & Meter */}
                <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
                  <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${style.barFill}`}
                      style={{ width: `${skill.percentage}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between font-mono text-[10px] text-gray-400">
                    <span className="tracking-wider">CAPABILITY SCORE</span>
                    <span className={`font-bold ${style.scoreText}`}>{skill.percentage}%</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ── RPG Collectible Inventory Vault View ──────────────────────── */}
      {activeTab === 'inventory' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {INVENTORY_CATEGORIES.map((item, categoryIdx) => {
            const IconComponent = getIcon(item.iconName);

            return (
              <div
                key={item.id}
                {...getUniversalAudioProps('CARD_CLICK', 'CARD_HOVER')}
                className={`glass-panel p-6 sm:p-7 flex flex-col justify-between group transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_12px_28px_rgba(255,143,0,0.18)] border-2 ${item.borderColor} relative overflow-hidden cursor-pointer min-h-[475px]`}
              >
                {/* Tactical HUD Corner Crosshairs */}
                <span className="absolute top-2 left-2 text-[#FF8F00]/40 font-mono text-[9px] select-none pointer-events-none">+</span>
                <span className="absolute top-2 right-2 text-[#FF8F00]/40 font-mono text-[9px] select-none pointer-events-none">+</span>
                <span className="absolute bottom-2 left-2 text-[#FF8F00]/40 font-mono text-[9px] select-none pointer-events-none">+</span>
                <span className="absolute bottom-2 right-2 text-[#FF8F00]/40 font-mono text-[9px] select-none pointer-events-none">+</span>

                <div>
                  {/* Vault Header Bar */}
                  <div className="flex items-center justify-between pb-3.5 mb-5 border-b border-white/15">
                    <div>
                      <div className="font-pixel text-[10px] font-bold text-white tracking-widest flex items-center gap-1.5">
                        <span className={item.textColor}>{item.categoryName.toUpperCase()}</span>
                        <span className="text-gray-500">//</span>
                        <span className="text-gray-300">VAULT 0{categoryIdx + 1}</span>
                      </div>
                      <span className="font-mono text-[9px] text-gray-400 block mt-0.5">CAPACITY: {item.techList.length}/6 ITEMS</span>
                    </div>
                    
                    <span className={`font-mono text-[9px] tracking-wider px-2 py-0.5 rounded border ${item.badgeColor} font-bold uppercase shadow-sm`}>
                      {item.rarity}
                    </span>
                  </div>

                  {/* Vault Description & Category Title */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-11 h-11 rounded-xl ${item.bgColor} border border-white/15 flex items-center justify-center ${item.textColor} shrink-0 shadow-inner`}>
                      <IconComponent className="w-5.5 h-5.5 transition-transform duration-300 group-hover:scale-110" />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-base sm:text-lg text-white group-hover:text-white transition-colors tracking-tight leading-tight">
                        {item.name}
                      </h3>
                      <p className="text-[11px] text-gray-400 font-sans leading-snug mt-0.5 min-h-[34px]">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* RPG Inventory Item Slots Grid (2 Columns x 3 Rows) */}
                  <div className="mb-5">
                    <div className="flex items-center justify-between mb-2.5">
                      <span className="font-mono text-[10px] text-gray-400 font-bold uppercase tracking-wider flex items-center gap-1">
                        <Package className={`w-3 h-3 ${item.textColor}`} /> EQUIPPED ITEM SLOTS
                      </span>
                      <span className={`font-mono text-[9px] ${item.textColor} font-bold`}>100% READY</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      {item.techList.map((techName, slotIdx) => (
                        <div
                          key={slotIdx}
                          className="p-2 rounded-lg bg-[#070B14]/80 border border-white/10 hover:border-white/30 flex items-center justify-between gap-2 group/slot transition-all shadow-inner"
                        >
                          <div className="flex items-center gap-2 overflow-hidden min-w-0 flex-1">
                            <div className="w-5 h-5 rounded bg-white/5 border border-white/10 flex items-center justify-center text-[9px] font-mono font-bold text-gray-400 shrink-0">
                              0{slotIdx + 1}
                            </div>
                            <HoverMarqueeText
                              text={techName}
                              className="font-nova text-[11px] sm:text-xs font-semibold text-slate-200 group-hover/slot:text-white"
                            />
                          </div>
                          <span className={`w-1.5 h-1.5 rounded-full ${item.dotBgColor} shrink-0`} title="Equipped & Active" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Vault Mission Telemetry */}
                <div className="pt-3.5 border-t border-white/15">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-[9px] text-gray-400 font-bold uppercase tracking-wider">FIELD DEPLOYMENTS</span>
                    <span className={`font-mono text-[9px] ${item.textColor}`}>VERIFIED</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 min-h-[56px] items-start">
                    {item.projectsUsed.map((proj, i) => (
                      <span key={i} className={`font-nova text-[11px] font-semibold px-2 py-0.5 rounded bg-[#070B14]/80 border border-white/10 ${item.textColor} flex items-center gap-1`}>
                        <CheckCircle2 className={`w-2.5 h-2.5 ${item.textColor} shrink-0`} />
                        <span>{proj}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};
