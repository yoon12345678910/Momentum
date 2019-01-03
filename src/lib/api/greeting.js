const mantraList = [
  {
    mantra: 'Breathe',
    isHiddenUserName: false
  },
  {
    mantra: 'Be a victor, not a victim',
    isHiddenUserName: true
  },
  {
    mantra: 'Be happy',
    isHiddenUserName: true
  },
  {
    mantra: 'Do more with less',
    isHiddenUserName: true
  },
  {
    mantra: 'Strive for greatness',
    isHiddenUserName: true
  },
  {
    mantra: 'Create every day',
    isHiddenUserName: true
  },
  {
    mantra: 'You are Creative',
    isHiddenUserName: true
  },
  {
    mantra: 'Slow down',
    isHiddenUserName: true
  },
  {
    mantra: 'Choose love',
    isHiddenUserName: true
  }
];

const randomName = [
  'lovely', 
  'good looking', 
  'sexy', 
  'rockstar', 
  'gorgeous', 
  'friends', 
  'pal', 
  'superstar'
];

export function getRandomName() {
  return randomName[Math.floor(Math.random() * randomName.length)];
};

export function getRandomMantra() {
  return mantraList[Math.floor(Math.random() * mantraList.length)];
};
