import React, { useMemo } from 'react';
import { StyleSheet, TextStyle, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Button, HelperText, Text, TextInput } from 'react-native-paper';
import Animated, {
  SlideInLeft,
  SlideInRight,
  SlideOutLeft,
  SlideOutRight,
} from 'react-native-reanimated';

import { ThemeSpacing, Translation, useTheme } from '../../app-context';
import { Screen } from '../../components';
import { useNewTrackerScreen } from './new-tracker-screen.hook';

export const NewTrackerScreen = () => {
  const { colors } = useTheme();

  const {
    name,
    handleChangeTextName,
    handleSubmit,
    submitDisabled,
    existingTrackerInfo,
  } = useNewTrackerScreen();

  const subHeadlineStyle = useMemo(() => {
    return StyleSheet.compose<TextStyle>(styles.headline, {
      color: colors.onSurfaceVariant,
    });
  }, [colors]);

  return (
    <Screen testID="NewTrackerScreen">
      <View style={styles.textContainer}>
        <Text
          style={styles.headline}
          variant="displayLarge"
          adjustsFontSizeToFit
          numberOfLines={2}>
          {Translation.letsBuildSomeInsights}
        </Text>
        <Text
          style={subHeadlineStyle}
          variant="titleLarge"
          adjustsFontSizeToFit
          numberOfLines={2}>
          {Translation.anythingYouWantToKeepTrackOf}
        </Text>
      </View>
      <KeyboardAwareScrollView enableOnAndroid>
        <View style={styles.formContainer}>
          <View style={styles.inputsContainer}>
            <TextInput
              label={Translation.name}
              value={name}
              onChangeText={handleChangeTextName}
              placeholder={Translation.trackerNamePlaceholder}
              blurOnSubmit={true}
              autoCapitalize="none"
              autoFocus
            />
            <HelperText type="error" visible={!!existingTrackerInfo}>
              {existingTrackerInfo?.helperText}
            </HelperText>
            {existingTrackerInfo !== null && (
              <Animated.View entering={SlideInLeft} exiting={SlideOutLeft}>
                <Button
                  mode="contained-tonal"
                  onPress={existingTrackerInfo.navigateToTrackerScreen}>
                  {existingTrackerInfo.buttonText}
                </Button>
              </Animated.View>
            )}
            {existingTrackerInfo === null && (
              <Animated.View entering={SlideInRight} exiting={SlideOutRight}>
                <Button
                  mode="contained"
                  onPress={handleSubmit}
                  disabled={submitDisabled}>
                  {Translation.add}
                </Button>
              </Animated.View>
            )}
          </View>
        </View>
      </KeyboardAwareScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  textContainer: {
    justifyContent: 'center',
    marginBottom: ThemeSpacing.base * 2,
  },
  headline: {
    marginBottom: ThemeSpacing.base * 2,
  },
  inputsContainer: {
    flexShrink: 0,
    justifyContent: 'flex-end',
    marginTop: ThemeSpacing.base * 2,
  },
});
