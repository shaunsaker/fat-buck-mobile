import React from 'react';
import { Welcome } from '.';
import { Screens } from '../../Router';
import { setHasSeenWelcome, setSliderIndex } from '../../store/actions';
import { navigate } from '../../store/navigation/actions';
import rootReducer, { initialState } from '../../store/reducers';
import { Sliders } from '../../store/sliders/models';
import { mountComponent } from '../../testUtils/mountComponent';
import { pressButton } from '../../testUtils/pressButton';
import { pressElement } from '../../testUtils/pressElement';
import { getProgressItemTestId } from '../Slider';
import { getSlides } from './slides';

describe('Welcome', () => {
  const getLastSlideIndex = () => {
    const lastSlideIndex = Object.keys(getSlides()).length - 1;

    return lastSlideIndex;
  };

  const setupWelcomeAndProgressToLastSlide = ({
    isNewUser,
  }: {
    isNewUser?: boolean;
  }) => {
    const lastSlideIndex = getLastSlideIndex();
    let state = rootReducer(
      initialState,
      setSliderIndex(Sliders.welcome, lastSlideIndex),
    );

    if (!isNewUser) {
      state = rootReducer(state, setHasSeenWelcome(true));
    }

    const component = mountComponent(<Welcome />, state);

    return component;
  };

  const getSlideButtonText = ({
    isNewUser,
    slideIndex,
  }: {
    isNewUser: boolean;
    slideIndex: number;
  }) => {
    const slideKey = Object.keys(getSlides(isNewUser))[slideIndex];
    const buttonText = getSlides(isNewUser)[slideKey].buttonText;

    return buttonText;
  };

  const getLastSlideButtonText = ({ isNewUser }: { isNewUser: boolean }) => {
    const lastSlideIndex = getLastSlideIndex();
    const lastSlideButtonText = getSlideButtonText({
      isNewUser,
      slideIndex: lastSlideIndex,
    });

    return lastSlideButtonText;
  };

  it('progresses to the next slide on progress item press', () => {
    const component = mountComponent(<Welcome />);

    const nextSlideIndex = 1;
    pressElement({ component, testId: getProgressItemTestId(nextSlideIndex) });

    expect(component.spy).toHaveBeenCalledWith(
      setSliderIndex(Sliders.welcome, nextSlideIndex),
    );
  });

  it('progresses to the next slide on submit button press', () => {
    const component = mountComponent(<Welcome />);

    const buttonText = getSlideButtonText({ isNewUser: true, slideIndex: 0 });
    pressButton({
      component,
      buttonText,
    });

    const nextSlideIndex = 1;
    expect(component.spy).toHaveBeenCalledWith(
      setSliderIndex(Sliders.welcome, nextSlideIndex),
    );
  });

  it('on submit navigates to the the signIn screen if its a new user', () => {
    const isNewUser = true;
    const component = setupWelcomeAndProgressToLastSlide({ isNewUser });

    const lastSlideButtonText = getLastSlideButtonText({ isNewUser });
    pressButton({
      component,
      buttonText: lastSlideButtonText,
    });

    expect(component.spy).toHaveBeenCalledWith(navigate(Screens.signIn));
  });

  it('on submit navigates back if its an existing user', () => {
    const isNewUser = false;
    const component = setupWelcomeAndProgressToLastSlide({ isNewUser });

    const lastSlideButtonText = getLastSlideButtonText({ isNewUser });
    pressButton({
      component,
      buttonText: lastSlideButtonText,
    });

    expect(component.spy).toHaveBeenCalledWith(navigate());
  });

  it('resets the slide index on unmount', () => {
    const isNewUser = true;
    const component = setupWelcomeAndProgressToLastSlide({ isNewUser });

    component.unmount();

    expect(component.spy).toHaveBeenCalledWith(
      setSliderIndex(Sliders.welcome, 0),
    );
  });
});
