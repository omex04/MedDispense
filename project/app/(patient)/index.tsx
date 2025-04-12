import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { FileText, Send } from 'lucide-react-native';

// Dummy data for demonstration
const DUMMY_PRESCRIPTIONS = [
  {
    id: '1',
    date: '2024-02-20',
    doctor: 'Dr. John Smith',
    medicines: [
      { name: 'Amoxicillin 500mg', dosage: '1 tablet 3 times daily', duration: '7 days' },
      { name: 'Ibuprofen 400mg', dosage: '1 tablet as needed', duration: '5 days' },
    ],
  },
  {
    id: '2',
    date: '2024-02-15',
    doctor: 'Dr. Sarah Johnson',
    medicines: [
      { name: 'Paracetamol 500mg', dosage: '2 tablets every 6 hours', duration: '3 days' },
    ],
  },
];

export default function PatientPrescriptions() {
  const [prescriptions] = useState(DUMMY_PRESCRIPTIONS);

  const handleDispense = (prescriptionId: string) => {
    // Implement dispense logic
    console.log('Dispensing prescription:', prescriptionId);
  };

  const renderMedicine = ({ item: medicine }) => (
    <View style={styles.medicineItem}>
      <Text style={styles.medicineName}>{medicine.name}</Text>
      <Text style={styles.medicineDetails}>{medicine.dosage}</Text>
      <Text style={styles.medicineDetails}>Duration: {medicine.duration}</Text>
    </View>
  );

  const renderPrescription = ({ item: prescription }) => (
    <View style={styles.prescriptionCard}>
      <View style={styles.prescriptionHeader}>
        <View style={styles.headerLeft}>
          <FileText size={20} color="#4c669f" />
          <View>
            <Text style={styles.date}>{prescription.date}</Text>
            <Text style={styles.doctor}>{prescription.doctor}</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.dispenseButton}
          onPress={() => handleDispense(prescription.id)}
        >
          <Send size={20} color="#fff" />
          <Text style={styles.dispenseText}>Dispense</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={prescription.medicines}
        renderItem={renderMedicine}
        keyExtractor={(item, index) => `${prescription.id}-med-${index}`}
        scrollEnabled={false}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={prescriptions}
        renderItem={renderPrescription}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  list: {
    padding: 16,
    gap: 16,
  },
  prescriptionCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  prescriptionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  date: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    color: '#333',
  },
  doctor: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: '#666',
  },
  dispenseButton: {
    backgroundColor: '#4c669f',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 8,
    gap: 4,
  },
  dispenseText: {
    color: '#fff',
    fontFamily: 'Inter_600SemiBold',
    fontSize: 14,
  },
  medicineItem: {
    padding: 12,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    marginBottom: 8,
  },
  medicineName: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
  },
  medicineDetails: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: '#666',
  },
});