import { useCallback, useState } from 'react';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { router, useFocusEffect } from 'expo-router';
import { getDashboardSummary, type DashboardSummary } from '../src/database/database';

const emptySummary: DashboardSummary = { calories: 0, protein: 0, carbohydrates: 0, fat: 0, symptomCount: 0, latestMood: null };

export default function HomeScreen() {
  const [summary, setSummary] = useState(emptySummary);

  useFocusEffect(useCallback(() => {
    setSummary(getDashboardSummary());
  }, []));

  const mood = summary.latestMood ? ['😣', '🙁', '😐', '🙂', '😄'][summary.latestMood - 1] : '–';

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.eyebrow}>DEIN PERSÖNLICHES TAGEBUCH</Text>
        <Text style={styles.title}>HistaTrack</Text>
        <Text style={styles.subtitle}>Ernährung, Histamin und dein Befinden gemeinsam verstehen.</Text>

        <View style={styles.summaryCard}>
          <Text style={styles.cardTitle}>Heute</Text>
          <Text style={styles.calories}>{Math.round(summary.calories)} kcal</Text>
          <View style={styles.metricsRow}>
            <Metric label="Protein" value={`${Math.round(summary.protein)} g`} />
            <Metric label="Kohlenhydrate" value={`${Math.round(summary.carbohydrates)} g`} />
            <Metric label="Fett" value={`${Math.round(summary.fat)} g`} />
          </View>
          <View style={styles.statusRow}>
            <Text style={styles.status}>Stimmung: {mood}</Text>
            <Text style={styles.status}>Symptome: {summary.symptomCount}</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Schnell erfassen</Text>
        <Action title="Mahlzeit" subtitle="Kalorien, Makros und DAO" icon="🍽️" onPress={() => router.push('/meal')} />
        <Action title="Check-in" subtitle="Stimmung, Energie, Stress" icon="🙂" onPress={() => router.push('/checkin')} />
        <Action title="Symptome" subtitle="Art und Stärke dokumentieren" icon="🫀" onPress={() => router.push('/symptoms')} />

        <View style={styles.notice}>
          <Text style={styles.noticeTitle}>Wichtiger Hinweis</Text>
          <Text style={styles.noticeText}>HistaTrack erkennt zeitliche Muster, ersetzt aber keine medizinische Diagnose oder Behandlung.</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return <View style={styles.metric}><Text style={styles.metricValue}>{value}</Text><Text style={styles.metricLabel}>{label}</Text></View>;
}

function Action({ title, subtitle, icon, onPress }: { title: string; subtitle: string; icon: string; onPress: () => void }) {
  return <Pressable style={styles.action} onPress={onPress}><Text style={styles.actionIcon}>{icon}</Text><View style={styles.actionText}><Text style={styles.actionTitle}>{title}</Text><Text style={styles.actionSubtitle}>{subtitle}</Text></View><Text style={styles.chevron}>›</Text></Pressable>;
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F5F3EC' },
  container: { padding: 22, paddingBottom: 48 },
  eyebrow: { marginTop: 18, fontSize: 12, letterSpacing: 1.5, fontWeight: '700', color: '#738078' },
  title: { fontSize: 42, fontWeight: '800', color: '#27352F', marginTop: 4 },
  subtitle: { fontSize: 16, lineHeight: 23, color: '#657069', marginTop: 8, marginBottom: 24 },
  summaryCard: { backgroundColor: '#27352F', borderRadius: 24, padding: 22 },
  cardTitle: { color: '#DCE5DE', fontWeight: '700' },
  calories: { color: '#FFFFFF', fontSize: 34, fontWeight: '800', marginTop: 8 },
  metricsRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 },
  metric: { flex: 1 }, metricValue: { color: '#FFFFFF', fontSize: 17, fontWeight: '800' }, metricLabel: { color: '#B9C5BD', fontSize: 11, marginTop: 3 },
  statusRow: { borderTopWidth: 1, borderTopColor: '#526158', marginTop: 18, paddingTop: 14, flexDirection: 'row', justifyContent: 'space-between' },
  status: { color: '#E8ECE9', fontWeight: '600' },
  sectionTitle: { fontSize: 20, fontWeight: '800', color: '#27352F', marginTop: 28, marginBottom: 12 },
  action: { minHeight: 76, backgroundColor: '#FFFFFF', borderRadius: 18, paddingHorizontal: 16, marginBottom: 11, flexDirection: 'row', alignItems: 'center' },
  actionIcon: { fontSize: 27, width: 43 }, actionText: { flex: 1 }, actionTitle: { fontSize: 17, fontWeight: '800', color: '#27352F' }, actionSubtitle: { color: '#748078', marginTop: 3 }, chevron: { fontSize: 31, color: '#9BA49E' },
  notice: { marginTop: 20, backgroundColor: '#E8E4D9', borderRadius: 17, padding: 17 }, noticeTitle: { fontWeight: '800', color: '#4C574F' }, noticeText: { color: '#657069', fontSize: 12, lineHeight: 18, marginTop: 5 },
});
