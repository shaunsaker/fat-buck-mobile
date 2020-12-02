import React, { useCallback, useState } from 'react';
import Counter from 'react-native-counter';

interface AnimatedNumberProps {
  digits?: number;
  children: string;
}

export const AnimatedNumber = ({
  digits = 2,
  children,
}: AnimatedNumberProps) => {
  const [initialValue, setInitialValue] = useState(parseFloat(children));
  const finalValue = parseFloat(children);

  const onComplete = useCallback(() => {
    // set the initialValue to children to prepare a future update on children which will trigger a new counter animation
    setInitialValue(parseFloat(children));
  }, [children]);

  return (
    <Counter
      key={finalValue} // mount new if finalValue changes
      start={initialValue}
      end={finalValue}
      digits={digits}
      time={1500}
      easing="quadOut"
      onComplete={onComplete}
    />
  );
};
