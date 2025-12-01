import React from 'react';

const Tabs = ({ tabs, defaultTab = 0, onChange }) => {
  const [activeTab, setActiveTab] = React.useState(defaultTab);

  const handleTabChange = (index) => {
    setActiveTab(index);
    onChange?.(index, tabs[index]);
  };

  return (
    <div>
      {/* Tab Buttons */}
      <div className="flex flex-wrap border-b border-secondary-200 gap-2">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => handleTabChange(index)}
            className={`
              px-6 py-3 font-semibold border-b-2 transition-all duration-200
              ${activeTab === index
                ? 'border-primary-600 text-primary-600'
                : 'border-transparent text-secondary-600 hover:text-primary-600'
              }
            `}
          >
            {tab.icon && <i className={`fas fa-${tab.icon} mr-2`}></i>}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="pt-6 animate-fade-in">
        {tabs[activeTab].content}
      </div>
    </div>
  );
};

export default Tabs;
