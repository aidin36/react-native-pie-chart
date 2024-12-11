import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import PieChart from 'react-native-pie-chart'

export default function App() {
  const widthAndHeight = 250
  const series = [
    { value: 430, color: '#fbd203' },
    { value: 321, color: '#ffb300' },
    { value: 185, color: '#ff9100' },
    { value: 123, color: '#ff6c00' },
    { value: 80, color: '#ff3c00' },
  ]

  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.container}>
        <StatusBar style='auto' />

        <Text style={styles.title}>Pie</Text>
        <PieChart widthAndHeight={widthAndHeight} series={series} />

        <Text style={styles.title}>Doughnut</Text>
        <PieChart widthAndHeight={widthAndHeight} series={series} coverRadius={0.6} />

        <Text style={styles.title}>Doughnut with fill</Text>
        <PieChart widthAndHeight={widthAndHeight} series={series} coverRadius={0.6} coverFill={'#ffeab2'} />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    margin: 10,
  },
})
