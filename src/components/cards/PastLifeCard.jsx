import React from 'react';
import LiquidGlassCard from '../ui/LiquidGlassCard';

const PastLifeCard = ({ pastLife }) => {
  return (
    <LiquidGlassCard className="past-life-card">
      <h3>Past Life Glimpse</h3>
      <div className="past-life-era">{pastLife?.era}</div>
      <div className="past-life-role">{pastLife?.role}</div>
      <p className="past-life-description">{pastLife?.description}</p>
    </LiquidGlassCard>
  );
};

export default PastLifeCard;