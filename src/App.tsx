import React, { useState, useEffect } from 'react';
import { Plus, Search } from 'lucide-react';
import AddPluginModal from './components/AddPluginModal';
import PluginTabs from './components/PluginTabs';
import { Plugin } from './types';

function App() {
  const [plugins, setPlugins] = useState<Plugin[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    loadPlugins();
  }, []);

  const loadPlugins = async () => {
    const loadedPlugins = await window.electronAPI.getPlugins();
    setPlugins(loadedPlugins);
  };

  const handleAddPlugin = async (plugin: Plugin) => {
    const updatedPlugins = await window.electronAPI.savePlugin(plugin);
    setPlugins(updatedPlugins);
    setIsModalOpen(false);
  };

  const handleDeletePlugin = async (id: number) => {
    const updatedPlugins = await window.electronAPI.deletePlugin(id);
    setPlugins(updatedPlugins);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">VST Plugin Manager</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
          >
            <Plus size={20} />
            Add Plugin
          </button>
        </div>

        <div className="mb-6 flex gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search plugins..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <select
            className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="all">All Categories</option>
            <option value="effects">Effects</option>
            <option value="synth">Synth</option>
            <option value="processing">Processing</option>
          </select>
        </div>

        <PluginTabs
          plugins={plugins}
          onDeletePlugin={handleDeletePlugin}
          searchTerm={searchTerm}
          selectedCategory={selectedCategory}
        />

        <AddPluginModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAdd={handleAddPlugin}
        />
      </div>
    </div>
  );
}

export default App;