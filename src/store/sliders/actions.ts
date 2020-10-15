import { action } from 'typesafe-actions';
import { Sliders, SlidersActionTypes } from './models';

export const setSliderIndex = (slider: Sliders, index: number) =>
  action(SlidersActionTypes.SET_SLIDER_INDEX, {
    slider,
    index,
  });
