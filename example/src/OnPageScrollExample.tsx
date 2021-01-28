import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { ProgressBar } from './component/ProgressBar';
import { useNavigationPanel } from './hook/useNavigationPanel';
import { NavigationPanel } from './component/NavigationPanel';
import { AnimatedViewPager } from './utils';

export function OnPageScrollExample() {
  const { ref, ...navigationPanel } = useNavigationPanel(5);
  const { activePage, setPage, progress, pages } = navigationPanel;

  return (
    <SafeAreaView style={styles.flex}>
      <View style={styles.container}>
        <ScrollView horizontal>
          {pages.map((_v, index) => (
            <TouchableOpacity key={index} onPress={() => setPage(index)}>
              <View style={styles.separator}>
                <Text
                  style={[
                    styles.touchableTitle,
                    activePage === index && styles.touchableTitleActive,
                  ]}
                >
                  Page {index}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <AnimatedViewPager
        ref={ref}
        style={styles.viewpager}
        data={navigationPanel.pages}
        keyExtractor={(page) => `${page.key}`}
        renderItem={({ item, index }) => (
          <View style={[item.style, styles.center]}>
            <Text style={styles.text}>{`Page Index: ${index}`}</Text>
          </View>
        )}
      />
      <View style={styles.progressContainer}>
        <ProgressBar numberOfPages={pages.length} progress={progress} />
      </View>

      <NavigationPanel {...navigationPanel} disablePagesAmountManagement />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  viewpager: {
    flex: 1,
  },
  container: {
    flexDirection: 'row',
    backgroundColor: '#63a4ff',
  },
  progressContainer: { flex: 0.1, backgroundColor: '#63a4ff' },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    padding: 20,
  },
  text: {
    fontSize: 30,
  },
  separator: {
    paddingVertical: 16,
    paddingHorizontal: 10,
  },
  touchableTitle: {
    textAlign: 'center',
    color: '#000',
  },
  touchableTitleActive: {
    color: '#fff',
  },
});