import React from 'react';

const REGIONS = [
  { id: 'head', label: 'Head', d: 'M130,15 C130,0 170,0 170,15 C170,38 162,50 150,50 C138,50 130,38 130,15 Z' },
  { id: 'neck', label: 'Neck', d: 'M140,50 L160,50 L163,68 L137,68 Z' },
  { id: 'left_shoulder', label: 'Left Shoulder', d: 'M137,68 L118,68 C108,68 100,78 98,92 L128,92 Z' },
  { id: 'right_shoulder', label: 'Right Shoulder', d: 'M163,68 L182,68 C192,68 200,78 202,92 L172,92 Z' },
  { id: 'chest', label: 'Chest', d: 'M128,92 L172,92 L170,148 L130,148 Z' },
  { id: 'upper_back', label: 'Upper Back', d: 'M128,92 L130,148 L120,148 L98,92 Z' },
  { id: 'abdomen', label: 'Abdomen', d: 'M130,148 L170,148 L174,208 L126,208 Z' },
  { id: 'lower_back', label: 'Lower Back', d: 'M172,92 L180,148 L170,148 L202,92 Z' },
  { id: 'left_arm', label: 'Left Arm', d: 'M98,92 L78,160 L70,160 C60,160 58,150 60,140 L68,92 Z' },
  { id: 'right_arm', label: 'Right Arm', d: 'M202,92 L222,160 L230,160 C240,160 242,150 240,140 L232,92 Z' },
  { id: 'left_hand', label: 'Left Hand', d: 'M60,160 L50,190 C48,200 55,205 62,200 L78,160 Z' },
  { id: 'right_hand', label: 'Right Hand', d: 'M240,160 L250,190 C252,200 245,205 238,200 L222,160 Z' },
  { id: 'left_hip', label: 'Left Hip', d: 'M126,208 L150,208 L142,240 L112,240 Z' },
  { id: 'right_hip', label: 'Right Hip', d: 'M150,208 L174,208 L188,240 L158,240 Z' },
  { id: 'left_leg', label: 'Left Thigh', d: 'M112,240 L142,240 L138,320 L118,320 Z' },
  { id: 'right_leg', label: 'Right Thigh', d: 'M158,240 L188,240 L182,320 L162,320 Z' },
  { id: 'left_knee', label: 'Left Knee', d: 'M118,320 L138,320 L136,350 L120,350 Z' },
  { id: 'right_knee', label: 'Right Knee', d: 'M162,320 L182,320 L180,350 L164,350 Z' },
  { id: 'left_calf', label: 'Left Calf', d: 'M120,350 L136,350 L132,420 L122,420 Z' },
  { id: 'right_calf', label: 'Right Calf', d: 'M164,350 L180,350 L178,420 L168,420 Z' },
  { id: 'left_foot', label: 'Left Foot', d: 'M122,420 L132,420 L138,445 L115,445 Z' },
  { id: 'right_foot', label: 'Right Foot', d: 'M168,420 L178,420 L185,445 L162,445 Z' }
];

const BodyDiagram = ({ question, value = [], onChange }) => {
  const selectedRegions = Array.isArray(value) ? value : [];

  const handleRegionClick = (regionId) => {
    if (selectedRegions.includes(regionId)) {
      onChange(selectedRegions.filter(id => id !== regionId));
    } else {
      onChange([...selectedRegions, regionId]);
    }
  };

  return (
    <div className="input-body-diagram">
      <p className="body-diagram-hint">Tap on the body areas where you feel discomfort</p>
      
      <svg
        className="body-diagram-svg"
        viewBox="0 0 300 460"
        xmlns="http://www.w3.org/2000/svg"
      >
        {REGIONS.map((region) => (
          <path
            key={region.id}
            className={`body-region ${selectedRegions.includes(region.id) ? 'selected' : ''}`}
            d={region.d}
            onClick={() => handleRegionClick(region.id)}
          />
        ))}
      </svg>

      <div className="body-region-labels">
        {selectedRegions.length === 0 ? (
          <span className="body-diagram-hint" style={{ fontStyle: 'italic' }}>
            No areas selected yet
          </span>
        ) : (
          selectedRegions.map(id => {
            const region = REGIONS.find(r => r.id === id);
            return (
              <span key={id} className="body-region-tag">
                {region ? region.label : id}
                <span
                  className="body-region-tag__remove"
                  onClick={() => handleRegionClick(id)}
                >
                  ✕
                </span>
              </span>
            );
          })
        )}
      </div>
    </div>
  );
};

export default BodyDiagram;
