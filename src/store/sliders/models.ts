export enum Sliders {
  welcome = 'welcome',
  deposit = 'deposit',
}

export enum SlidersActionTypes {
  SET_SLIDER_INDEX = '@@sliders/SET_SLIDER_INDEX',
}

type SlideIndex = number;

export interface SlidersState {
  welcome: SlideIndex;
  deposit: SlideIndex;
}
