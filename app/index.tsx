import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";

const cards = [
  { title: "Lebensmittel scannen", subtitle: "Barcode prüfen und Histamin-Risiko einschätzen", icon: "▣" },
  { title: "Mahlzeit eintragen", subtitle: "Kalorien, Protein und Makros dokumentieren", icon: "+" },
  { title: "Stimmung erfassen", subtitle: "Energie, Stress und Konzentration festhalten", icon: "☺" },
  { title: "Symptome dokumentieren", subtitle: "Beschwerden, Stärke und Zeitpunkt speichern", icon: "!" }
];

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.brand}>HistaTrack</Text>
        <Text style={styles.tagline}>Verstehe, was dir wirklich guttut.</Text>

        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Heute</Text>
          <Text style={styles.calories}>0 / 2.000 kcal</Text>
          <View style={styles.row}>
            <Text style={styles.metric}>Protein 0 / 140 g</Text>
            <Text style={styles.metric}>Stimmung —</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Was möchtest du tun?</Text>

        {cards.map((card) => (
          <Pressable key={card.title} style={styles.actionCard}>
            <View style={styles.iconBox}><Text style={styles.icon}>{card.icon}</Text></View>
            <View style={styles.actionText}>
              <Text style={styles.actionTitle}>{card.title}</Text>
              <Text style={styles.actionSubtitle}>{card.subtitle}</Text>
            </View>
          </Pressable>
        ))}

        <View style={styles.notice}>
          <Text style={styles.noticeTitle}>Hinweis</Text>
          <Text style={styles.noticeText}>HistaTrack unterstützt dich beim Dokumentieren und Erkennen zeitlicher Zusammenhänge. Die App ersetzt keine medizinische Diagnose.</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#F6F7F3" },
  container: { padding: 22, paddingBottom: 48 },
  brand: { marginTop: 14, fontSize: 34, fontWeight: "800", color: "#26352D" },
  tagline: { marginTop: 5, fontSize: 16, color: "#68736C" },
  summaryCard: { marginTop: 28, padding: 22, borderRadius: 22, backgroundColor: "#26352D" },
  summaryTitle: { color: "#DCE4DD", fontSize: 15, fontWeight: "700" },
  calories: { marginTop: 12, color: "#FFFFFF", fontSize: 27, fontWeight: "800" },
  row: { marginTop: 18, flexDirection: "row", justifyContent: "space-between" },
  metric: { color: "#E9EEEA", fontSize: 13 },
  sectionTitle: { marginTop: 30, marginBottom: 12, fontSize: 18, fontWeight: "800", color: "#26352D" },
  actionCard: { marginBottom: 12, padding: 16, borderRadius: 18, backgroundColor: "#FFFFFF", flexDirection: "row", alignItems: "center" },
  iconBox: { width: 46, height: 46, borderRadius: 14, backgroundColor: "#E9EEE9", alignItems: "center", justifyContent: "center" },
  icon: { color: "#26352D", fontSize: 23, fontWeight: "800" },
  actionText: { flex: 1, marginLeft: 14 },
  actionTitle: { fontSize: 16, fontWeight: "800", color: "#26352D" },
  actionSubtitle: { marginTop: 4, fontSize: 13, lineHeight: 18, color: "#6E7872" },
  notice: { marginTop: 18, padding: 17, borderRadius: 16, backgroundColor: "#EAEDE8" },
  noticeTitle: { fontWeight: "800", color: "#3E4942" },
  noticeText: { marginTop: 5, fontSize: 12, lineHeight: 18, color: "#68736C" }
});
