export const technicalSpecs = {
  ammo: 'Steel Ammo: 8mm to 11mm',
  bands: 'Latex Flat Bands Max 0.8mm',
  safety: 'Eye Protection Mandatory'
};

export const disciplines = [
  {
    id: 1,
    number: '01',
    distance: '10 METERS',
    title: 'Olympic-Style Target Shooting',
    description: 'Standard 10m precision shooting at 5 concentric scoring rings or 40mm steel drop paddles. 5 rounds of 6 shots within a 4-minute time bracket.',
    targets: '5x Drop Steel',
    maxScore: '300 Pts',
    targetLabel: 'Targets',
    scoreLabel: 'Max Score',
    badgeClass: 'text-esac-blue bg-blue-50',
    hoverBorder: 'hover:border-esac-blue'
  },
  {
    id: 2,
    number: '02',
    distance: '15 METERS',
    title: '15m Distance Bullseye',
    description: 'Testing extreme ballistic stability, anchor point consistency, and micro-windage adjustments on 60mm diameter micro steel bells.',
    targets: '60mm Micro-Gong',
    maxScore: '200 Pts',
    targetLabel: 'Targets',
    scoreLabel: 'Max Score',
    badgeClass: 'text-esac-saffron bg-orange-50',
    hoverBorder: 'hover:border-esac-saffron'
  },
  {
    id: 3,
    number: '03',
    distance: 'TIMED SPRINT',
    title: 'Rapid Fire & Speed Accuracy',
    description: 'Shooters clear 8 randomized knock-down targets under 60 seconds with rapid pouch reloads, balancing supreme heart-rate control and aim.',
    targets: 'Speed Grip',
    maxScore: '60 Sec',
    targetLabel: 'Pouch Reload',
    scoreLabel: 'Time Limit',
    badgeClass: 'text-emerald-600 bg-emerald-50',
    hoverBorder: 'hover:border-emerald-500'
  },
  {
    id: 4,
    number: '04',
    distance: 'YOUTH DIVISION',
    title: 'U-14 & U-17 Youth Category',
    description: 'Scaled 8m and 10m target distances with optimized elastic draw weights tailored for school athletes, junior clubs, and scouting camps.',
    targets: 'Under 14 / Under 17',
    maxScore: 'Compulsory',
    targetLabel: 'Age',
    scoreLabel: 'Safety Glasses',
    badgeClass: 'text-purple-600 bg-purple-50',
    hoverBorder: 'hover:border-purple-500'
  },
  {
    id: 5,
    number: '05',
    distance: "WOMEN'S OPEN",
    title: "Women's Precision Cup",
    description: 'Dedicated state division with intense participation from university and tribal sports clusters. Full parity in prize pools and awards.',
    targets: '10m Paper & Steel',
    maxScore: 'Individual & Team',
    targetLabel: 'Format',
    scoreLabel: '',
    badgeClass: 'text-pink-600 bg-pink-50',
    hoverBorder: 'hover:border-pink-500'
  },
  {
    id: 6,
    number: '06',
    distance: 'INCLUSIVE PARA',
    title: 'Para & Adaptive Slingshot',
    description: 'Seated wheelchair and upper-body adaptive slingshot shooting categories following international paralympic shooting layout specs.',
    targets: 'Seated / Assist Stands',
    maxScore: 'Medal Sport in CG',
    targetLabel: '',
    scoreLabel: '',
    badgeClass: 'text-amber-600 bg-amber-50',
    hoverBorder: 'hover:border-amber-500'
  }
];
