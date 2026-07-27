import { useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Switch, Text, TextInput, View } from 'react-native';
import { router } from 'expo-router';
import { database } from '../src/database/database';

export default function MealScreen() {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [calories, setCalories] = useState('');
  const [protein, setProtein] = useState('');
  const [carbs, setCarbs] = useState('');
  const [fat, setFat] = useState('');
  const [dao, setDao] = useState(false);
  const [rating, setRating] = useState('unknown');
  const [notes, setNotes] = useState('');

  const number = (value: string) => Number(value.replace(',', '.')) || 0;

  function save() {
    if (!name.trim() || number(amount) <= 0) {
      Alert.alert('Angaben fehlen', 'Bitte Lebensmittel und Menge eintragen.');
      return;
    }
    database.runSync(`INSERT INTO meals (product_name, amount_grams, calories, protein, carbohydrates, fat, histamine_rating, dao_taken, eaten_at, notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [name.trim(), number(amount), number(calories), number(protein), number(carbs), number(fat), rating, dao ? 1 : 0, new Date().toISOString(), notes.trim() || null]);
    Alert.alert('Gespeichert', 'Die Mahlzeit wurde eingetragen.', [{ text: 'OK', onPress: () => router.back() }]);
  }

  return <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
    <Text style={styles.title}>Was hast du gegessen?</Text>
    <Field label="Lebensmittel" value={name} setValue={setName} placeholder="z. B. Haferflocken" />
    <Field label="Menge (g)" value={amount} setValue={setAmount} numeric />
    <Text style={styles.heading}>Nährwerte der Portion</Text>
    <Field label="Kalorien (kcal)" value={calories} setValue={setCalories} numeric />
    <View style={styles.row}><View style={styles.half}><Field label="Protein (g)" value={protein} setValue={setProtein} numeric /></View><View style={styles.half}><Field label="Kohlenhydrate (g)" value={carbs} setValue={setCarbs} numeric /></View></View>
    <Field label="Fett (g)" value={fat} setValue={setFat} numeric />
    <Text style={styles.heading}>Histamin-Einschätzung</Text>
    <View style={styles.ratingRow}>{[['green','🟢 Eher gut'],['yellow','🟡 Prüfen'],['red','🔴 Kritisch'],['unknown','⚪ Unklar']].map(([value,label]) => <Pressable key={value} onPress={() => setRating(value)} style={[styles.rating, rating === value && styles.ratingSelected]}><Text>{label}</Text></Pressable>)}</View>
    <View style={styles.switchRow}><View><Text style={styles.label}>DAO eingenommen</Text><Text style={styles.helper}>Vor oder zu dieser Mahlzeit</Text></View><Switch value={dao} onValueChange={setDao} /></View>
    <Field label="Notiz" value={notes} setValue={setNotes} multiline placeholder="Frische, Zubereitung, Reaktion …" />
    <Pressable style={styles.save} onPress={save}><Text style={styles.saveText}>Mahlzeit speichern</Text></Pressable>
  </ScrollView>;
}

function Field({ label, value, setValue, numeric, multiline, placeholder }: { label: string; value: string; setValue: (v: string) => void; numeric?: boolean; multiline?: boolean; placeholder?: string }) {
  return <View style={styles.field}><Text style={styles.label}>{label}</Text><TextInput value={value} onChangeText={setValue} placeholder={placeholder} keyboardType={numeric ? 'decimal-pad' : 'default'} multiline={multiline} style={[styles.input, multiline && styles.multiline]} /></View>;
}

const styles = StyleSheet.create({
  container: { padding: 22, paddingBottom: 50, backgroundColor: '#F5F3EC' }, title: { fontSize: 28, fontWeight: '800', color: '#27352F', marginBottom: 22 }, heading: { fontSize: 18, fontWeight: '800', color: '#27352F', marginTop: 10, marginBottom: 13 },
  field: { marginBottom: 15 }, label: { fontWeight: '700', color: '#39473F', marginBottom: 7 }, helper: { color: '#77817A', fontSize: 12, marginTop: 3 }, input: { minHeight: 50, backgroundColor: '#FFFFFF', borderRadius: 14, paddingHorizontal: 14, fontSize: 16 }, multiline: { minHeight: 95, paddingTop: 14, textAlignVertical: 'top' },
  row: { flexDirection: 'row', gap: 10 }, half: { flex: 1 }, ratingRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 18 }, rating: { backgroundColor: '#FFFFFF', borderRadius: 12, paddingHorizontal: 12, paddingVertical: 11 }, ratingSelected: { borderWidth: 2, borderColor: '#27352F' },
  switchRow: { backgroundColor: '#FFFFFF', borderRadius: 15, padding: 14, marginBottom: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }, save: { minHeight: 56, borderRadius: 17, backgroundColor: '#27352F', alignItems: 'center', justifyContent: 'center', marginTop: 8 }, saveText: { color: '#FFFFFF', fontSize: 16, fontWeight: '800' },
});
