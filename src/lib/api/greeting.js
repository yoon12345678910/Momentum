const mantraList = [
  {
    mantra: 'Breathe',
    isUserNameHidden: false
  },
  {
    mantra: 'Be a victor, not a victim',
    isUserNameHidden: true
  },
  {
    mantra: 'Be happy',
    isUserNameHidden: true
  },
  {
    mantra: 'Do more with less',
    isUserNameHidden: true
  },
  {
    mantra: 'Strive for greatness',
    isUserNameHidden: true
  },
  {
    mantra: 'Create every day',
    isUserNameHidden: true
  },
  {
    mantra: 'You are Creative',
    isUserNameHidden: true
  },
  {
    mantra: 'Slow down',
    isUserNameHidden: true
  },
  {
    mantra: 'Choose love',
    isUserNameHidden: true
  }
];

export function getRandomMantra() {
  return mantraList[Math.floor(Math.random() * mantraList.length)];
};
