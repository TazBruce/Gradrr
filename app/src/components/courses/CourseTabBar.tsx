import React from "react";
import { t } from "../../utils";
import { Box, useColorModeValue } from "native-base";
import { Animated, Dimensions, Pressable } from "react-native";
import { SceneMap, TabView } from "react-native-tab-view";
import CourseList from "./CourseList";

const initialLayout = {
  width: Dimensions.get("window").width,
};

const renderScene = SceneMap({
  first: () => CourseList(true),
  second: () => CourseList(false),
});

/**
 * Renders the tab bar for the courses screen.
 * @constructor Creates a CourseTabBar.
 */
export default function CourseTabBar() {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {
      key: "first",
      title: t("courses.currentCourses"),
    },
    {
      key: "second",
      title: t("courses.pastCourses"),
    },
  ]);

  const renderTabBar = (props: {
    navigationState: { routes: any[] };
    position: {
      interpolate: (arg0: { inputRange: any; outputRange: any }) => any;
    };
  }) => {
    const inputRange = props.navigationState.routes.map((x, i) => i);
    return (
      <Box flexDirection="row">
        {props.navigationState.routes.map((route, i) => {
          props.position.interpolate({
            inputRange,
            outputRange: inputRange.map((inputIndex) =>
              inputIndex === i ? 1 : 0.5
            ),
          });
          const color =
            index === i
              ? useColorModeValue("#000", "#e5e5e5")
              : useColorModeValue("#1f2937", "#a1a1aa");
          const borderColor =
            index === i
              ? "primary.500"
              : useColorModeValue("coolGray.200", "gray.400");
          return (
            <Box
              key={route.key}
              borderBottomWidth="3"
              borderColor={borderColor}
              flex={1}
              alignItems="center"
              p="3"
            >
              <Pressable
                onPress={() => {
                  setIndex(i);
                }}
              >
                <Animated.Text
                  style={{
                    color,
                  }}
                >
                  {route.title}
                </Animated.Text>
              </Pressable>
            </Box>
          );
        })}
      </Box>
    );
  };

  return (
    <TabView
      navigationState={{
        index,
        routes,
      }}
      renderScene={renderScene}
      renderTabBar={renderTabBar}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
    />
  );
}
