import React, { useState } from 'react';
import { SKILLS } from '../data/skills';
import { INVENTORY_CATEGORIES } from '../data/inventory';
import { Package, Cpu, Database, Server, CheckCircle2, Layout, Box } from 'lucide-react';
import { playCyberSound } from '../utils/soundEffects';
import { AnimatedPackageIcon } from './ui/AnimatedPackageIcon';
import { AnimatedBotIcon } from './ui/AnimatedBotIcon';
import { AnimatedChartIcon } from './ui/AnimatedChartIcon';
import { AnimatedRocketIcon } from './ui/AnimatedRocketIcon';
import { AnimatedCircuitGearIcon } from './ui/AnimatedCircuitGearIcon';

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
    playCyberSound('click');
    if (onTabChange) {
      onTabChange(tab);
    } else {
      setLocalActiveTab(tab);
    }
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Bot': return AnimatedBotIcon;
      case 'Zap': return AnimatedCircuitGearIcon;
      case 'BarChart3': return AnimatedChartIcon;
      case 'Layout': return Layout;
      case 'Rocket': return AnimatedRocketIcon;
      case 'Server': return Server;
      case 'Database': return Database;
      case 'Cpu': return Cpu;
      case 'Box': return Box;
      default: return Cpu;
    }
  };

  return (
    <section id="inventory" className="py-24 px-4 max-w-7xl mx-auto relative font-sans">
      {/* Section Header per Section 15 */}
      <div className="flex flex-col items-center text-center mb-12">
        <div className="badge-tag border border-[#FF8F00]/40 bg-[#FF8F00]/10 text-[#FF8F00] mb-3 group/badge">
          <AnimatedPackageIcon className="w-3.5 h-3.5" />
          <span className="text-[#FF8F00] font-bold">ABILITIES // INVENTORY</span>
        </div>
        <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
          DEVELOPER <span className="text-[#FF8F00]">ABILITIES & INVENTORY</span>
        </h2>
        <p className="font-mono text-sm text-gray-400 mt-3 max-w-2xl">
          &gt; Engineering competencies presented as abilities & technology stack collectible inventory.
        </p>
      </div>

      {/* Tab Switcher */}
      <div className="flex justify-center mb-12">
        <div className="glass-panel p-1.5 flex flex-col sm:flex-row gap-2 max-w-md w-full">
          <button
            onClick={() => handleTabSelect('abilities')}
            className={`flex-1 px-4 sm:px-6 py-2.5 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer text-center ${
              activeTab === 'abilities'
                ? 'bg-[#FF8F00]/20 text-[#FF8F00] border border-[#FF8F00]/80 shadow-[0_0_15px_rgba(255,143,0,0.4)]'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            03 ABILITIES SYSTEM
          </button>
          <button
            onClick={() => handleTabSelect('inventory')}
            className={`flex-1 px-4 sm:px-6 py-2.5 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer text-center ${
              activeTab === 'inventory'
                ? 'bg-[#FF8F00]/20 text-[#FF8F00] border border-[#FF8F00]/80 shadow-[0_0_15px_rgba(255,143,0,0.4)]'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            04 COLLECTIBLE INVENTORY
          </button>
        </div>
      </div>

      {/* Abilities View - 8 Builder Capability Cards */}
      {activeTab === 'abilities' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SKILLS.map((skill) => {
            const IconComp = getIcon(skill.iconName);

            return (
              <div
                key={skill.id}
                onMouseEnter={() => playCyberSound('hover')}
                className="glass-panel p-6 flex flex-col justify-between group hover:border-[#FF8F00]/70 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_12px_28px_rgba(255,143,0,0.18)] transition-all duration-300 relative overflow-hidden cursor-pointer"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-[9px] text-[#FF8F00] font-bold uppercase tracking-widest bg-[#FF8F00]/10 px-2 py-0.5 rounded border border-[#FF8F00]/30">
                      {skill.category}
                    </span>
                    <span className="font-mono text-xs font-bold text-[#FF8F00] px-2 py-0.5 rounded bg-[#FF8F00]/15 border border-[#FF8F00]/30">
                      LVL {skill.level.toUpperCase()}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-[#FF8F00]/15 border border-[#FF8F00]/40 flex items-center justify-center text-[#FF8F00] shrink-0">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-base text-white group-hover:text-[#FF8F00] transition-colors leading-tight">
                        {skill.name}
                      </h3>
                      <span className="font-black-ops text-xs font-bold text-[#FF8F00] block mt-0.5">
                        {skill.capabilityTag}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-gray-300 font-sans leading-relaxed mb-4">
                    {skill.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between font-mono text-xs text-gray-400">
                  <span>CAPABILITY SCORE</span>
                  <span className="text-[#FF8F00] font-bold">{skill.percentage}%</span>
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
                onMouseEnter={() => playCyberSound('hover')}
                className={`glass-panel p-6 sm:p-7 flex flex-col justify-between group transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_12px_28px_rgba(255,143,0,0.18)] border-2 ${item.borderColor} relative overflow-hidden cursor-pointer`}
                style={{
                  boxShadow: `0 8px 32px rgba(0,0,0,0.6), inset 0 0 25px ${item.glowColor}`
                }}
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
                    
                    <span className={`font-pixel text-[8px] tracking-wider px-2 py-1 rounded border ${item.badgeColor} font-extrabold uppercase shadow-sm`}>
                      {item.rarity}
                    </span>
                  </div>

                  {/* Vault Description & Category Title */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-11 h-11 rounded-xl ${item.bgColor} border border-white/15 flex items-center justify-center ${item.textColor} shrink-0 shadow-inner`}>
                      <IconComponent className="w-5.5 h-5.5" />
                    </div>
                    <div>
                      <h3 className="font-black-ops font-bold text-base sm:text-lg text-white group-hover:text-white transition-colors tracking-wide leading-tight">
                        {item.name}
                      </h3>
                      <p className="text-[11px] text-gray-400 font-sans leading-snug mt-0.5">
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
                          className="p-2.5 rounded-lg bg-[#000000]/80 border border-white/10 hover:border-white/30 flex items-center justify-between gap-2 group/slot transition-all shadow-inner"
                        >
                          <div className="flex items-center gap-2 overflow-hidden">
                            <div className="w-6 h-6 rounded bg-white/5 border border-white/10 flex items-center justify-center text-[10px] font-mono font-bold text-gray-400 shrink-0">
                              0{slotIdx + 1}
                            </div>
                            <span className="font-mono text-xs font-bold text-gray-200 group-hover/slot:text-white truncate">
                              {techName}
                            </span>
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
                  <div className="flex flex-wrap gap-1.5">
                    {item.projectsUsed.map((proj, i) => (
                      <span key={i} className={`font-mono text-[10px] px-2 py-0.5 rounded bg-[#070B14] border border-white/10 ${item.textColor} font-semibold flex items-center gap-1`}>
                        <CheckCircle2 className={`w-2.5 h-2.5 ${item.textColor}`} />
                        {proj}
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
