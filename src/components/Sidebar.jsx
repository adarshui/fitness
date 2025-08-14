import React, { useState } from 'react';

function Sidebar({ onVideoSelect }) {
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [expandedSubCategory, setExpandedSubCategory] = useState(null);

  const categories = {
    'Core': {
      'Abdominal Exercises': [
        'Bicycle Crunches.mp4', 'Flutter Kicks.mp4', 'Hanging Leg Raises.mp4',
        'Mountain Climbers.mp4', 'Reverse Crunches.mp4', 'Russian Twists.mp4',
        'side plank.mp4', 'Sit-Ups.mp4', 'Toe Touches.mp4', 'V-Ups.mp4'
      ],
      'Lower Back Exercises': [
        'Back Extensions on Stability Ball.mp4', 'Deadlifts.mp4', 'Glute Bridge.mp4',
        'Kettlebell Swings.mp4', 'Partial deadlift focusing.mp4', 'Reverse Hyperextensions.mp4'
      ]
    },
    'Full-Body & Functional': {
      'Burpee': [
        '235329236-burpees.mp4', 'half-burpee.mp4', 'male-character.mp4',
        'side-plank.mp4', 'twist-down.mp4'
      ],
      'mountain-clim': [
        'low-mountain-climb.mp4', 'mountain-climb.mp4'
      ]
    },
    'Lower Body': {
      'Calves': [
        '251013059-3d-render-muscular-male-charac.mp4', '251013115-muscular-man-character-trainin.mp4',
        '251013393-3d-render-muscular-man-charact.mp4', '251951096-3d-design-muscular-character-t.mp4',
        '251951118-3d-design-muscular-character-t.mp4', '251951137-3d-muscular-man-character-trai.mp4',
        '251951160-3d-design-muscular-character-t.mp4', '265662522-3d-illustration-male-doing-cal.mp4'
      ],
      'Glute': [
        'Bulgarian Split Squats.mp4', 'caps.mp4', 'high-knees-running-place.mp4',
        'Kettlebell Swings.mp4', 'leg-plank.mp4', 'one-leg-qu.mp4',
        'Reverse Lunges.mp4', 'side-kick.mp4', 'Step-Ups.mp4', 'Sumo Deadlifts.mp4'
      ],
      'Hamstring Exercises': [
        '248953792-3d-rendered-animation-warm-exe.mp4', '251012912-muscular-man-character-trainin.mp4',
        'DeadLift.mp4', 'Kettlebell Swings.mp4', 'Leg.mp4', 'Reverse Lunge.mp4', 'Romanian Deadlift.mp4'
      ],
      'Quads': [
        'Bulgarian Split Squats.mp4', 'Front Squats.mp4', 'Hack Squats.mp4',
        'Leg Press.mp4', 'Pistol Squats.mp4', 'Reverse Lunges.mp4',
        'Sissy Squats.mp4', 'Step-Ups.mp4', 'Wall Sits.mp4'
      ]
    },
    'Upper Body': {
      'back': [
        'Deadlifts.mp4', 'Inverted Rows.mp4', 'lat pulldowns.mp4',
        'Pull-ups.mp4', 'Strengthens lower back.mp4'
      ],
      'Bicep': [
        'Bicep Curls.mp4', 'Chin Ups.mp4', 'Concentration Curls.mp4',
        'Hammer Curls.mp4', 'Incline Dumbbell Curls.mp4', 'Push Up to Curl Motion.mp4',
        'Resistance Band Curls.mp4'
      ],
      'Chest': [
        'bench press.mp4', 'Cable Crossover.mp4', 'Chest Dips.mp4',
        'chest fly.mp4', 'Push-ups.mp4'
      ],
      'Sholder': [
        'Cable Lateral Raises.mp4', 'Front Raises.mp4', 'Handstand Push-Ups.mp4',
        'Lateral Raises.mp4', 'Overhead Press.mp4', 'Rear Delt Fly.mp4',
        'Upright Rows.mp4'
      ],
      'Triceps': [
        'Bench Dips.mp4', 'Cable Rope Overhead Extension.mp4', 'Close-Grip Bench Press.mp4',
        'Kickbacks.mp4', 'Overhead Tricep Extension.mp4', 'Reverse Grip Pushdowns.mp4',
        'Single-Arm Overhead Extension.mp4', 'Skull Crushers.mp4'
      ]
    }
  };

  const styles = {
    sidebar: {
      width: '300px',
      height: 'calc(100vh - 80px)', // Subtracting header height
      position: 'sticky',
      top: '80px', // Header height
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(20px)',
      borderRight: '1px solid rgba(255, 255, 255, 0.2)',
      padding: '20px',
      overflowY: 'auto',
      maxHeight: 'calc(100vh - 80px)', // Ensure it doesn't exceed viewport
      scrollbarWidth: 'thin',
      scrollbarColor: 'rgba(255, 255, 255, 0.3) rgba(255, 255, 255, 0.1)',
      '&::-webkit-scrollbar': {
        width: '8px'
      },
      '&::-webkit-scrollbar-track': {
        background: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '4px'
      },
      '&::-webkit-scrollbar-thumb': {
        background: 'rgba(255, 255, 255, 0.3)',
        borderRadius: '4px'
      }
    },
    category: {
      marginBottom: '10px',
      cursor: 'pointer',
      color: '#ffffff',
      fontSize: '18px',
      fontWeight: '600'
    },
    subCategory: {
      marginLeft: '20px',
      marginTop: '5px',
      cursor: 'pointer',
      color: '#e0e7ff',
      fontSize: '16px'
    },
    video: {
      marginLeft: '40px',
      marginTop: '5px',
      cursor: 'pointer',
      color: '#e0e7ff',
      fontSize: '14px',
      padding: '5px',
      borderRadius: '4px',
      transition: 'all 0.3s ease'
    },
    videoHover: {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      transform: 'translateX(5px)'
    },
    expandIcon: {
      marginRight: '8px',
      display: 'inline-block',
      transition: 'transform 0.3s ease'
    }
  };

  const handleVideoClick = (category, subCategory, video, videos, index) => {
    const videoPath = `/src/fitness/${category}/${subCategory}/${video}`;
    console.log('Selected video path:', videoPath);
    onVideoSelect(videoPath, category, subCategory, videos, index);
  };

  return (
    <div style={styles.sidebar}>
      {Object.entries(categories).map(([category, subCategories]) => (
        <div key={category}>
          <div
            style={styles.category}
            onClick={() => setExpandedCategory(expandedCategory === category ? null : category)}
          >
            <span style={{
              ...styles.expandIcon,
              transform: expandedCategory === category ? 'rotate(90deg)' : 'none'
            }}>▶</span>
            {category}
          </div>
          
          {expandedCategory === category && Object.entries(subCategories).map(([subCategory, videos]) => (
            <div key={subCategory}>
              <div
                style={styles.subCategory}
                onClick={() => setExpandedSubCategory(expandedSubCategory === subCategory ? null : subCategory)}
              >
                <span style={{
                  ...styles.expandIcon,
                  transform: expandedSubCategory === subCategory ? 'rotate(90deg)' : 'none'
                }}>▶</span>
                {subCategory}
              </div>
              
              {expandedSubCategory === subCategory && videos.map((video) => (
                <div
                  key={video}
                  style={styles.video}
                  onClick={() => handleVideoClick(category, subCategory, video, videos, videos.indexOf(video))}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                    e.currentTarget.style.transform = 'translateX(5px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '';
                    e.currentTarget.style.transform = '';
                  }}
                >
                  {video.replace('.mp4', '')}
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Sidebar;
