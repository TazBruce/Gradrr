import React from "react";
import { t } from "../utils";
import Screen from "../components/common/Screen";
import { Box, Button, Center, useColorModeValue, Text } from "native-base";
import { Animated, Dimensions, Pressable, StatusBar } from "react-native";
import { getCourses } from "../providers/DataProvider";
import { SceneMap, TabView } from "react-native-tab-view";

const CurrentCourses = () => (
  <Center flex={1} my="4">
    <Text>Hello</Text>
  </Center>
);

const PastCourses = () => (
  <Center flex={1} my="4">
    This is Tab 2
  </Center>
);

const initialLayout = {
  width: Dimensions.get("window").width,
};

const renderScene = SceneMap({
  first: CurrentCourses,
  second: PastCourses,
});

function TabFunction() {
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
              ? "cyan.500"
              : useColorModeValue("coolGray.200", "gray.400");
          return (
            <Box
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
      style={{
        marginTop: StatusBar.currentHeight,
      }}
    />
  );
}

export default function CoursesScreen() {
  const courses = getCourses();
  console.log(courses);
  return (
    <Screen title={t("courses.title")}>
      <TabFunction />
    </Screen>
  );
}
