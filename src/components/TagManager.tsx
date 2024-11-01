import React, { useMemo } from 'react';
import { Plugin } from '../types';

interface TagManagerProps {
  plugins: Plugin[];
}

function TagManager({ plugins }: TagManagerProps) {
  const tagStats = useMemo(() => {
    const stats = new Map<string, number>();
    plugins.forEach(plugin => {
      plugin.tags.forEach(tag => {
        stats.set(tag, (stats.get(tag) || 0) + 1);
      });
    });
    return new Map([...stats.entries()].sort((a, b) => b[1] - a[1]));
  }, [plugins]);

  const pluginsWithTag = (tag: string) => {
    return plugins.filter(plugin => plugin.tags.includes(tag));
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Tag Statistics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from(tagStats).map(([tag, count]) => (
            <div key={tag} className="bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-800">{tag}</span>
                <span className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                  {count} plugins
                </span>
              </div>
              <div className="mt-2 text-sm text-gray-600">
                {pluginsWithTag(tag).slice(0, 2).map(plugin => plugin.name).join(', ')}
                {count > 2 && ` and ${count - 2} more`}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Popular Tag Combinations</h2>
        <div className="space-y-4">
          {Array.from(tagStats).slice(0, 5).map(([tag]) => (
            <div key={tag} className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium text-gray-800 mb-2">{tag}</h3>
              <div className="flex flex-wrap gap-2">
                {Array.from(tagStats)
                  .filter(([otherTag]) => otherTag !== tag)
                  .slice(0, 5)
                  .map(([otherTag]) => (
                    <span key={otherTag} className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                      {otherTag}
                    </span>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TagManager;