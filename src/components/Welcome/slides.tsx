import React from 'react';
import { Slide } from '../Slider';
import { Bot } from './Bot';
import { Fees } from './Fees';
import { How } from './How';
import { Intro } from './Intro';

export interface WelcomeSlide extends Slide {
  title: string;
}

export const getSlides = (
  isNewUser?: boolean,
): Record<string, WelcomeSlide> => {
  return {
    intro: {
      title: 'Welcome to Fat Buck!',
      slideIndex: 0,
      children: <Intro />,
      buttonText: 'CONTINUE',
    },
    bot: {
      title: 'We have bots!',
      slideIndex: 1,
      children: <Bot />,
      buttonText: 'CONTINUE',
    },
    how: {
      title: 'How does it work?',
      slideIndex: 2,
      children: <How />,
      buttonText: 'CONTINUE',
    },
    fees: {
      title: 'No shennanigans.',
      slideIndex: 3,
      children: <Fees />,
      buttonText: isNewUser ? 'SIGN UP' : 'CLOSE',
    },
  };
};
