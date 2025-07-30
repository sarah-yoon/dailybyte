import { Theme, ThemeConfig } from '../types';

export const getThemeByTime = (): Theme => {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 9) {
    return 'sunrise';
  } else if (hour >= 9 && hour < 12) {
    return 'morning';
  } else if (hour >= 12 && hour < 15) {
    return 'noon';
  } else if (hour >= 15 && hour < 19) {
    return 'afternoon';
  } else if (hour >= 19 && hour < 20) {
    return 'sunset';
  } else {
    return 'night';
  }
};

export const getThemeConfig = (theme: Theme): ThemeConfig => {
  const configs: Record<Theme, ThemeConfig> = {
    sunrise: {
      titleColor: 'text-orange-500',
      subtitle: 'You\'re up pretty early',
      subtitleColor: 'text-orange-400',
      gameContainerBg: 'linear-gradient(135deg, #fffaf6 0%, #fff2e6 100%)',
      timerBarBg: 'linear-gradient(90deg, #d84315, #e65100)',
      waspContainerBg: 'linear-gradient(90deg, #ffeaa7, #fdcb6e)',
      waspContainerBorder: 'linear-gradient(90deg, #ff6b35, #f7931e, #ff6b35)',
      playButtonBg: 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700',
      questionCounterBg: 'linear-gradient(135deg, #d84315, #e65100)',
      progressBarBg: '#d84315'
    },
    morning: {
      titleColor: 'text-blue-500',
      subtitle: 'Wakey wakey',
      subtitleColor: 'text-blue-400',
      gameContainerBg: 'linear-gradient(135deg, #fafdff 0%, #f2f8ff 100%)',
      timerBarBg: 'linear-gradient(90deg, #1565c0, #0277bd)',
      waspContainerBg: 'linear-gradient(90deg, #a8edea, #fed6e3)',
      waspContainerBorder: 'linear-gradient(90deg, #4facfe, #00f2fe, #4facfe)',
      playButtonBg: 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700',
      questionCounterBg: 'linear-gradient(135deg, #1565c0, #0277bd)',
      progressBarBg: '#1565c0'
    },
    noon: {
      titleColor: 'text-sky-700',
      subtitle: 'Feeling bored?',
      subtitleColor: 'text-sky-600',
      gameContainerBg: 'linear-gradient(135deg, #fcfdff 0%, #f4f8ff 100%)',
      timerBarBg: 'linear-gradient(90deg, #1976d2, #1565c0)',
      waspContainerBg: 'linear-gradient(90deg, #d299c2, #fef9d7)',
      waspContainerBorder: 'linear-gradient(90deg, #87ceeb, #c0dfff, #87ceeb)',
      playButtonBg: 'bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700',
      questionCounterBg: 'linear-gradient(135deg, #1976d2, #1565c0)',
      progressBarBg: '#1976d2'
    },
    afternoon: {
      titleColor: 'text-sky-600',
      subtitle: 'Is the day over yet?',
      subtitleColor: 'text-sky-500',
      gameContainerBg: 'linear-gradient(135deg, #e6f3ff 0%, #fff2e6 100%)',
      timerBarBg: 'linear-gradient(90deg, #1976d2, #f57c00)',
      waspContainerBg: 'linear-gradient(90deg, #a8edea, #fed6e3)',
      waspContainerBorder: 'linear-gradient(90deg, #87ceeb, #ffa07a, #87ceeb)',
      playButtonBg: 'bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600',
      questionCounterBg: 'linear-gradient(135deg, #1976d2, #f57c00)',
      progressBarBg: '#1976d2'
    },
    sunset: {
      titleColor: 'text-orange-800',
      subtitle: 'What a day!',
      subtitleColor: 'text-yellow-200',
      gameContainerBg: 'linear-gradient(135deg, #fff5e6 0%, #ffe6e6 100%)',
      timerBarBg: 'linear-gradient(90deg, #d84315, #6a1b9a)',
      waspContainerBg: 'linear-gradient(90deg, #ffeaa7, #fdcb6e)',
      waspContainerBorder: 'linear-gradient(90deg, #ff6b35, #8b5cf6, #ff6b35)',
      playButtonBg: 'bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700',
      questionCounterBg: 'linear-gradient(135deg, #d84315, #6a1b9a)',
      progressBarBg: '#d84315'
    },
    night: {
      titleColor: 'text-purple-200',
      subtitle: 'Don\'t stay up too late...',
      subtitleColor: 'text-purple-300',
      gameContainerBg: 'linear-gradient(135deg, #f0e6ff 0%, #e6e6ff 100%)',
      timerBarBg: 'linear-gradient(90deg, #4527a0, #512da8)',
      waspContainerBg: 'linear-gradient(90deg, #d299c2, #fef9d7)',
      waspContainerBorder: 'linear-gradient(90deg, #667eea, #764ba2, #667eea)',
      playButtonBg: 'bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700',
      questionCounterBg: 'linear-gradient(135deg, #4527a0, #512da8)',
      progressBarBg: '#4527a0'
    }
  };

  return configs[theme];
};

export const capitalizeWords = (text: string): string => {
  return text.split(' ').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  ).join(' ');
}; 