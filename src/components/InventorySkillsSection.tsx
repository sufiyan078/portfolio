import React, { useState } from 'react';
import { SKILLS } from '../data/skills';
import { INVENTORY_ITEMS } from '../data/inventory';
import { Package, Cpu, FileCode2, Database, Server, FileSpreadsheet, FileText, Palette, Code, CheckCircle2 } from 'lucide-react';
import { playCyberSound } from '../utils/soundEffects';

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
      case 'FileCode': return FileCode2;
      case 'Code': return Code;
      case 'Server': return Server;
      case 'FileSpreadsheet': return FileSpreadsheet;
      case 'FileText': return FileText;
      case 'Cpu': return Cpu;
      case 'Palette': return Palette;
      default: return Database;
    }
  };

  const getRarityBadgeClass = (rarity: string) => {
    switch (rarity) {
      case 'Legendary': return 'badge-legendary';
      case 'Epic': return 'badge-epic';
      case 'Rare': return 'badge-rare';
      default: return 'badge-common';
    }
  };

  return (
    <section id="inventory" className="py-24 px-4 max-w-7xl mx-auto relative font-sans">
      {/* Section Header per Section 15 */}
      <div className="flex flex-col items-center text-center mb-12">
        <div className="badge-tag badge-rare mb-3">
          <Package className="w-3.5 h-3.5 text-[#FF8F00]" />
          <span className="text-[#FF8F00]">ABILITIES // INVENTORY</span>
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
        <div className="glass-panel p-1.5 flex gap-2">
          <button
            onClick={() => handleTabSelect('abilities')}
            className={`px-6 py-2.5 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'abilities'
                ? 'bg-[#FF8F00]/20 text-[#FF8F00] border border-[#FF8F00]/80 shadow-[0_0_15px_rgba(255,143,0,0.4)]'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            03 ABILITIES SYSTEM
          </button>
          <button
            onClick={() => handleTabSelect('inventory')}
            className={`px-6 py-2.5 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'inventory'
                ? 'bg-[#FF8F00]/20 text-[#FF8F00] border border-[#FF8F00]/80 shadow-[0_0_15px_rgba(255,143,0,0.4)]'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            04 COLLECTIBLE INVENTORY
          </button>
        </div>
      </div>

      {/* Abilities View per UI/UX Section 12 & Content Engine Section 7 */}
      {activeTab === 'abilities' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILLS.map((skill) => (
            <div
              key={skill.id}
              onMouseEnter={() => playCyberSound('hover')}
              className="glass-panel p-6 flex flex-col justify-between group hover:border-[#FF8F00]/50 transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-[10px] text-gray-400 uppercase tracking-widest">{skill.category}</span>
                  <span className="font-mono text-xs font-bold text-[#FF8F00] px-2 py-0.5 rounded bg-[#FF8F00]/15 border border-[#FF8F00]/30">
                    LVL {skill.level}
                  </span>
                </div>

                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-[#FF8F00]/15 border border-[#FF8F00]/40 flex items-center justify-center text-[#FF8F00]">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <h3 className="font-heading font-bold text-lg text-white group-hover:text-[#FF8F00] transition-colors">
                    {skill.name}
                  </h3>
                </div>

                <p className="text-xs text-gray-300 font-sans leading-relaxed mb-4">
                  {skill.description}
                </p>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between font-mono text-xs text-gray-400">
                <span>PROFICIENCY</span>
                <span className="text-[#FF8F00] font-bold">{skill.percentage}%</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Collectible Inventory View per UI/UX Section 18 & Content Engine Section 8 */}
      {activeTab === 'inventory' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {INVENTORY_ITEMS.map((item) => {
            const IconComponent = getIcon(item.iconName);
            const rarityClass = getRarityBadgeClass(item.rarity);

            return (
              <div
                key={item.id}
                onMouseEnter={() => playCyberSound('hover')}
                className="glass-panel p-6 flex flex-col justify-between group hover:border-[#FF8F00]/50 transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-[10px] text-gray-400 uppercase tracking-widest">{item.category}</span>
                    <span className={`badge-tag ${rarityClass} text-[10px] uppercase font-bold`}>
                      {item.rarity}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-[#FF8F00]/15 border border-[#FF8F00]/40 flex items-center justify-center text-[#FF8F00]">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <h3 className="font-heading font-bold text-lg text-white group-hover:text-[#FF8F00] transition-colors">
                      {item.name}
                    </h3>
                  </div>

                  <p className="text-xs text-gray-300 font-sans leading-relaxed mb-4">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10">
                  <span className="font-mono text-[10px] text-gray-400 block mb-1.5 uppercase">USED IN MISSIONS</span>
                  <div className="flex flex-wrap gap-1">
                    {item.projectsUsed.map((proj, i) => (
                      <span key={i} className="font-mono text-[10px] px-2 py-0.5 rounded bg-[#070B14] border border-white/5 text-[#10B981] font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-2.5 h-2.5" />
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
