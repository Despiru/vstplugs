import React from 'react';
import { Download, Trash2 } from 'lucide-react';
import { Plugin } from '../types';

interface PluginGridProps {
  plugins: Plugin[];
  onDeletePlugin: (id: number) => void;
  searchTerm: string;
  selectedCategory: string;
}

function PluginGrid({ plugins, onDeletePlugin, searchTerm, selectedCategory }: PluginGridProps) {
  const filteredPlugins = plugins.filter(plugin => {
    const matchesSearch = plugin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plugin.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || plugin.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredPlugins.map((plugin) => (
        <div key={plugin.id} className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-semibold text-gray-800">{plugin.name}</h3>
            <button
              onClick={() => onDeletePlugin(plugin.id!)}
              className="text-red-500 hover:text-red-700 transition-colors"
            >
              <Trash2 size={20} />
            </button>
          </div>
          <div className="mb-4">
            <span className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
              {plugin.category}
            </span>
          </div>
          <p className="text-gray-600 mb-4">{plugin.description}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {plugin.tags.map((tag, index) => (
              <span key={index} className="bg-gray-100 text-gray-700 text-sm px-2 py-1 rounded">
                {tag}
              </span>
            ))}
          </div>
          <a
            href={plugin.downloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
          >
            <Download size={20} />
            Download Plugin
          </a>
        </div>
      ))}
    </div>
  );
}