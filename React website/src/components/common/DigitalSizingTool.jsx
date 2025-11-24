import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function DigitalSizingTool() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Valve Parameters
    valveType: '',
    valveSize: '',
    valveBrand: '',
    torqueRequired: '',
    
    // Operating Conditions
    pressure: '',
    temperature: '',
    medium: '',
    operationType: '',
    
    // Actuator Preferences
    actuatorType: '',
    supplyPressure: '',
    failSafeAction: '',
    mountingStandard: '',
    
    // Control Requirements
    controlType: '',
    positioner: false,
    limitSwitches: false,
    solenoidValve: false,
  });
  const [recommendation, setRecommendation] = useState(null);

  const valveTypes = [
    { id: 'ball', name: 'Ball Valve', icon: 'fa-circle' },
    { id: 'butterfly', name: 'Butterfly Valve', icon: 'fa-fan' },
    { id: 'gate', name: 'Gate Valve', icon: 'fa-bars' },
    { id: 'globe', name: 'Globe Valve', icon: 'fa-globe' },
    { id: 'plug', name: 'Plug Valve', icon: 'fa-plug' },
    { id: 'damper', name: 'Damper', icon: 'fa-wind' },
  ];

  const actuatorTypes = [
    { 
      id: 'pneumatic-spring', 
      name: 'Pneumatic Spring Return',
      icon: 'fa-wind',
      description: 'Fail-safe with spring return',
      torqueRange: '10 - 120,867 Nm'
    },
    { 
      id: 'pneumatic-double', 
      name: 'Pneumatic Double Acting',
      icon: 'fa-wind',
      description: 'Compact design, high efficiency',
      torqueRange: '10 - 50,000 Nm'
    },
    { 
      id: 'electric', 
      name: 'Electric Actuator',
      icon: 'fa-bolt',
      description: 'Precise control with IoT capability',
      torqueRange: '10 - 8,000 Nm'
    },
    { 
      id: 'hydraulic', 
      name: 'Electro-Hydraulic',
      icon: 'fa-tint',
      description: 'High torque for heavy-duty applications',
      torqueRange: '500 - 200,000 Nm'
    },
  ];

  const calculateRecommendation = () => {
    const torque = parseFloat(formData.torqueRequired) || 0;
    let recommendedProduct = null;

    // Simplified sizing logic
    if (formData.actuatorType === 'pneumatic-spring') {
      if (torque <= 3000) {
        recommendedProduct = {
          series: 'PDS Series',
          model: 'PDS-125',
          torque: '3,000 Nm @ 6 bar',
          features: ['Compact Design', 'ISO 5211', 'Spring Return'],
          weight: '12 kg',
          airConsumption: '45 L/cycle',
          image: '/assets/img/products/pneumatic/placeholder.jfif'
        };
      } else if (torque <= 10000) {
        recommendedProduct = {
          series: 'HD Series',
          model: 'HD-200',
          torque: '10,000 Nm @ 6 bar',
          features: ['Heavy Duty', 'ISO 5211', 'Fail-Safe'],
          weight: '35 kg',
          airConsumption: '120 L/cycle',
          image: '/assets/img/products/pneumatic/hd-series.jfif'
        };
      } else {
        recommendedProduct = {
          series: 'HD Series',
          model: 'HD-500',
          torque: '120,867 Nm @ 6 bar',
          features: ['Maximum Torque', 'ISO 5211', 'Spring Return'],
          weight: '280 kg',
          airConsumption: '950 L/cycle',
          image: '/assets/img/HD Actuator Image.png'
        };
      }
    } else if (formData.actuatorType === 'electric') {
      recommendedProduct = {
        series: 'Electric Actuator',
        model: 'EA-' + Math.ceil(torque / 100) * 100,
        torque: `${torque} Nm`,
        features: ['Modbus RTU/TCP', 'Position Feedback', 'Smart Control'],
        weight: '15-50 kg',
        power: '230V AC / 24V DC',
        image: '/assets/img/products/electrical/placeholder.jfif'
      };
    } else if (formData.actuatorType === 'hydraulic') {
      recommendedProduct = {
        series: 'Electro-Hydraulic',
        model: 'EHA-' + Math.ceil(torque / 1000) * 1000,
        torque: `${torque} Nm`,
        features: ['High Torque', 'Subsea Ready', 'Compact Design'],
        weight: '80-200 kg',
        pressure: '200 bar',
        image: '/assets/img/products/electro-hydraulic/placeholder.jfif'
      };
    } else {
      recommendedProduct = {
        series: 'PD Series',
        model: 'PD-' + Math.ceil(torque / 500) * 500,
        torque: `${torque} Nm @ 6 bar`,
        features: ['Double Acting', 'Space Saving', 'High Efficiency'],
        weight: '8-45 kg',
        airConsumption: '30-180 L/cycle',
        image: '/assets/img/products/pneumatic/placeholder.jfif'
      };
    }

    // Add accessories based on requirements
    const accessories = [];
    if (formData.positioner) accessories.push('Smart Positioner');
    if (formData.limitSwitches) accessories.push('Limit Switches');
    if (formData.solenoidValve) accessories.push('Solenoid Valve');

    setRecommendation({
      ...recommendedProduct,
      accessories,
      valveInfo: {
        type: valveTypes.find(v => v.id === formData.valveType)?.name || 'Not specified',
        size: formData.valveSize,
        brand: formData.valveBrand,
      },
      operatingConditions: {
        pressure: formData.pressure,
        temperature: formData.temperature,
        medium: formData.medium,
      }
    });

    setStep(4);
  };

  const resetTool = () => {
    setStep(1);
    setFormData({
      valveType: '',
      valveSize: '',
      valveBrand: '',
      torqueRequired: '',
      pressure: '',
      temperature: '',
      medium: '',
      operationType: '',
      actuatorType: '',
      supplyPressure: '',
      failSafeAction: '',
      mountingStandard: '',
      controlType: '',
      positioner: false,
      limitSwitches: false,
      solenoidValve: false,
    });
    setRecommendation(null);
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white p-4 rounded-full shadow-2xl hover:shadow-glow transition-all group"
        title="Digital Sizing Tool"
      >
        <i className="fas fa-calculator text-2xl group-hover:scale-110 transition-transform"></i>
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse">
          NEW
        </span>
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            {/* Header */}
            <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold mb-2">Digital Sizing Tool</h2>
                  <p className="text-primary-100">Find the perfect actuator for your application</p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
                >
                  <i className="fas fa-times text-2xl"></i>
                </button>
              </div>
              
              {/* Progress Steps */}
              <div className="flex items-center justify-between mt-6">
                {[
                  { num: 1, label: 'Valve Details' },
                  { num: 2, label: 'Operating Conditions' },
                  { num: 3, label: 'Actuator Selection' },
                  { num: 4, label: 'Recommendation' },
                ].map((s, idx) => (
                  <div key={s.num} className="flex items-center flex-1">
                    <div className={`flex items-center ${idx > 0 ? 'w-full' : ''}`}>
                      {idx > 0 && (
                        <div className={`h-1 flex-1 ${step > s.num - 1 ? 'bg-white' : 'bg-white/30'}`}></div>
                      )}
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                        step >= s.num ? 'bg-white text-primary-600' : 'bg-white/30 text-white'
                      } ${idx > 0 ? 'ml-2' : ''}`}>
                        {step > s.num ? <i className="fas fa-check"></i> : s.num}
                      </div>
                    </div>
                    <span className={`text-xs ml-2 ${step >= s.num ? 'text-white font-semibold' : 'text-white/60'}`}>
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {/* Step 1: Valve Details */}
              {step === 1 && (
                <div className="space-y-6 animate-slide-in">
                  <div>
                    <h3 className="text-2xl font-bold text-secondary-900 mb-6">
                      <i className="fas fa-cog mr-3 text-primary-600"></i>
                      Valve Information
                    </h3>
                  </div>

                  {/* Valve Type Selection */}
                  <div>
                    <label className="block text-sm font-semibold text-secondary-700 mb-3">
                      Valve Type *
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {valveTypes.map((type) => (
                        <button
                          key={type.id}
                          onClick={() => setFormData({ ...formData, valveType: type.id })}
                          className={`p-4 rounded-lg border-2 transition-all text-center ${
                            formData.valveType === type.id
                              ? 'border-primary-600 bg-primary-50 text-primary-700'
                              : 'border-secondary-200 hover:border-primary-300 hover:bg-primary-50'
                          }`}
                        >
                          <i className={`fas ${type.icon} text-2xl mb-2`}></i>
                          <div className="text-sm font-semibold">{type.name}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Valve Size */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-secondary-700 mb-2">
                        Valve Size (DN/Inches) *
                      </label>
                      <input
                        type="text"
                        value={formData.valveSize}
                        onChange={(e) => setFormData({ ...formData, valveSize: e.target.value })}
                        placeholder="e.g., DN 150 or 6 inch"
                        className="w-full px-4 py-3 border-2 border-secondary-200 rounded-lg focus:border-primary-600 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-secondary-700 mb-2">
                        Valve Brand/Manufacturer
                      </label>
                      <input
                        type="text"
                        value={formData.valveBrand}
                        onChange={(e) => setFormData({ ...formData, valveBrand: e.target.value })}
                        placeholder="e.g., Emerson, Bray, KTM"
                        className="w-full px-4 py-3 border-2 border-secondary-200 rounded-lg focus:border-primary-600 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Torque Required */}
                  <div>
                    <label className="block text-sm font-semibold text-secondary-700 mb-2">
                      Required Torque (Nm) *
                    </label>
                    <input
                      type="number"
                      value={formData.torqueRequired}
                      onChange={(e) => setFormData({ ...formData, torqueRequired: e.target.value })}
                      placeholder="Enter torque in Newton-meters"
                      className="w-full px-4 py-3 border-2 border-secondary-200 rounded-lg focus:border-primary-600 focus:outline-none"
                    />
                    <p className="text-xs text-secondary-500 mt-2">
                      <i className="fas fa-info-circle mr-1"></i>
                      Check your valve datasheet or use manufacturer's torque calculator
                    </p>
                  </div>
                </div>
              )}

              {/* Step 2: Operating Conditions */}
              {step === 2 && (
                <div className="space-y-6 animate-slide-in">
                  <div>
                    <h3 className="text-2xl font-bold text-secondary-900 mb-6">
                      <i className="fas fa-thermometer-half mr-3 text-primary-600"></i>
                      Operating Conditions
                    </h3>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-secondary-700 mb-2">
                        Operating Pressure (bar)
                      </label>
                      <input
                        type="number"
                        value={formData.pressure}
                        onChange={(e) => setFormData({ ...formData, pressure: e.target.value })}
                        placeholder="e.g., 16"
                        className="w-full px-4 py-3 border-2 border-secondary-200 rounded-lg focus:border-primary-600 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-secondary-700 mb-2">
                        Temperature (°C)
                      </label>
                      <input
                        type="number"
                        value={formData.temperature}
                        onChange={(e) => setFormData({ ...formData, temperature: e.target.value })}
                        placeholder="e.g., -20 to 200"
                        className="w-full px-4 py-3 border-2 border-secondary-200 rounded-lg focus:border-primary-600 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-secondary-700 mb-2">
                      Process Medium
                    </label>
                    <select
                      value={formData.medium}
                      onChange={(e) => setFormData({ ...formData, medium: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-secondary-200 rounded-lg focus:border-primary-600 focus:outline-none"
                    >
                      <option value="">Select medium</option>
                      <option value="water">Water</option>
                      <option value="steam">Steam</option>
                      <option value="gas">Natural Gas</option>
                      <option value="oil">Oil/Petroleum</option>
                      <option value="chemical">Chemicals</option>
                      <option value="air">Compressed Air</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-secondary-700 mb-2">
                      Operation Type
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {['On-Off', 'Modulating', 'Emergency Shutdown', 'Throttling'].map((type) => (
                        <button
                          key={type}
                          onClick={() => setFormData({ ...formData, operationType: type })}
                          className={`p-3 rounded-lg border-2 transition-all ${
                            formData.operationType === type
                              ? 'border-primary-600 bg-primary-50 text-primary-700 font-semibold'
                              : 'border-secondary-200 hover:border-primary-300'
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Actuator Selection */}
              {step === 3 && (
                <div className="space-y-6 animate-slide-in">
                  <div>
                    <h3 className="text-2xl font-bold text-secondary-900 mb-6">
                      <i className="fas fa-wind mr-3 text-primary-600"></i>
                      Actuator Preferences
                    </h3>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-secondary-700 mb-3">
                      Actuator Type *
                    </label>
                    <div className="grid md:grid-cols-2 gap-4">
                      {actuatorTypes.map((type) => (
                        <button
                          key={type.id}
                          onClick={() => setFormData({ ...formData, actuatorType: type.id })}
                          className={`p-4 rounded-lg border-2 transition-all text-left ${
                            formData.actuatorType === type.id
                              ? 'border-primary-600 bg-primary-50'
                              : 'border-secondary-200 hover:border-primary-300 hover:bg-primary-50'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <i className={`fas ${type.icon} text-2xl text-primary-600 mt-1`}></i>
                            <div>
                              <div className="font-bold text-secondary-900 mb-1">{type.name}</div>
                              <div className="text-xs text-secondary-600 mb-2">{type.description}</div>
                              <div className="text-xs text-primary-600 font-semibold">
                                <i className="fas fa-chart-line mr-1"></i>
                                {type.torqueRange}
                              </div>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {formData.actuatorType?.includes('pneumatic') && (
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-secondary-700 mb-2">
                          Supply Pressure (bar)
                        </label>
                        <select
                          value={formData.supplyPressure}
                          onChange={(e) => setFormData({ ...formData, supplyPressure: e.target.value })}
                          className="w-full px-4 py-3 border-2 border-secondary-200 rounded-lg focus:border-primary-600 focus:outline-none"
                        >
                          <option value="">Select pressure</option>
                          <option value="4">4 bar</option>
                          <option value="5">5 bar</option>
                          <option value="6">6 bar (Standard)</option>
                          <option value="7">7 bar</option>
                          <option value="8">8 bar</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-secondary-700 mb-2">
                          Fail-Safe Action
                        </label>
                        <select
                          value={formData.failSafeAction}
                          onChange={(e) => setFormData({ ...formData, failSafeAction: e.target.value })}
                          className="w-full px-4 py-3 border-2 border-secondary-200 rounded-lg focus:border-primary-600 focus:outline-none"
                        >
                          <option value="">Select action</option>
                          <option value="close">Fail-Close (FC)</option>
                          <option value="open">Fail-Open (FO)</option>
                          <option value="last">Fail-Last Position</option>
                        </select>
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-semibold text-secondary-700 mb-2">
                      Mounting Standard
                    </label>
                    <select
                      value={formData.mountingStandard}
                      onChange={(e) => setFormData({ ...formData, mountingStandard: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-secondary-200 rounded-lg focus:border-primary-600 focus:outline-none"
                    >
                      <option value="">Select standard</option>
                      <option value="iso5211">ISO 5211</option>
                      <option value="namur">NAMUR</option>
                      <option value="vdi">VDI/VDE 3845</option>
                      <option value="custom">Custom Mounting</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-secondary-700 mb-3">
                      Control & Accessories
                    </label>
                    <div className="space-y-2">
                      <label className="flex items-center p-3 border-2 border-secondary-200 rounded-lg hover:bg-primary-50 cursor-pointer transition-colors">
                        <input
                          type="checkbox"
                          checked={formData.positioner}
                          onChange={(e) => setFormData({ ...formData, positioner: e.target.checked })}
                          className="w-5 h-5 text-primary-600 rounded"
                        />
                        <span className="ml-3 text-secondary-700">Smart Positioner (4-20mA / HART)</span>
                      </label>
                      <label className="flex items-center p-3 border-2 border-secondary-200 rounded-lg hover:bg-primary-50 cursor-pointer transition-colors">
                        <input
                          type="checkbox"
                          checked={formData.limitSwitches}
                          onChange={(e) => setFormData({ ...formData, limitSwitches: e.target.checked })}
                          className="w-5 h-5 text-primary-600 rounded"
                        />
                        <span className="ml-3 text-secondary-700">Limit Switches (Open/Close Indication)</span>
                      </label>
                      <label className="flex items-center p-3 border-2 border-secondary-200 rounded-lg hover:bg-primary-50 cursor-pointer transition-colors">
                        <input
                          type="checkbox"
                          checked={formData.solenoidValve}
                          onChange={(e) => setFormData({ ...formData, solenoidValve: e.target.checked })}
                          className="w-5 h-5 text-primary-600 rounded"
                        />
                        <span className="ml-3 text-secondary-700">Solenoid Valve (Pilot Control)</span>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Recommendation */}
              {step === 4 && recommendation && (
                <div className="space-y-6 animate-slide-in">
                  <div className="bg-gradient-to-r from-green-50 to-green-100 border-2 border-green-500 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                        <i className="fas fa-check text-white text-2xl"></i>
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-green-900">Perfect Match Found!</h3>
                        <p className="text-green-700">Based on your requirements, we recommend:</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Product Image and Details */}
                    <div className="space-y-4">
                      <div className="bg-secondary-100 rounded-xl p-6 text-center">
                        <img 
                          src={recommendation.image} 
                          alt={recommendation.series}
                          className="w-full h-48 object-contain mb-4"
                          onError={(e) => {
                            e.target.src = '/assets/img/products/pneumatic/placeholder.jfif';
                          }}
                        />
                        <h4 className="text-2xl font-bold text-secondary-900 mb-2">
                          {recommendation.series}
                        </h4>
                        <p className="text-lg text-primary-600 font-semibold mb-1">
                          Model: {recommendation.model}
                        </p>
                        <p className="text-secondary-700 font-semibold">
                          <i className="fas fa-chart-line mr-2"></i>
                          {recommendation.torque}
                        </p>
                      </div>

                      <div className="bg-primary-50 rounded-xl p-4">
                        <h5 className="font-bold text-secondary-900 mb-3">Key Features:</h5>
                        <ul className="space-y-2">
                          {recommendation.features.map((feature, idx) => (
                            <li key={idx} className="flex items-center text-secondary-700">
                              <i className="fas fa-check-circle text-primary-600 mr-2"></i>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Specifications */}
                    <div className="space-y-4">
                      <div className="bg-white border-2 border-secondary-200 rounded-xl p-4">
                        <h5 className="font-bold text-secondary-900 mb-3">Technical Specifications:</h5>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between py-2 border-b border-secondary-100">
                            <span className="text-secondary-600">Weight:</span>
                            <span className="font-semibold text-secondary-900">{recommendation.weight}</span>
                          </div>
                          {recommendation.airConsumption && (
                            <div className="flex justify-between py-2 border-b border-secondary-100">
                              <span className="text-secondary-600">Air Consumption:</span>
                              <span className="font-semibold text-secondary-900">{recommendation.airConsumption}</span>
                            </div>
                          )}
                          {recommendation.power && (
                            <div className="flex justify-between py-2 border-b border-secondary-100">
                              <span className="text-secondary-600">Power Supply:</span>
                              <span className="font-semibold text-secondary-900">{recommendation.power}</span>
                            </div>
                          )}
                          {recommendation.pressure && (
                            <div className="flex justify-between py-2 border-b border-secondary-100">
                              <span className="text-secondary-600">Hydraulic Pressure:</span>
                              <span className="font-semibold text-secondary-900">{recommendation.pressure}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="bg-white border-2 border-secondary-200 rounded-xl p-4">
                        <h5 className="font-bold text-secondary-900 mb-3">Your Application:</h5>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between py-2 border-b border-secondary-100">
                            <span className="text-secondary-600">Valve Type:</span>
                            <span className="font-semibold text-secondary-900">{recommendation.valveInfo.type}</span>
                          </div>
                          <div className="flex justify-between py-2 border-b border-secondary-100">
                            <span className="text-secondary-600">Valve Size:</span>
                            <span className="font-semibold text-secondary-900">{recommendation.valveInfo.size || 'N/A'}</span>
                          </div>
                          {recommendation.operatingConditions.pressure && (
                            <div className="flex justify-between py-2 border-b border-secondary-100">
                              <span className="text-secondary-600">Pressure:</span>
                              <span className="font-semibold text-secondary-900">{recommendation.operatingConditions.pressure} bar</span>
                            </div>
                          )}
                          {recommendation.operatingConditions.temperature && (
                            <div className="flex justify-between py-2 border-b border-secondary-100">
                              <span className="text-secondary-600">Temperature:</span>
                              <span className="font-semibold text-secondary-900">{recommendation.operatingConditions.temperature}°C</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {recommendation.accessories.length > 0 && (
                        <div className="bg-white border-2 border-secondary-200 rounded-xl p-4">
                          <h5 className="font-bold text-secondary-900 mb-3">Recommended Accessories:</h5>
                          <ul className="space-y-2">
                            {recommendation.accessories.map((acc, idx) => (
                              <li key={idx} className="flex items-center text-sm text-secondary-700">
                                <i className="fas fa-plus-circle text-green-600 mr-2"></i>
                                {acc}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="bg-yellow-50 border-2 border-yellow-400 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                      <i className="fas fa-exclamation-triangle text-yellow-600 text-xl mt-1"></i>
                      <div className="text-sm text-yellow-900">
                        <strong>Important:</strong> This is a preliminary recommendation based on the information provided. 
                        For accurate sizing and final selection, please consult with our technical team or request a detailed engineering study.
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer Actions */}
            <div className="bg-secondary-50 p-6 border-t border-secondary-200">
              <div className="flex items-center justify-between">
                {step < 4 && (
                  <>
                    <button
                      onClick={() => step > 1 && setStep(step - 1)}
                      disabled={step === 1}
                      className="px-6 py-3 bg-white border-2 border-secondary-300 text-secondary-700 rounded-lg font-semibold hover:bg-secondary-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                      <i className="fas fa-arrow-left mr-2"></i>
                      Previous
                    </button>
                    <div className="text-sm text-secondary-600">
                      Step {step} of 4
                    </div>
                    <button
                      onClick={() => {
                        if (step === 3) {
                          calculateRecommendation();
                        } else {
                          setStep(step + 1);
                        }
                      }}
                      disabled={
                        (step === 1 && (!formData.valveType || !formData.torqueRequired)) ||
                        (step === 3 && !formData.actuatorType)
                      }
                      className="px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg"
                    >
                      {step === 3 ? (
                        <>
                          Calculate <i className="fas fa-calculator ml-2"></i>
                        </>
                      ) : (
                        <>
                          Next <i className="fas fa-arrow-right ml-2"></i>
                        </>
                      )}
                    </button>
                  </>
                )}

                {step === 4 && (
                  <>
                    <button
                      onClick={resetTool}
                      className="px-6 py-3 bg-white border-2 border-secondary-300 text-secondary-700 rounded-lg font-semibold hover:bg-secondary-50 transition-all"
                    >
                      <i className="fas fa-redo mr-2"></i>
                      Start Over
                    </button>
                    <div className="flex gap-3">
                      <Link
                        to="/contact#quote"
                        onClick={() => setIsOpen(false)}
                        className="px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-lg font-semibold transition-all shadow-md hover:shadow-lg inline-flex items-center"
                      >
                        <i className="fas fa-envelope mr-2"></i>
                        Request Quote
                      </Link>
                      <Link
                        to="/products"
                        onClick={() => setIsOpen(false)}
                        className="px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white rounded-lg font-semibold transition-all shadow-md hover:shadow-lg inline-flex items-center"
                      >
                        <i className="fas fa-cogs mr-2"></i>
                        View Products
                      </Link>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
