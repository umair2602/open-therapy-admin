const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

// MongoDB connection string
const MONGODB_URI = 'mongodb+srv://dev:REwvdw5OjN3taWIh@opentherapy.7jrd0xj.mongodb.net/opentherapy_db?retryWrites=true&w=majority&appName=OpenTherapy'

// Admin User Schema
const adminUserSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  role: {
    type: String,
    enum: ['super_admin', 'admin', 'moderator'],
    default: 'admin',
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  lastLogin: Date,
}, {
  timestamps: true,
})

const AdminUser = mongoose.model('AdminUser', adminUserSchema)

// Emotion Category Schema
const emotionCategorySchema = new mongoose.Schema({
  name: String,
  color: String,
  description: String,
  isMainCategory: Boolean,
  parentCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'EmotionCategory',
  },
  emotions: [{
    name: String,
    description: String,
    aiPrompt: String,
    isActive: Boolean,
  }],
  isActive: Boolean,
  order: Number,
}, {
  timestamps: true,
})

const EmotionCategory = mongoose.model('EmotionCategory', emotionCategorySchema)

async function createInitialData() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI)
    console.log('Connected to MongoDB')

    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 10)
    
    const adminUser = new AdminUser({
      username: 'admin',
      email: 'admin@opentherapy.com',
      password: hashedPassword,
      role: 'super_admin',
      isActive: true,
    })

    await adminUser.save()
    console.log('Admin user created successfully')

    // Create the four main emotion categories
    const mainCategories = [
      {
        name: 'Tensa e Agitada',
        color: '#ef4444',
        description: 'Energia tensa e agitada - para momentos de stress e ansiedade',
        isMainCategory: true,
        order: 1,
        emotions: [
          {
            name: 'ansiedade',
            description: 'Sentimento de preocupação e nervosismo',
            aiPrompt: 'Você está sentindo ansiedade. Vamos trabalhar juntos para encontrar calma e tranquilidade. Respire fundo e vamos explorar o que está causando essa sensação.',
            isActive: true,
          },
          {
            name: 'inveja',
            description: 'Sentimento de desejo pelo que outros têm',
            aiPrompt: 'A inveja é um sentimento natural que todos experimentamos. Vamos conversar sobre o que você está sentindo e como podemos transformar isso em motivação positiva.',
            isActive: true,
          },
          {
            name: 'ciúmes',
            description: 'Sentimento de possessividade e medo de perder',
            aiPrompt: 'Os ciúmes podem ser desafiadores. Vamos explorar as raízes desse sentimento e encontrar formas saudáveis de lidar com ele.',
            isActive: true,
          },
          {
            name: 'tensão',
            description: 'Estado de nervosismo e estresse físico',
            aiPrompt: 'Você está sentindo tensão no corpo. Vamos fazer alguns exercícios de relaxamento para liberar essa tensão e encontrar alívio.',
            isActive: true,
          },
          {
            name: 'pânico',
            description: 'Sensação intensa de medo e ansiedade',
            aiPrompt: 'Estou aqui com você neste momento de pânico. Vamos trabalhar juntos para encontrar calma. Respire comigo, devagar e profundamente.',
            isActive: true,
          },
          {
            name: 'raiva',
            description: 'Sentimento intenso de irritação e frustração',
            aiPrompt: 'A raiva é uma emoção válida. Vamos conversar sobre o que está acontecendo e encontrar formas construtivas de expressar e lidar com esse sentimento.',
            isActive: true,
          },
          {
            name: 'medo',
            description: 'Sensação de perigo ou ameaça',
            aiPrompt: 'O medo pode ser paralisante. Vamos explorar juntos o que está causando esse medo e encontrar formas de enfrentá-lo com coragem.',
            isActive: true,
          },
          {
            name: 'estresse',
            description: 'Pressão mental e emocional',
            aiPrompt: 'O estresse pode ser esmagador. Vamos identificar as fontes de estresse e criar estratégias para gerenciá-lo de forma saudável.',
            isActive: true,
          },
          {
            name: 'irritação',
            description: 'Sentimento de aborrecimento e impaciência',
            aiPrompt: 'A irritação pode afetar nosso bem-estar. Vamos conversar sobre o que está causando essa sensação e como podemos encontrar paz.',
            isActive: true,
          },
          {
            name: 'frustração',
            description: 'Sentimento de decepção e impotência',
            aiPrompt: 'A frustração é natural quando as coisas não saem como planejado. Vamos explorar juntos como podemos lidar com essa situação.',
            isActive: true,
          },
          {
            name: 'angústia',
            description: 'Sensação profunda de sofrimento emocional',
            aiPrompt: 'Você está passando por um momento difícil. Estou aqui para ouvir e apoiar você. Vamos trabalhar juntos para encontrar alívio.',
            isActive: true,
          },
          {
            name: 'impaciência',
            description: 'Dificuldade em esperar ou tolerar atrasos',
            aiPrompt: 'A impaciência pode ser desafiadora. Vamos conversar sobre o que está causando essa sensação e como podemos cultivar mais paciência.',
            isActive: true,
          },
        ],
      },
      {
        name: 'Animada e Confiante',
        color: '#f59e0b',
        description: 'Energia animada e confiante - para momentos de motivação e determinação',
        isMainCategory: true,
        order: 2,
        emotions: [
          {
            name: 'entusiasmo',
            description: 'Sentimento de excitação e energia positiva',
            aiPrompt: 'Que ótimo ver você entusiasmado! Vamos aproveitar essa energia positiva e canalizá-la para alcançar seus objetivos.',
            isActive: true,
          },
          {
            name: 'coragem',
            description: 'Força para enfrentar desafios',
            aiPrompt: 'A coragem que você está sentindo é inspiradora! Vamos explorar como podemos usar essa força para superar qualquer obstáculo.',
            isActive: true,
          },
          {
            name: 'alegria',
            description: 'Sentimento de felicidade e contentamento',
            aiPrompt: 'É maravilhoso que você esteja se sentindo alegre! Vamos celebrar esse momento e explorar o que está trazendo essa felicidade.',
            isActive: true,
          },
          {
            name: 'inspiração',
            description: 'Sensação de criatividade e motivação',
            aiPrompt: 'A inspiração está fluindo! Vamos aproveitar esse momento criativo e explorar as possibilidades que se abrem para você.',
            isActive: true,
          },
          {
            name: 'admiração',
            description: 'Sentimento de respeito e apreciação',
            aiPrompt: 'A admiração que você está sentindo é uma emoção poderosa. Vamos explorar o que está inspirando esse sentimento em você.',
            isActive: true,
          },
          {
            name: 'determinação',
            description: 'Forte vontade de alcançar objetivos',
            aiPrompt: 'Sua determinação é impressionante! Vamos trabalhar juntos para manter esse foco e alcançar tudo o que você deseja.',
            isActive: true,
          },
          {
            name: 'autoconfiança',
            description: 'Crença nas próprias capacidades',
            aiPrompt: 'É ótimo que você esteja se sentindo confiante! Vamos explorar essa autoconfiança e usá-la para alcançar seus objetivos.',
            isActive: true,
          },
          {
            name: 'esperança',
            description: 'Sentimento de otimismo sobre o futuro',
            aiPrompt: 'A esperança que você está sentindo é preciosa. Vamos cultivar esse sentimento e trabalhar para tornar seus sonhos realidade.',
            isActive: true,
          },
          {
            name: 'autenticidade',
            description: 'Sentimento de ser verdadeiro consigo mesmo',
            aiPrompt: 'Ser autêntico é uma das maiores forças que podemos ter. Vamos celebrar essa autenticidade e explorar como ela pode guiar suas decisões.',
            isActive: true,
          },
          {
            name: 'curiosidade',
            description: 'Desejo de aprender e explorar',
            aiPrompt: 'A curiosidade é um presente! Vamos aproveitar esse desejo de aprender e explorar novas possibilidades juntos.',
            isActive: true,
          },
          {
            name: 'satisfação',
            description: 'Sentimento de realização e contentamento',
            aiPrompt: 'É maravilhoso que você esteja se sentindo satisfeito! Vamos celebrar suas conquistas e explorar como podemos manter esse sentimento.',
            isActive: true,
          },
          {
            name: 'vontade de agir',
            description: 'Motivação para tomar ação',
            aiPrompt: 'Sua vontade de agir é inspiradora! Vamos canalizar essa energia e criar um plano para alcançar seus objetivos.',
            isActive: true,
          },
        ],
      },
      {
        name: 'Desanimada e Apática',
        color: '#6b7280',
        description: 'Energia desanimada e apática - para momentos de tristeza e desânimo',
        isMainCategory: true,
        order: 3,
        emotions: [
          {
            name: 'tristeza',
            description: 'Sentimento de pesar e melancolia',
            aiPrompt: 'É natural sentir tristeza às vezes. Estou aqui para ouvir você e apoiar você neste momento difícil. Vamos trabalhar juntos para encontrar alívio.',
            isActive: true,
          },
          {
            name: 'melancolia',
            description: 'Estado de tristeza profunda e reflexiva',
            aiPrompt: 'A melancolia pode ser um momento de introspecção. Vamos explorar juntos o que está causando esse sentimento e como podemos encontrar paz.',
            isActive: true,
          },
          {
            name: 'solidão',
            description: 'Sensação de estar sozinho e isolado',
            aiPrompt: 'A solidão pode ser muito difícil. Quero que você saiba que não está sozinho. Estou aqui para conversar e apoiar você.',
            isActive: true,
          },
          {
            name: 'culpa',
            description: 'Sentimento de responsabilidade por algo negativo',
            aiPrompt: 'A culpa pode ser pesada de carregar. Vamos conversar sobre o que está acontecendo e encontrar formas de lidar com esse sentimento.',
            isActive: true,
          },
          {
            name: 'vergonha',
            description: 'Sensação de inadequação e constrangimento',
            aiPrompt: 'A vergonha pode ser muito dolorosa. Vamos trabalhar juntos para encontrar compaixão por você mesmo e superar esse sentimento.',
            isActive: true,
          },
          {
            name: 'fracasso',
            description: 'Sensação de não ter alcançado objetivos',
            aiPrompt: 'O fracasso é parte do caminho para o sucesso. Vamos conversar sobre o que aconteceu e como podemos aprender com essa experiência.',
            isActive: true,
          },
          {
            name: 'cansaço',
            description: 'Estado de exaustão física e mental',
            aiPrompt: 'O cansaço pode afetar muito nosso bem-estar. Vamos explorar o que está causando essa exaustão e como podemos encontrar descanso.',
            isActive: true,
          },
          {
            name: 'letargia',
            description: 'Falta de energia e motivação',
            aiPrompt: 'A letargia pode ser desafiadora. Vamos trabalhar juntos para encontrar pequenas formas de recuperar sua energia e motivação.',
            isActive: true,
          },
          {
            name: 'vazio',
            description: 'Sensação de falta de propósito e significado',
            aiPrompt: 'O vazio pode ser uma oportunidade para encontrar novos significados. Vamos explorar juntos o que pode trazer mais propósito à sua vida.',
            isActive: true,
          },
          {
            name: 'desencanto',
            description: 'Perda de ilusões e expectativas',
            aiPrompt: 'O desencanto pode ser doloroso, mas também pode ser um momento de crescimento. Vamos conversar sobre o que está acontecendo.',
            isActive: true,
          },
          {
            name: 'desconexão',
            description: 'Sensação de estar separado dos outros',
            aiPrompt: 'A desconexão pode ser muito difícil. Vamos trabalhar juntos para encontrar formas de se reconectar com você mesmo e com os outros.',
            isActive: true,
          },
          {
            name: 'rejeição',
            description: 'Sensação de não ser aceito ou valorizado',
            aiPrompt: 'A rejeição pode ser muito dolorosa. Quero que você saiba que você é valioso e digno de amor e aceitação.',
            isActive: true,
          },
        ],
      },
      {
        name: 'Calma e Leve',
        color: '#3b82f6',
        description: 'Energia calma e leve - para momentos de paz e tranquilidade',
        isMainCategory: true,
        order: 4,
        emotions: [
          {
            name: 'serenidade',
            description: 'Estado de paz interior e tranquilidade',
            aiPrompt: 'Que belo momento de serenidade! Vamos aproveitar essa paz interior e explorar como podemos cultivar mais momentos como este.',
            isActive: true,
          },
          {
            name: 'gratidão',
            description: 'Sentimento de apreciação e agradecimento',
            aiPrompt: 'A gratidão é uma das emoções mais poderosas. Vamos explorar o que você está agradecendo e como podemos cultivar mais gratidão.',
            isActive: true,
          },
          {
            name: 'receptividade',
            description: 'Abertura para receber e aceitar',
            aiPrompt: 'Sua receptividade é uma qualidade maravilhosa. Vamos explorar como essa abertura pode trazer mais riqueza à sua vida.',
            isActive: true,
          },
          {
            name: 'aceitação',
            description: 'Aceitação de si mesmo e das circunstâncias',
            aiPrompt: 'A aceitação é um presente que você está dando a si mesmo. Vamos celebrar essa sabedoria e explorar como ela pode trazer mais paz.',
            isActive: true,
          },
          {
            name: 'presença',
            description: 'Estado de estar presente no momento atual',
            aiPrompt: 'Estar presente é uma prática poderosa. Vamos explorar como podemos cultivar mais presença e mindfulness em sua vida.',
            isActive: true,
          },
          {
            name: 'ternura',
            description: 'Sentimento de carinho e gentileza',
            aiPrompt: 'A ternura que você está sentindo é preciosa. Vamos explorar como podemos compartilhar essa gentileza com você mesmo e com os outros.',
            isActive: true,
          },
          {
            name: 'bem-estar',
            description: 'Sensação de saúde e felicidade',
            aiPrompt: 'É maravilhoso que você esteja se sentindo bem! Vamos celebrar esse momento e explorar como podemos manter esse bem-estar.',
            isActive: true,
          },
          {
            name: 'equilíbrio',
            description: 'Estado de harmonia e estabilidade',
            aiPrompt: 'O equilíbrio que você está sentindo é valioso. Vamos explorar como podemos manter essa harmonia em sua vida.',
            isActive: true,
          },
          {
            name: 'compaixão',
            description: 'Sentimento de empatia e cuidado',
            aiPrompt: 'A compaixão que você está sentindo é uma qualidade maravilhosa. Vamos explorar como podemos cultivar mais compaixão.',
            isActive: true,
          },
          {
            name: 'conexão',
            description: 'Sensação de estar conectado com outros',
            aiPrompt: 'A conexão que você está sentindo é preciosa. Vamos explorar como podemos cultivar mais conexões significativas.',
            isActive: true,
          },
          {
            name: 'contentamento',
            description: 'Satisfação com o que é',
            aiPrompt: 'O contentamento é uma forma de sabedoria. Vamos celebrar essa satisfação e explorar como podemos cultivar mais momentos como este.',
            isActive: true,
          },
          {
            name: 'acolhimento',
            description: 'Sensação de ser bem-vindo e aceito',
            aiPrompt: 'É maravilhoso que você esteja se sentindo acolhido. Vamos explorar como podemos criar mais momentos de acolhimento em sua vida.',
            isActive: true,
          },
        ],
      },
    ]

    // Clear existing categories and create new ones
    await EmotionCategory.deleteMany({})
    
    for (const category of mainCategories) {
      const newCategory = new EmotionCategory(category)
      await newCategory.save()
      console.log(`Category "${category.name}" created successfully`)
    }

    console.log('All initial data created successfully!')
    console.log('\nAdmin credentials:')
    console.log('Username: admin')
    console.log('Password: admin123')
    console.log('Email: admin@opentherapy.com')

  } catch (error) {
    console.error('Error creating initial data:', error)
  } finally {
    await mongoose.disconnect()
    console.log('Disconnected from MongoDB')
  }
}

createInitialData()
