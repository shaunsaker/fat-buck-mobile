import React, { ReactNode, useCallback, useEffect, useRef } from 'react';
import { Dimensions, FlatList } from 'react-native';
import styled from 'styled-components/native';
import { colors } from '../colors';
import { RHYTHM } from '../constants';
import Button, { ButtonKinds } from './Button';

const SLIDE_WIDTH = Dimensions.get('window').width;

const SliderContainer = styled.View`
  flex: 1;
`;

const SlideContainer = styled.View`
  width: ${SLIDE_WIDTH}px;
  padding: 0 ${RHYTHM}px;
`;

const ProgressContainer = styled.View`
  flex-direction: row;
  margin-bottom: ${RHYTHM * 2}px;
`;

const WELCOME_SLIDE_PROGRESS_SIZE = 12;
const WELCOME_SLIDE_PROGRESS_MARGIN = RHYTHM / 2;

export const getProgressItemTestId = (index: number) =>
  `progress-item-${index}`;

interface ProgressItemContainerProps {
  isActive: boolean;
}

const ProgressItemContainer = styled.TouchableOpacity<
  ProgressItemContainerProps
>`
  width: ${WELCOME_SLIDE_PROGRESS_SIZE}px;
  height: ${WELCOME_SLIDE_PROGRESS_SIZE}px;
  border-radius: ${WELCOME_SLIDE_PROGRESS_SIZE / 2}px;
  background-color: ${({ isActive }) =>
    isActive ? colors.white : colors.transWhite};
  margin: 0 ${WELCOME_SLIDE_PROGRESS_MARGIN}px;
`;

const ButtonContainer = styled.View`
  margin-top: ${RHYTHM}px;
  justify-content: flex-end;
  align-items: center;
`;

interface SliderBaseProps {
  flatListRef: any; // FIXME: type this
  slideIndex: number;
  slides: Slide[];
  isForwardDisabled?: boolean;
  onProgressItemPress: (index: number) => void;
  onSubmit: () => void;
}

const SliderBase = ({
  flatListRef,
  slideIndex,
  slides,
  onProgressItemPress,
  onSubmit,
}: SliderBaseProps) => {
  const renderSlide = useCallback(
    ({ item }: { item: Slide; index: number }) => {
      return <SlideContainer>{item.children}</SlideContainer>;
    },
    [],
  );

  const getItemLayout = useCallback(
    (data: Slide[] | null | undefined, index: number) => {
      const length = SLIDE_WIDTH;
      const offset = SLIDE_WIDTH * index;
      return {
        length,
        offset,
        index,
      };
    },
    [],
  );

  return (
    <SliderContainer>
      <FlatList
        ref={flatListRef}
        horizontal
        alwaysBounceHorizontal={false}
        bounces={false}
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        data={slides}
        keyExtractor={({ slideIndex: index }) => index.toString()}
        renderItem={renderSlide}
        getItemLayout={getItemLayout}
      />
      <ButtonContainer>
        <ProgressContainer>
          {slides.map((slide, index) => (
            <ProgressItemContainer
              key={slide.slideIndex}
              testID={getProgressItemTestId(index)}
              isActive={index === slideIndex}
              hitSlop={{
                top: WELCOME_SLIDE_PROGRESS_MARGIN,
                right: WELCOME_SLIDE_PROGRESS_MARGIN,
                bottom: WELCOME_SLIDE_PROGRESS_MARGIN,
                left: WELCOME_SLIDE_PROGRESS_MARGIN,
              }}
              onPress={() => onProgressItemPress(index)}
              disabled={index >= slideIndex && slides[index].disabled}
            />
          ))}
        </ProgressContainer>

        <Button
          kind={ButtonKinds.primary}
          disabled={slides[slideIndex + 1]?.disabled}
          loading={slides[slideIndex].loading}
          onPress={onSubmit}>
          {slides[slideIndex].buttonText}
        </Button>
      </ButtonContainer>
    </SliderContainer>
  );
};

export interface Slide {
  slideIndex: number;
  children: ReactNode;
  buttonText: string;
  disabled?: boolean;
  loading?: boolean;
}

export interface SliderProps {
  slideIndex: number;
  slides: Slide[];
  onSetSlideIndex: (index: number) => void;
  onSubmit: () => void;
}

export const Slider = ({
  slideIndex,
  slides,
  onSetSlideIndex,
  onSubmit,
}: SliderProps) => {
  const flatListRef = useRef<FlatList<Slide>>();

  useEffect(() => {
    // if the slide index changes, scroll to that slide
    flatListRef.current?.scrollToIndex({
      index: slideIndex,
      animated: true,
    });
  }, [slideIndex]);

  const onProgressItemPress = useCallback(
    (index: number) => {
      onSetSlideIndex(index);
    },
    [onSetSlideIndex],
  );

  return (
    <SliderBase
      flatListRef={flatListRef}
      slideIndex={slideIndex}
      slides={slides}
      onProgressItemPress={onProgressItemPress}
      onSubmit={onSubmit}
    />
  );
};
