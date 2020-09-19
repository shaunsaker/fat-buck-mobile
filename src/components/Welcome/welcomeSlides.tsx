import React from 'react';
import { ReactNode } from 'react';
import { Bot } from './Bot';
import { Fees } from './Fees';
import { How } from './How';
import { Intro } from './Intro';

export interface WelcomeSlide {
  title: string;
  children: ReactNode;
  buttonText: string;
}

export const welcomeSlides: WelcomeSlide[] = [
  {
    title: 'Welcome to Fat Buck!',
    children: <Intro />,
    buttonText: 'CONTINUE',
  },
  {
    title: 'We have a bot!',
    children: <Bot />,
    buttonText: 'CONTINUE',
  },
  {
    title: 'How does it work?',
    children: <How />,
    buttonText: 'CONTINUE',
  },
  {
    title: 'No shennanigans.',
    children: <Fees />,
    buttonText: 'SIGN UP',
  },
];
