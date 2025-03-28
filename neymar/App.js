import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, View, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { useState } from 'react';

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <ScrollView style={styles.scroll}>
      <View style={styles.container}>
        <StatusBar style="light" />

        {/* Título */}
        <Text style={styles.title}>NEYMAR JR</Text>

        {/* Imagem principal */}
        <Image
          source={{
            uri: "https://inteligenciafinanceira.com.br/wp-content/uploads/2022/08/cropped-atacante-neymar-brasil-psg.jpg"
          }}
          style={styles.profileImage}
        />

        {/* Card de informações */}
        <View style={styles.infoCard}>
          <Text style={styles.infoText}><Text style={styles.label}>Nome:</Text> Neymar da Silva Junior</Text>
          <Text style={styles.infoText}><Text style={styles.label}>Idade:</Text> 33 anos</Text>
          <Text style={styles.infoText}><Text style={styles.label}>Altura:</Text> 1,77m</Text>
          <Text style={styles.infoText}><Text style={styles.label}>Traições:</Text> Infinitas 😆</Text>
        </View>

        {/* Botão para abrir o Modal */}
        <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
          <Text style={styles.buttonText}>FAÇA O NEY MARCAR</Text>
        </TouchableOpacity>

        {/* Modal personalizado */}
        <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <View style={styles.modalContainer}>
            <View style={styles.modalCard}>
              <Text style={styles.modalText}>TRAIIIUUU! DIGO... GOOOL! O SEU SONHO ESTÁ REALIZADO MENINOO!</Text>
              <Image
                source={{
                  uri: "https://images.ctfassets.net/3mv54pzvptwz/5zqIYfPe6IJyERhFCvCUs2/a1c7407ee3a30fc008cea5ba508f08dd/neymar2_reu.jpg"
                }}
                style={styles.modalImage}
              />
              <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.closeButtonText}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Galeria de imagens */}
        <Text style={styles.sectionTitle}>E APENAS APRECIE</Text>
        <View style={styles.imageGallery}>
          <Image
            source={{
              uri: "https://www.cnnbrasil.com.br/wp-content/uploads/sites/12/2025/02/neymar_comemora_gol-e1739751506319.jpg?w=1200&h=900&crop=1"
            }}
            style={styles.galleryImage}
          />
          <Image
            source={{
              uri: "https://assets.goal.com/images/v3/blt1ef9300391c48a5b/GettyImages-1243553711.jpg?auto=webp&format=pjpg&width=3840&quality=60"
            }}
            style={styles.galleryImage}
          />
          <Image
            source={{
              uri: "https://newr7-r7-prod.web.arc-cdn.net/resizer/v2/FX6D6DCAERLX7NJDPJM2B34ETI.jpg?auth=f8b727088f4136694a43d75fc0699400cb9377861858222360e150d6c8f4374e&width=1200&height=600"
            }}
            style={styles.galleryImage}
          />
          <Image
            source={{
              uri: "https://s2-ge.glbimg.com/IuvdFFqMmkGQKH_oEHT6qg-Tbt0=/0x0:1080x981/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_bc8228b6673f488aa253bbcb03c80ec5/internal_photos/bs/2020/G/A/rKvezgRiy5pzVRKs8dBA/neymar-comemora-gol-fazendo-gesto-de-silencio-1575508862463-v2-1080x981.jpg"
            }}
            style={styles.galleryImage}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    backgroundColor: "#121212", // Fundo escuro
  },
  container: {
    flex: 1,
    alignItems: "center",
    padding: 40,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#FFD700", // Dourado
    marginBottom: 10,
    textTransform: "uppercase",
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100, // Imagem redonda
    borderWidth: 3,
    borderColor: "#FFD700", // Borda dourada
    marginBottom: 20,
  },
  infoCard: {
    backgroundColor: "#1E1E1E",
    padding: 15,
    borderRadius: 10,
    width: "90%",
    alignItems: "center",
    marginBottom: 20,
  },
  infoText: {
    color: "#FFF",
    fontSize: 18,
    marginBottom: 5,
  },
  label: {
    fontWeight: "bold",
    color: "#FFD700",
  },
  button: {
    backgroundColor: "#FFD700", // Dourado
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginBottom: 20,
  },
  buttonText: {
    color: "#121212",
    fontSize: 18,
    fontWeight: "bold",
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FFD700",
    marginBottom: 10,
  },
  imageGallery: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 10,
  },
  galleryImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#FFD700",
  },

  // Estilos do Modal
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.8)", // Fundo semi-transparente
    justifyContent: "center",
    alignItems: "center",
  },
  modalCard: {
    backgroundColor: "#222",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    width: "80%",
    borderWidth: 2,
    borderColor: "#FFD700",
  },
  modalText: {
    fontSize: 18,
    color: "#FFF",
    textAlign: "center",
    marginBottom: 10,
  },
  modalImage: {
    width: 250,
    height: 250,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#FFD700",
  },
  closeButton: {
    marginTop: 15,
    backgroundColor: "#FFD700",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#121212",
  },
});
