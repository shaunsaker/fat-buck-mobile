import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/native';
import { RHYTHM } from '../../constants';
import { Screens } from '../../Router';
import { setSliderIndex } from '../../store/actions';
import {
  selectIsAuthenticated,
  selectIsNewUser,
} from '../../store/auth/selectors';
import { navigate } from '../../store/navigation/actions';
import { Sliders } from '../../store/sliders/models';
import { selectWelcomeSliderIndex } from '../../store/sliders/selectors';
import { sortArrayOfObjectsByKey } from '../../utils/sortArrayOfObjectsByKey';
import { Background } from '../Background';
import { HeaderBar } from '../HeaderBar';
import { PageHeader } from '../PageHeader';
import { Slider } from '../Slider';
import { getSlides, WelcomeSlide } from './slides';

const WelcomeContainer = styled.View`
  padding: ${RHYTHM}px 0;
  flex: 1;
  align-items: center;
`;

interface WelcomeSlideProgressProps {
  isActive: boolean;
}

interface WelcomeBaseProps {
  isNewUser: boolean;
  slideIndex: number;
  slides: WelcomeSlide[];
  onProgressItemPress: (index: number) => void;
  onSubmit: () => void;
}

const WelcomeBase = ({
  isNewUser,
  slideIndex,
  slides,
  onProgressItemPress,
  onSubmit,
}: WelcomeBaseProps) => {
  return (
    <Background>
      <HeaderBar showClose={!isNewUser} />

      <PageHeader>{slides[slideIndex].title}</PageHeader>

      <WelcomeContainer>
        <Slider
          slideIndex={slideIndex}
          slides={slides}
          onSetSlideIndex={onProgressItemPress}
          onSubmit={onSubmit}
        />
      </WelcomeContainer>
    </Background>
  );
};

export const Welcome = () => {
  const dispatch = useDispatch();
  const slideIndex = useSelector(selectWelcomeSliderIndex);
  const isNewUser = useSelector(selectIsNewUser);
  const slides = getSlides(isNewUser);
  const slidesArray = sortArrayOfObjectsByKey(
    Object.keys(slides).map((slideId) => ({
      ...slides[slideId],
    })),
    'slideIndex',
  );

  const onProgressItemPress = (index: number) => {
    dispatch(setSliderIndex(Sliders.welcome, index));
  };

  const onSubmit = useCallback(() => {
    const isLastSlide = slideIndex === slidesArray.length - 1;
    if (!isLastSlide) {
      dispatch(setSliderIndex(Sliders.welcome, slideIndex + 1));
    } else {
      if (isNewUser) {
        dispatch(navigate(Screens.signIn));
      } else {
        dispatch(navigate());
      }
    }
  }, [slideIndex, isNewUser, slidesArray, dispatch]);

  useEffect(() => {
    // on unmount, reset the slide index
    return () => {
      dispatch(setSliderIndex(Sliders.welcome, 0));
    };
  }, [dispatch]);

  return (
    <WelcomeBase
      isNewUser={isNewUser}
      slideIndex={slideIndex}
      slides={slidesArray}
      onProgressItemPress={onProgressItemPress}
      onSubmit={onSubmit}
    />
  );
};
