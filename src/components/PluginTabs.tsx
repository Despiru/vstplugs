import React from 'react';
import { Tags, Grid, Settings } from 'lucide-react';
import PluginGrid from './PluginGrid';
import TagManager from './TagManager';
import { Plugin } from '../types';

interface PluginTabsProps {
  plugins: Plugin[];
  onDeletePlugin: (id: number) => void;
  searchTerm: string;
  selectedCategory: string;
}

function PluginTabs({ plugins, onDeletePlugin, searchTerm, selectedCategory }: PluginTabsProps) {
  const [activeTab, setActiveTab] = React.useState('grid');

  return (
    <div>
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('grid')}
            className={`${
              activeTab === 'grid'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } flex items-center py-4 px-1 border-b-2 font-medium text-sm`}
          >
            <Grid className="mr-2" size={20} />
            Plugin Grid
          </button>

          <button
            onClick={() => setActiveTab('tags')}
            className={`${
              activeTab === 'tags'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } flex items-center py-4 px-1 border-b-2 font-medium text-sm`}
          >
            <Tags className="mr-2" size={20} />
            Tag Manager
          </button>
        </nav>
      </div>

      {activeTab === 'grid' ? (
        <PluginGrid
          plugins={plugins}
          onDeletePlugin={onDeletePlugin}
          searchTerm={searchTerm}
          selectedCategory={selectedCategory}
        />
      ) : (
        <TagManager plugins={plugins} />
      )}
    </div>
  );
}

export default PluginTabs;