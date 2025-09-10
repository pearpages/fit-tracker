import React, { useState } from 'react';
import './index.scss';

interface FormData {
  // Hydration
  waterGlasses: boolean[];
  
  // Sleep
  sleptWell: boolean;
  
  // Nutrition
  vegetableServings: boolean[];
  noSweets: boolean;
  noAlcohol: boolean;
  
  // Physical activity
  didSport: boolean;
  movement: boolean;
  
  // Mental health & lifestyle
  mindfulness: boolean;
  noScreensBeforeBed: boolean;
  
  // Cognitive growth
  brainActivity: boolean;
  
  // Weight tracking (neutral - 0 points)
  weight: string;
}

function Form(): React.ReactNode {
  const [formData, setFormData] = useState<FormData>({
    waterGlasses: Array(6).fill(false),
    sleptWell: false,
    vegetableServings: Array(5).fill(false),
    noSweets: false,
    noAlcohol: false,
    didSport: false,
    movement: false,
    mindfulness: false,
    noScreensBeforeBed: false,
    brainActivity: false,
    weight: '',
  });

  const handleWaterGlassChange = (index: number) => {
    setFormData(prevData => {
      const newWaterGlasses = [...prevData.waterGlasses];
      newWaterGlasses[index] = !newWaterGlasses[index];
      return { ...prevData, waterGlasses: newWaterGlasses };
    });
  };

  const handleVegetableServingChange = (index: number) => {
    setFormData(prevData => {
      const newVegetableServings = [...prevData.vegetableServings];
      newVegetableServings[index] = !newVegetableServings[index];
      return { ...prevData, vegetableServings: newVegetableServings };
    });
  };

  const handleCheckboxChange = (field: keyof FormData) => {
    setFormData(prevData => ({
      ...prevData,
      [field]: !prevData[field as keyof FormData]
    }));
  };

  const handleWeightChange = (value: string) => {
    setFormData(prevData => ({ ...prevData, weight: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission here
  };

  const waterGlassesCount = formData.waterGlasses.filter(Boolean).length;
  const vegetableServingsCount = formData.vegetableServings.filter(Boolean).length;
  
  // Calculate score according to new specs
  const calculateScore = () => {
    let score = 0;
    
    // Start with -4 penalty (assuming sweets and alcohol by default)
    score -= 4.0;
    
    // Hydration: +0.25 per glass (max +1.5)
    score += Math.min(waterGlassesCount * 0.25, 1.5);
    
    // Sleep: +3.0
    if (formData.sleptWell) score += 3.0;
    
    // Nutrition
    score += Math.min(vegetableServingsCount * 0.2, 1.0); // Vegetables/Fruit: +0.2 per serving, max +1.0
    if (formData.noSweets) score += 2.0; // No sweets: +2.0 (removes penalty)
    if (formData.noAlcohol) score += 2.0; // No alcohol: +2.0 (removes penalty)
    
    // Physical Activity
    let physicalScore = 0;
    if (formData.didSport) physicalScore += 2.0; // Sport: +2.0
    if (formData.movement) physicalScore += 1.0; // Steps/Movement: +1.0
    score += Math.min(physicalScore, 3.0); // Cap at max +3.0
    
    // Mental Health & Lifestyle
    if (formData.mindfulness) score += 0.5; // Mindfulness: +0.5
    if (formData.noScreensBeforeBed) score += 0.5; // No screens: +0.5
    
    // Cognitive Growth
    if (formData.brainActivity) score += 0.5; // Brain Activity: +0.5
    
    // Floor at 0 (never negative)
    return Math.max(0, score);
  };
  
  const totalScore = calculateScore();

  return (
    <form className="fit-form" onSubmit={handleSubmit}>
      <div className="fit-form__header">
        <h2 className="fit-form__title">Daily Wellness Tracker</h2>
        <div className="fit-form__score">
          <span className="fit-form__score-number">{totalScore.toFixed(1)}</span>
          <span className="fit-form__score-total">/10</span>
        </div>
        <p className="fit-form__score-note">
          *Includes built-in -4 penalty for sweets/alcohol (removed when checked)
        </p>
      </div>

      {/* Hydration */}
      <div className="fit-form__section">
        <div className="fit-form__section-header">
          <h3 className="fit-form__section-title">💧 Hydration</h3>
          <span className="fit-form__section-subtitle">{waterGlassesCount}/6 glasses (+{(Math.min(waterGlassesCount * 0.25, 1.5)).toFixed(2)})</span>
        </div>
        <div className="fit-form__water-glasses">
          {formData.waterGlasses.map((filled, index) => (
            <button
              key={index}
              type="button"
              className={`fit-form__water-glass ${filled ? 'fit-form__water-glass--filled' : ''}`}
              onClick={() => handleWaterGlassChange(index)}
              aria-label={`Water glass ${index + 1}`}
            >
              <span className="fit-form__water-glass-icon">🥛</span>
            </button>
          ))}
        </div>
      </div>

      {/* Sleep */}
      <div className="fit-form__section">
        <div className="fit-form__section-header">
          <h3 className="fit-form__section-title">😴 Sleep</h3>
        </div>
        <label className="fit-form__checkbox">
          <input
            type="checkbox"
            checked={formData.sleptWell}
            onChange={() => handleCheckboxChange('sleptWell')}
          />
          <span className="fit-form__checkbox-checkmark"></span>
          <span className="fit-form__checkbox-label">Slept 7–8 hours <span className="fit-form__points">+3</span></span>
        </label>
      </div>

      {/* Nutrition */}
      <div className="fit-form__section">
        <div className="fit-form__section-header">
          <h3 className="fit-form__section-title">🥗 Nutrition</h3>
        </div>
        
        <div className="fit-form__subsection">
          <div className="fit-form__subsection-header">
            <h4 className="fit-form__subsection-title">Vegetables/Fruit servings (+0.2 per serving, max +1.0 at 5 servings)</h4>
            <span className="fit-form__section-subtitle">{vegetableServingsCount}/5 servings (+{Math.min(vegetableServingsCount * 0.2, 1.0).toFixed(1)})</span>
          </div>
          <div className="fit-form__vegetable-servings">
            {formData.vegetableServings.map((served, index) => (
              <button
                key={index}
                type="button"
                className={`fit-form__vegetable-serving ${served ? 'fit-form__vegetable-serving--filled' : ''}`}
                onClick={() => handleVegetableServingChange(index)}
                aria-label={`Vegetable/Fruit serving ${index + 1}`}
              >
                <span className="fit-form__vegetable-serving-icon">🥕</span>
              </button>
            ))}
          </div>
        </div>

        <div className="fit-form__checkboxes">
          <label className={`fit-form__checkbox ${!formData.noSweets ? 'fit-form__checkbox--negative' : ''}`}>
            <input
              type="checkbox"
              checked={formData.noSweets}
              onChange={() => handleCheckboxChange('noSweets')}
            />
            <span className="fit-form__checkbox-checkmark"></span>
            <span className="fit-form__checkbox-label">No sweets (no sugar drinks, no pastries) <span className={`fit-form__points ${!formData.noSweets ? 'fit-form__points--negative' : ''}`}>{formData.noSweets ? '0' : '-2'}</span></span>
          </label>
          
          <label className={`fit-form__checkbox ${!formData.noAlcohol ? 'fit-form__checkbox--negative' : ''}`}>
            <input
              type="checkbox"
              checked={formData.noAlcohol}
              onChange={() => handleCheckboxChange('noAlcohol')}
            />
            <span className="fit-form__checkbox-checkmark"></span>
            <span className="fit-form__checkbox-label">No alcohol <span className={`fit-form__points ${!formData.noAlcohol ? 'fit-form__points--negative' : ''}`}>{formData.noAlcohol ? '0' : '-2'}</span></span>
          </label>
        </div>
      </div>

      {/* Physical Activity */}
      <div className="fit-form__section">
        <div className="fit-form__section-header">
          <h3 className="fit-form__section-title">🏃‍♀️ Physical Activity</h3>
          <span className="fit-form__section-subtitle">Max +3 points</span>
        </div>
        <div className="fit-form__checkboxes">
          <label className="fit-form__checkbox">
            <input
              type="checkbox"
              checked={formData.didSport}
              onChange={() => handleCheckboxChange('didSport')}
            />
            <span className="fit-form__checkbox-checkmark"></span>
            <span className="fit-form__checkbox-label">Did sport (any structured exercise) <span className="fit-form__points">+2</span></span>
          </label>
          
          <label className="fit-form__checkbox">
            <input
              type="checkbox"
              checked={formData.movement}
              onChange={() => handleCheckboxChange('movement')}
            />
            <span className="fit-form__checkbox-checkmark"></span>
            <span className="fit-form__checkbox-label">Steps/movement (≥7–10k steps or 30 min walking) <span className="fit-form__points">+1</span></span>
          </label>
        </div>
      </div>

      {/* Mental Health & Lifestyle */}
      <div className="fit-form__section">
        <div className="fit-form__section-header">
          <h3 className="fit-form__section-title">🧘‍♀️ Mental Health & Lifestyle</h3>
        </div>
        <div className="fit-form__checkboxes">
          <label className="fit-form__checkbox">
            <input
              type="checkbox"
              checked={formData.mindfulness}
              onChange={() => handleCheckboxChange('mindfulness')}
            />
            <span className="fit-form__checkbox-checkmark"></span>
            <span className="fit-form__checkbox-label">Mindfulness/stress check (meditation, breathing, journaling, or felt calm) <span className="fit-form__points">+0.5</span></span>
          </label>
          
          <label className="fit-form__checkbox">
            <input
              type="checkbox"
              checked={formData.noScreensBeforeBed}
              onChange={() => handleCheckboxChange('noScreensBeforeBed')}
            />
            <span className="fit-form__checkbox-checkmark"></span>
            <span className="fit-form__checkbox-label">No phone/tablet/TV 1h before sleep (e-ink Kindle or book allowed) <span className="fit-form__points">+0.5</span></span>
          </label>
        </div>
      </div>

      {/* Cognitive Growth */}
      <div className="fit-form__section">
        <div className="fit-form__section-header">
          <h3 className="fit-form__section-title">🧠 Cognitive Growth</h3>
        </div>
        <label className="fit-form__checkbox">
          <input
            type="checkbox"
            checked={formData.brainActivity}
            onChange={() => handleCheckboxChange('brainActivity')}
          />
          <span className="fit-form__checkbox-checkmark"></span>
          <span className="fit-form__checkbox-label">Brain activity (sudoku, Chinese lesson, or any daily learning) <span className="fit-form__points">+0.5</span></span>
        </label>
      </div>

      {/* Weight Tracking */}
      <div className="fit-form__section">
        <div className="fit-form__section-header">
          <h3 className="fit-form__section-title">⚖️ Weight Tracking</h3>
          <span className="fit-form__section-subtitle">For tracking only (0 pts)</span>
        </div>
        <div className="fit-form__weight-input">
          <label className="fit-form__weight-label">
            Weight (kg):
          </label>
          <input
            type="number"
            step="0.1"
            placeholder="e.g. 70.5"
            value={formData.weight}
            onChange={(e) => handleWeightChange(e.target.value)}
            className="fit-form__weight-field"
          />
        </div>
      </div>

      <div className="fit-form__footer">
        <button type="submit" className="fit-form__submit">
          Save Day
        </button>
      </div>
    </form>
  );
}

export { Form };