import { defineStore } from 'pinia'

import basicGreetingAndIntroductionsMultipleChoice from '~/data/basic/greetings-and-introductions/multiple-choice.yml'
import basicGreetingAndIntroductionsErrorIdentification from '~/data/basic/greetings-and-introductions/error-identification.yml'
import basicGreetingAndIntroductionsFillInTheBlanks from '~/data/basic/greetings-and-introductions/fill-in-the-blanks.yml'
import basicGreetingAndIntroductionsMatching from '~/data/basic/greetings-and-introductions/matching.yml'
import basicGreetingAndIntroductionsSentenceCompletion from '~/data/basic/greetings-and-introductions/sentence-completion.yml'
import basicGreetingAndIntroductionsTrueOrFalse from '~/data/basic/greetings-and-introductions/true-or-false.yml'

import basicPersonalPronounsMultipleChoice from '~/data/basic/personal-pronouns/multiple-choice.yml'
import basicPersonalPronounsErrorIdentification from '~/data/basic/personal-pronouns/error-identification.yml'
import basicPersonalPronounsFillInTheBlanks from '~/data/basic/personal-pronouns/fill-in-the-blanks.yml'
import basicPersonalPronounsMatching from '~/data/basic/personal-pronouns/matching.yml'
import basicPersonalPronounsSentenceCompletion from '~/data/basic/personal-pronouns/sentence-completion.yml'
import basicPersonalPronounsTrueOrFalse from '~/data/basic/personal-pronouns/true-or-false.yml'

export const useExerciseStore = defineStore('exercises', {
  state: () => ({
    selectedType: null,
    showAnswers: false,
    difficulties: {
      basic: {
        label: 'Basic',
        explanation: '',
        order: 1,
        isActive: true,
        topics: {
          'greetings-and-introductions': {
            label: 'Greetings and Introductions',
            explanation: `In English, greetings and introductions are more natural and flexible than traditional textbook dialogues. While schools often teach formal patterns like "Student A: My name is... Student B: My name is...", real conversations are more dynamic. There are many ways to greet people and introduce yourself, from formal to informal situations. The key is to sound natural and appropriate for the context.`,
            details: [
              "Instead of always using 'My name is...', you can simply say your name directly - it sounds more natural",
              "There are many variations of 'Nice to meet you': 'Pleased to meet you', 'Lovely to meet you', 'Good to meet you', 'Great to meet you'",
              "Pay attention to pronunciation, especially in phrases like 'pleased to meet you' where 'pleased' ends with a 'd' sound, not 't'",
              "Use natural sounds like 'oh', 'ah', 'um' to make your English sound more authentic",
              "The formality of your greeting should match the situation - formal for business, casual for friends",
              "Remember that English speakers often add little expressions to sound friendlier"
            ],
            examples: [
              {
                english: "Hi, I'm Kim",
                translation: "Hola, soy Kim",
                pronunciation: "jai, aim Kim"
              },
              {
                english: "Nice to meet you",
                translation: "Encantado de conocerte",
                pronunciation: "nais tu mit yu"
              },
              {
                english: "Pleased to meet you",
                translation: "Encantado de conocerte",
                pronunciation: "plisd tu mit yu"
              },
              {
                english: "Good to meet you",
                translation: "Encantado de conocerte",
                pronunciation: "gud tu mit yu"
              },
              {
                english: "Lovely to meet you",
                translation: "Encantado de conocerte",
                pronunciation: "lávli tu mit yu",
                note: "Remember 'lovely' comes from 'love' + 'ly', don't pronounce it as 'love-ely'"
              },
              {
                english: "It's wonderful to make your acquaintance",
                translation: "Es maravilloso conocerte (formal)",
                pronunciation: "its uánderful tu meik yor akuéintans"
              }
            ],
            exercises: {
              'multiple-choice': {
                label: 'Selección Múltiple',
                order: 1,
                isActive: true,
                component: 'MultipleChoice',
                items: basicGreetingAndIntroductionsMultipleChoice.items,
              },
              'fill-in-the-blanks': {
                label: 'Rellena los Espacios',
                order: 2,
                isActive: true,
                component: 'FillInTheBlanks',
                items: basicGreetingAndIntroductionsFillInTheBlanks.items,
              },
              'matching': {
                label: 'Emparejamiento',
                order: 3,
                isActive: true,
                component: 'Matching',
                items: basicGreetingAndIntroductionsMatching.items,
              },
              'error-identification': {
                label: 'Identificación de Errores',
                order: 4,
                isActive: true,
                component: 'ErrorIdentification',
                items: basicGreetingAndIntroductionsErrorIdentification.items,
              },
              'sentence-completion': {
                label: 'Completar Oraciones',
                order: 5,
                isActive: true,
                component: 'SentenceCompletion',
                items: basicGreetingAndIntroductionsSentenceCompletion.items,
              },
              'true-or-false': {
                label: 'Verdadero o Falso',
                order: 6,
                isActive: true,
                component: 'TrueOrFalse',
                items: basicGreetingAndIntroductionsTrueOrFalse.items,
              },
            },
            order: 10,
            isActive: true,
          },
          'personal-pronouns': {
            label: 'Pronombres Personales',
            explanation: "Personal pronouns in English are essential for clear communication. Unlike Spanish, English pronouns must always be explicitly stated in sentences. They change form depending on their function in the sentence (subject vs object pronouns) and there's no gender for objects ('it' for all non-living things).",
            details: [
              "Subject pronouns (I, you, he, she, it, we, they) always come before the verb",
              "Object pronouns (me, you, him, her, it, us, them) receive the action of the verb",
              "Objects and animals use 'it' regardless of gender, unlike Spanish which assigns gender",
              "English doesn't allow pronoun dropping like Spanish does - you must always include the pronoun",
              "Possessive pronouns (my, your, his, her, its, our, their) show ownership",
              "When referring to companies/organizations, use 'it' not 'they' for singular entities"
            ],
            examples: [
              {
                english: "I am learning English",
                spanish: "Estoy aprendiendo inglés",
                pronunciation: "ai am learning inglish",
                note: "Notice how 'I' must be included, unlike Spanish where 'yo' can be omitted"
              },
              {
                english: "She gave him the book",
                spanish: "Ella le dio el libro",
                pronunciation: "shi geiv jim da buk",
                note: "Subject pronoun (she) and object pronoun (him) have different forms"
              },
              {
                english: "The car has its lights on",
                spanish: "El carro tiene sus luces encendidas",
                pronunciation: "da car jas its laits on",
                note: "Notice use of 'its' for objects, regardless of gender in Spanish"
              }
            ],
            exercises: {
              'multiple-choice': {
                label: 'Selección Múltiple',
                order: 1,
                isActive: true,
                component: 'MultipleChoice',
                items: basicPersonalPronounsMultipleChoice.items,
              },
              'fill-in-the-blanks': {
                label: 'Rellena los Espacios',
                order: 2,
                isActive: true,
                component: 'FillInTheBlanks',
                items: basicPersonalPronounsFillInTheBlanks.items,
              },
              'matching': {
                label: 'Emparejamiento',
                order: 3,
                isActive: true,
                component: 'Matching',
                items: basicPersonalPronounsMatching.items,
              },
              'error-identification': {
                label: 'Identificación de Errores',
                order: 4,
                isActive: true,
                component: 'ErrorIdentification',
                items: basicPersonalPronounsErrorIdentification.items,
              },
              'sentence-completion': {
                label: 'Completar Oraciones',
                order: 5,
                isActive: true,
                component: 'SentenceCompletion',
                items: basicPersonalPronounsSentenceCompletion.items,
              },
              'true-or-false': {
                label: 'Verdadero o Falso',
                order: 6,
                isActive: true,
                component: 'TrueOrFalse',
                items: basicPersonalPronounsTrueOrFalse.items,
              },
            },
            order: 20,
            isActive: true,
          },
          'daily-routines': {
            label: 'Rutinas Diarias',
            explanation: "Daily routines in English are expressed using the simple present tense and often include specific time expressions. The key is understanding how to structure sentences about habitual actions and the importance of time markers.",
            details: [
              "Use simple present tense for habitual actions",
              "Time expressions are crucial (every day, usually, always, never, etc.)",
              "Third person singular requires adding -s/-es to verbs",
              "Word order: Subject + Verb + Time Expression",
              "Frequency adverbs usually go before the main verb",
              "Days of the week and parts of the day require specific prepositions"
            ],
            examples: [
              {
                english: "I wake up at 6:00 AM every day",
                spanish: "Me despierto a las 6:00 AM todos los días",
                pronunciation: "ai weik ap at siks ei em evri dei"
              },
              {
                english: "She takes a shower in the morning",
                spanish: "Ella se ducha en la mañana",
                pronunciation: "shi teiks a shauer in da morning"
              },
              {
                english: "They usually have dinner at 7:00 PM",
                spanish: "Usualmente cenan a las 7:00 PM",
                pronunciation: "dei yusuali jav diner at seven pi em"
              }
            ],
            exercises: {
              'multiple-choice': {
                label: 'Selección Múltiple',
                order: 1,
                isActive: true,
                component: 'MultipleChoice',
                // items: x.items,
              },
              'fill-in-the-blanks': {
                label: 'Rellena los Espacios',
                order: 2,
                isActive: true,
                component: 'FillInTheBlanks',
                // items: x.items,
              },
              'matching': {
                label: 'Emparejamiento',
                order: 3,
                isActive: true,
                component: 'Matching',
                // items: x.items,
              },
              'error-identification': {
                label: 'Identificación de Errores',
                order: 4,
                isActive: true,
                component: 'ErrorIdentification',
                // items: x.items,
              },
              'sentence-completion': {
                label: 'Completar Oraciones',
                order: 5,
                isActive: true,
                component: 'SentenceCompletion',
                // items: x.items,
              },
              'true-or-false': {
                label: 'Verdadero o Falso',
                order: 6,
                isActive: true,
                component: 'TrueOrFalse',
                // items: x.items,
              },
            },
            order: 30,
            isActive: true,
          },
          'simple-present': {
            label: 'Presente Simple',
            explanation: "The simple present tense in English is used to express habits, general truths, and scheduled events. Unlike Spanish, it has a specific form for third person singular and doesn't change based on formality level.",
            details: [
              "Add -s/-es to verbs in third person singular (he/she/it)",
              "Use 'do/does' for questions and negatives",
              "Express facts, habits, and general truths",
              "Used for scheduled future events",
              "Spelling rules for adding -s/-es (special cases like -y to -ies)",
              "Never used for actions happening right now (unlike Spanish present)"
            ],
            examples: [
              {
                english: "Water boils at 100 degrees Celsius",
                spanish: "El agua hierve a 100 grados Celsius",
                pronunciation: "woter boils at wan jandred degris selsias",
                note: "General truth example"
              },
              {
                english: "The train leaves at 3:00 PM tomorrow",
                spanish: "El tren sale a las 3:00 PM mañana",
                pronunciation: "da trein livs at tri pi em tumorrow",
                note: "Scheduled future event"
              },
              {
                english: "She teaches English on Mondays",
                spanish: "Ella enseña inglés los lunes",
                pronunciation: "shi tiches inglish on mandeis",
                note: "Notice -es ending for third person"
              }
            ],
            exercises: {
              'multiple-choice': {
                label: 'Selección Múltiple',
                order: 1,
                isActive: true,
                component: 'MultipleChoice',
                // items: x.items,
              },
              'fill-in-the-blanks': {
                label: 'Rellena los Espacios',
                order: 2,
                isActive: true,
                component: 'FillInTheBlanks',
                // items: x.items,
              },
              'matching': {
                label: 'Emparejamiento',
                order: 3,
                isActive: true,
                component: 'Matching',
                // items: x.items,
              },
              'error-identification': {
                label: 'Identificación de Errores',
                order: 4,
                isActive: true,
                component: 'ErrorIdentification',
                // items: x.items,
              },
              'sentence-completion': {
                label: 'Completar Oraciones',
                order: 5,
                isActive: true,
                component: 'SentenceCompletion',
                // items: x.items,
              },
              'true-or-false': {
                label: 'Verdadero o Falso',
                order: 6,
                isActive: true,
                component: 'TrueOrFalse',
                // items: x.items,
              },
            },
            order: 40,
            isActive: true,
          },
          'negatives': {
            label: 'Negativos',
            explanation: "English negatives follow a strict structure using auxiliary verbs (do/does/did) + not. Unlike Spanish, double negatives are not allowed, and the main verb always remains in its base form in negative sentences.",
            details: [
              "Use don't/doesn't for simple present negatives",
              "Use didn't for past simple negatives",
              "Main verb always stays in base form after auxiliary",
              "Avoid double negatives (common in Spanish)",
              "Position of 'not' is always after auxiliary verb",
              "Special cases with be/have/modal verbs"
            ],
            examples: [
              {
                english: "I don't like coffee",
                spanish: "No me gusta el café",
                pronunciation: "ai dont laik cofi",
                note: "Notice main verb 'like' stays in base form"
              },
              {
                english: "She doesn't work on Sundays",
                spanish: "Ella no trabaja los domingos",
                pronunciation: "shi dasent work on sandeis",
                note: "Third person uses doesn't but main verb stays as 'work'"
              },
              {
                english: "They didn't go to the party",
                spanish: "Ellos no fueron a la fiesta",
                pronunciation: "dei dident gou tu da parti",
                note: "Past negative uses didn't + base form"
              }
            ],
            exercises: {
              'multiple-choice': {
                label: 'Selección Múltiple',
                order: 1,
                isActive: true,
                component: 'MultipleChoice',
                // items: x.items,
              },
              'fill-in-the-blanks': {
                label: 'Rellena los Espacios',
                order: 2,
                isActive: true,
                component: 'FillInTheBlanks',
                // items: x.items,
              },
              'matching': {
                label: 'Emparejamiento',
                order: 3,
                isActive: true,
                component: 'Matching',
                // items: x.items,
              },
              'error-identification': {
                label: 'Identificación de Errores',
                order: 4,
                isActive: true,
                component: 'ErrorIdentification',
                // items: x.items,
              },
              'sentence-completion': {
                label: 'Completar Oraciones',
                order: 5,
                isActive: true,
                component: 'SentenceCompletion',
                // items: x.items,
              },
              'true-or-false': {
                label: 'Verdadero o Falso',
                order: 6,
                isActive: true,
                component: 'TrueOrFalse',
                // items: x.items,
              },
            },
            order: 50,
            isActive: true,
          },
          'present-continuous': {
            label: 'Presente Continuo',
            explanation: "Present continuous (also called present progressive) expresses actions happening right now or temporary actions. It's formed with the verb 'to be' (am/is/are) + verb-ing. This tense is often confused by Spanish speakers who tend to use simple present for current actions.",
            details: [
              "Structure is always: subject + am/is/are + verb-ing",
              "Used for actions happening at the moment of speaking",
              "Used for temporary actions in the present period",
              "Used for planned future arrangements",
              "Special spelling rules when adding -ing",
              "Cannot be used with stative verbs (like, love, hate, etc.)"
            ],
            examples: [
              {
                english: "She is studying for her exam",
                spanish: "Ella está estudiando para su examen",
                pronunciation: "shi is stading for jer eksam",
                note: "Current action happening now"
              },
              {
                english: "I am working from home these days",
                spanish: "Estoy trabajando desde casa estos días",
                pronunciation: "ai am working from joum dis deis",
                note: "Temporary situation"
              },
              {
                english: "We are moving to London next month",
                spanish: "Nos mudamos a Londres el próximo mes",
                pronunciation: "wi ar muving tu london nekst manth",
                note: "Planned future arrangement"
              }
            ],
            exercises: {
              'multiple-choice': {
                label: 'Selección Múltiple',
                order: 1,
                isActive: true,
                component: 'MultipleChoice',
                // items: x.items,
              },
              'fill-in-the-blanks': {
                label: 'Rellena los Espacios',
                order: 2,
                isActive: true,
                component: 'FillInTheBlanks',
                // items: x.items,
              },
              'matching': {
                label: 'Emparejamiento',
                order: 3,
                isActive: true,
                component: 'Matching',
                // items: x.items,
              },
              'error-identification': {
                label: 'Identificación de Errores',
                order: 4,
                isActive: true,
                component: 'ErrorIdentification',
                // items: x.items,
              },
              'sentence-completion': {
                label: 'Completar Oraciones',
                order: 5,
                isActive: true,
                component: 'SentenceCompletion',
                // items: x.items,
              },
              'true-or-false': {
                label: 'Verdadero o Falso',
                order: 6,
                isActive: true,
                component: 'TrueOrFalse',
                // items: x.items,
              },
            },
            order: 60,
            isActive: true,
          },
          'time-differentiation': {
            label: 'Diferenciación de Tiempos',
            explanation: "Time differentiation in English requires understanding when to use simple present versus present continuous, and how different time expressions signal different tenses. This distinction is crucial as it affects verb forms and sentence structure.",
            details: [
              "Simple present is for habits and routines (every day, usually, always)",
              "Present continuous is for current actions (now, at the moment, currently)",
              "Time expressions help determine which tense to use",
              "Future arrangements use present continuous with future time expressions",
              "Stative verbs usually don't use continuous forms",
              "Context is important for choosing the correct tense"
            ],
            examples: [
              {
                english: "I work at a bank (routine) / I am working right now (current)",
                spanish: "Trabajo en un banco / Estoy trabajando ahora",
                pronunciation: "ai work at a bank / ai am working rait nau",
                note: "Notice how time context changes the tense"
              },
              {
                english: "She usually cooks dinner / She is cooking dinner now",
                spanish: "Ella usualmente cocina la cena / Ella está cocinando la cena ahora",
                pronunciation: "shi yusuali kuks diner / shi is kuking diner nau",
                note: "Time words signal which tense to use"
              },
              {
                english: "They live in Paris (permanent) / They are living in Paris (temporary)",
                spanish: "Ellos viven en París / Ellos están viviendo en París",
                pronunciation: "dei liv in paris / dei ar living in paris",
                note: "Duration of action affects tense choice"
              }
            ],
            exercises: {
              'multiple-choice': {
                label: 'Selección Múltiple',
                order: 1,
                isActive: true,
                component: 'MultipleChoice',
                // items: x.items,
              },
              'fill-in-the-blanks': {
                label: 'Rellena los Espacios',
                order: 2,
                isActive: true,
                component: 'FillInTheBlanks',
                // items: x.items,
              },
              'matching': {
                label: 'Emparejamiento',
                order: 3,
                isActive: true,
                component: 'Matching',
                // items: x.items,
              },
              'error-identification': {
                label: 'Identificación de Errores',
                order: 4,
                isActive: true,
                component: 'ErrorIdentification',
                // items: x.items,
              },
              'sentence-completion': {
                label: 'Completar Oraciones',
                order: 5,
                isActive: true,
                component: 'SentenceCompletion',
                // items: x.items,
              },
              'true-or-false': {
                label: 'Verdadero o Falso',
                order: 6,
                isActive: true,
                component: 'TrueOrFalse',
                // items: x.items,
              },
            },
            order: 70,
            isActive: true,
          },
          'indicating-words': {
            label: 'Palabras Indicadoras',
            explanation: "Indicating words in English (determiners, demonstratives, and time markers) help specify which things we're talking about and when events occur. These words are essential for clear communication and proper time reference.",
            details: [
              "Demonstratives (this/that/these/those) show distance in space and time",
              "Articles (a/an/the) indicate specificity",
              "Time markers help distinguish between tenses (now, then, ago, last, next)",
              "Quantity indicators show amount (some, any, many, much)",
              "Possessive determiners show ownership (my, your, his, her)",
              "Order markers show sequence (first, then, next, finally)"
            ],
            examples: [
              {
                english: "This book here, that book there",
                spanish: "Este libro aquí, ese libro allá",
                pronunciation: "dis buk jir, dat buk der",
                note: "Shows physical distance with demonstratives"
              },
              {
                english: "I'll see you next week",
                spanish: "Te veré la próxima semana",
                pronunciation: "ail si yu nekst wik",
                note: "Future time marker"
              },
              {
                english: "Many students study here",
                spanish: "Muchos estudiantes estudian aquí",
                pronunciation: "meni studiants stadi jir",
                note: "Quantity indicator for countable nouns"
              },
              {
                english: "First we study, then we practice",
                spanish: "Primero estudiamos, luego practicamos",
                pronunciation: "ferst wi stadi, den wi praktis",
                note: "Sequence markers showing order"
              }
            ],
            exercises: {
              'multiple-choice': {
                label: 'Selección Múltiple',
                order: 1,
                isActive: true,
                component: 'MultipleChoice',
                // items: x.items,
              },
              'fill-in-the-blanks': {
                label: 'Rellena los Espacios',
                order: 2,
                isActive: true,
                component: 'FillInTheBlanks',
                // items: x.items,
              },
              'matching': {
                label: 'Emparejamiento',
                order: 3,
                isActive: true,
                component: 'Matching',
                // items: x.items,
              },
              'error-identification': {
                label: 'Identificación de Errores',
                order: 4,
                isActive: true,
                component: 'ErrorIdentification',
                // items: x.items,
              },
              'sentence-completion': {
                label: 'Completar Oraciones',
                order: 5,
                isActive: true,
                component: 'SentenceCompletion',
                // items: x.items,
              },
              'true-or-false': {
                label: 'Verdadero o Falso',
                order: 6,
                isActive: true,
                component: 'TrueOrFalse',
                // items: x.items,
              },
            },
            order: 80,
            isActive: true,
          },
          'past-simple': {
            label: 'Pasado Simple',
            explanation: "The past simple in English is used to describe completed actions in the past. Unlike Spanish, it has only one form (no difference between 'comí' and 'comía') and requires mastering both regular (-ed) and irregular verb forms. It's essential for telling stories, describing past experiences, and talking about history.",
            details: [
              "Regular verbs add -ed to form past tense (work → worked)",
              "Irregular verbs have unique past forms that must be memorized (go → went)",
              "All persons (I/you/he/she/it/we/they) use the same past form",
              "Three different pronunciations of -ed: /t/, /d/, /ɪd/",
              "Time expressions like 'yesterday', 'last week', 'ago' indicate past simple",
              "Negative form uses 'didn't' + base verb form for all persons"
            ],
            examples: [
              {
                english: "I watched TV last night",
                spanish: "Vi televisión anoche",
                pronunciation: "ai wocht tivi last nait",
                note: "Regular verb with /t/ sound ending"
              },
              {
                english: "She went to the store yesterday",
                spanish: "Ella fue a la tienda ayer",
                pronunciation: "shi went tu da stor yesterdei",
                note: "Irregular verb - 'go' changes to 'went'"
              },
              {
                english: "They played football two hours ago",
                spanish: "Ellos jugaron fútbol hace dos horas",
                pronunciation: "dei pleid futbol tu auers agou",
                note: "Regular verb with /d/ sound ending"
              },
              {
                english: "I needed some help",
                spanish: "Necesité ayuda",
                pronunciation: "ai nided sam jelp",
                note: "Regular verb with /ɪd/ sound ending"
              }
            ],
            exercises: {
              'multiple-choice': {
                label: 'Selección Múltiple',
                order: 1,
                isActive: true,
                component: 'MultipleChoice',
                // items: x.items,
              },
              'fill-in-the-blanks': {
                label: 'Rellena los Espacios',
                order: 2,
                isActive: true,
                component: 'FillInTheBlanks',
                // items: x.items,
              },
              'matching': {
                label: 'Emparejamiento',
                order: 3,
                isActive: true,
                component: 'Matching',
                // items: x.items,
              },
              'error-identification': {
                label: 'Identificación de Errores',
                order: 4,
                isActive: true,
                component: 'ErrorIdentification',
                // items: x.items,
              },
              'sentence-completion': {
                label: 'Completar Oraciones',
                order: 5,
                isActive: true,
                component: 'SentenceCompletion',
                // items: x.items,
              },
              'true-or-false': {
                label: 'Verdadero o Falso',
                order: 6,
                isActive: true,
                component: 'TrueOrFalse',
                // items: x.items,
              },
            },
            order: 90,
            isActive: true,
          },
          'question-formation': {
            label: 'Formación de Preguntas',
            explanation: "Questions in English follow specific word order patterns and require auxiliary verbs. Unlike Spanish, English questions must use auxiliaries (do/does/did) or change word order with be/have. The structure varies between yes/no questions and information (wh-) questions.",
            details: [
              "Yes/No questions begin with auxiliary verb (do/does/did/is/are/was)",
              "Wh-questions begin with question word (what/where/when/why/how) + auxiliary",
              "Present simple questions use do/does + base verb",
              "Past simple questions use did + base verb",
              "Be verbs (is/are/was/were) change position with subject",
              "Question words cannot be omitted like in Spanish ('¿Vas?' vs 'Where are you going?')"
            ],
            examples: [
              {
                english: "Do you like coffee?",
                spanish: "¿Te gusta el café?",
                pronunciation: "du yu laik cofi?",
                note: "Yes/No question with do auxiliary"
              },
              {
                english: "Where did you go yesterday?",
                spanish: "¿Adónde fuiste ayer?",
                pronunciation: "wer did yu gou yesterdei?",
                note: "Wh-question in past tense - verb stays in base form"
              },
              {
                english: "Is she studying right now?",
                spanish: "¿Está estudiando ahora?",
                pronunciation: "is shi stadying rait nau?",
                note: "Yes/No question with be verb"
              },
              {
                english: "What time does the movie start?",
                spanish: "¿A qué hora empieza la película?",
                pronunciation: "wat taim das da muvi start?",
                note: "Wh-question in present - notice does with third person"
              }
            ],
            exercises: {
              'multiple-choice': {
                label: 'Selección Múltiple',
                order: 1,
                isActive: true,
                component: 'MultipleChoice',
                // items: x.items,
              },
              'fill-in-the-blanks': {
                label: 'Rellena los Espacios',
                order: 2,
                isActive: true,
                component: 'FillInTheBlanks',
                // items: x.items,
              },
              'matching': {
                label: 'Emparejamiento',
                order: 3,
                isActive: true,
                component: 'Matching',
                // items: x.items,
              },
              'error-identification': {
                label: 'Identificación de Errores',
                order: 4,
                isActive: true,
                component: 'ErrorIdentification',
                // items: x.items,
              },
              'sentence-completion': {
                label: 'Completar Oraciones',
                order: 5,
                isActive: true,
                component: 'SentenceCompletion',
                // items: x.items,
              },
              'true-or-false': {
                label: 'Verdadero o Falso',
                order: 6,
                isActive: true,
                component: 'TrueOrFalse',
                // items: x.items,
              },
            },
            order: 100,
            isActive: true,
          },
          'time-expressions': {
            label: 'Expresiones de Tiempo',
            explanation: "Time expressions in English help specify when actions occur and are crucial for using the correct tense. They often differ from Spanish in structure and placement within sentences. Understanding these expressions is key for accurate temporal communication.",
            details: [
              "Past time expressions: yesterday, last week/month/year, ago, in the past",
              "Present time expressions: now, at the moment, these days, currently",
              "Future time expressions: tomorrow, next week/month/year, in the future",
              "Frequency expressions: always, usually, sometimes, never, often",
              "Prepositions with time: at (time), on (day), in (month/year)",
              "Duration expressions: for, since, during, throughout"
            ],
            examples: [
              {
                english: "I worked there three years ago",
                spanish: "Trabajé allí hace tres años",
                pronunciation: "ai workt der tri yirs agou",
                note: "Notice 'ago' comes after the time period, unlike Spanish 'hace'"
              },
              {
                english: "She's studying at the moment",
                spanish: "Está estudiando en este momento",
                pronunciation: "shis stadying at da moument",
                note: "Present continuous with current time expression"
              },
              {
                english: "The meeting starts at 3 PM on Monday",
                spanish: "La reunión empieza a las 3 PM el lunes",
                pronunciation: "da miting starts at tri pi em on mandei",
                note: "Notice preposition usage with time and day"
              },
              {
                english: "I've lived here since 2020",
                spanish: "He vivido aquí desde 2020",
                pronunciation: "aiv livd jir sins tu tausand tuenti",
                note: "Using 'since' for a specific starting point"
              }
            ],
            exercises: {
              'multiple-choice': {
                label: 'Selección Múltiple',
                order: 1,
                isActive: true,
                component: 'MultipleChoice',
                // items: x.items,
              },
              'fill-in-the-blanks': {
                label: 'Rellena los Espacios',
                order: 2,
                isActive: true,
                component: 'FillInTheBlanks',
                // items: x.items,
              },
              'matching': {
                label: 'Emparejamiento',
                order: 3,
                isActive: true,
                component: 'Matching',
                // items: x.items,
              },
              'error-identification': {
                label: 'Identificación de Errores',
                order: 4,
                isActive: true,
                component: 'ErrorIdentification',
                // items: x.items,
              },
              'sentence-completion': {
                label: 'Completar Oraciones',
                order: 5,
                isActive: true,
                component: 'SentenceCompletion',
                // items: x.items,
              },
              'true-or-false': {
                label: 'Verdadero o Falso',
                order: 6,
                isActive: true,
                component: 'TrueOrFalse',
                // items: x.items,
              },
            },
            order: 110,
            isActive: true,
          },
          'verb-patterns': {
            label: 'Patrones de Verbos',
            explanation: "Verb patterns in English follow specific rules depending on verb type, tense, and usage. Understanding these patterns is crucial for correct sentence formation. Unlike Spanish, English verbs have fewer conjugations but stricter pattern rules about how they combine with other verbs and elements in a sentence.",
            details: [
              "Basic verb pattern: Subject + Verb (+ Object)",
              "Verb + infinitive (with 'to'): want to go, need to study",
              "Verb + gerund (-ing): enjoy reading, keep working",
              "Verb + preposition + gerund: think about leaving",
              "Auxiliary + base form: do/does/did + base verb",
              "Modal verbs + base form: can/should/must + base verb",
              "Two-word verbs (phrasal verbs): get up, look after",
              "Special patterns with 'be': be good at, be interested in"
            ],
            examples: [
              {
                english: "I want to learn English",
                spanish: "Quiero aprender inglés",
                pronunciation: "ai want tu lern inglish",
                note: "Verb + to + infinitive pattern"
              },
              {
                english: "She enjoys swimming",
                spanish: "Ella disfruta nadar",
                pronunciation: "shi enyois swiming",
                note: "Verb + gerund pattern"
              },
              {
                english: "They keep talking in class",
                spanish: "Siguen hablando en clase",
                pronunciation: "dei kip toking in klas",
                note: "Verb + gerund continuous action"
              },
              {
                english: "I am good at cooking",
                spanish: "Soy bueno cocinando",
                pronunciation: "ai am gud at kuking",
                note: "Be + adjective + preposition + gerund"
              }
            ],
            exercises: {
              'multiple-choice': {
                label: 'Selección Múltiple',
                order: 1,
                isActive: true,
                component: 'MultipleChoice',
                // items: x.items,
              },
              'fill-in-the-blanks': {
                label: 'Rellena los Espacios',
                order: 2,
                isActive: true,
                component: 'FillInTheBlanks',
                // items: x.items,
              },
              'matching': {
                label: 'Emparejamiento',
                order: 3,
                isActive: true,
                component: 'Matching',
                // items: x.items,
              },
              'error-identification': {
                label: 'Identificación de Errores',
                order: 4,
                isActive: true,
                component: 'ErrorIdentification',
                // items: x.items,
              },
              'sentence-completion': {
                label: 'Completar Oraciones',
                order: 5,
                isActive: true,
                component: 'SentenceCompletion',
                // items: x.items,
              },
              'true-or-false': {
                label: 'Verdadero o Falso',
                order: 6,
                isActive: true,
                component: 'TrueOrFalse',
                // items: x.items,
              },
            },
            order: 120,
            isActive: true,
          },
          'short-answers': {
            label: 'Respuestas Cortas',
            explanation: "Short answers in English are essential for natural conversation. Unlike Spanish, where a single word might suffice, English requires a pronoun and auxiliary verb in short answers. This structure maintains grammatical completeness while being concise.",
            details: [
              "Structure for positive answers: Yes + pronoun + auxiliary",
              "Structure for negative answers: No + pronoun + auxiliary + not",
              "Must match the auxiliary verb from the question",
              "Pronouns must match the subject of the question",
              "Different auxiliaries need different responses (do/be/have/modals)",
              "Cannot answer with just 'yes' or 'no' in formal English"
            ],
            examples: [
              {
                english: "Do you like coffee? Yes, I do. / No, I don't.",
                spanish: "¿Te gusta el café? Sí. / No.",
                pronunciation: "du yu laik cofi? yes, ai du. / nou, ai dont.",
                note: "Basic do/does questions and answers"
              },
              {
                english: "Is she working? Yes, she is. / No, she isn't.",
                spanish: "¿Está trabajando? Sí. / No.",
                pronunciation: "is shi working? yes, shi is. / nou, shi isnt.",
                note: "Be verb questions and answers"
              },
              {
                english: "Did they go? Yes, they did. / No, they didn't.",
                spanish: "¿Fueron? Sí. / No.",
                pronunciation: "did dei gou? yes, dei did. / nou, dei didnt.",
                note: "Past tense questions and answers"
              },
              {
                english: "Can you help? Yes, I can. / No, I can't.",
                spanish: "¿Puedes ayudar? Sí. / No.",
                pronunciation: "kan yu jelp? yes, ai kan. / nou, ai kant.",
                note: "Modal verb questions and answers"
              }
            ],
            exercises: {
              'multiple-choice': {
                label: 'Selección Múltiple',
                order: 1,
                isActive: true,
                component: 'MultipleChoice',
                // items: x.items,
              },
              'fill-in-the-blanks': {
                label: 'Rellena los Espacios',
                order: 2,
                isActive: true,
                component: 'FillInTheBlanks',
                // items: x.items,
              },
              'matching': {
                label: 'Emparejamiento',
                order: 3,
                isActive: true,
                component: 'Matching',
                // items: x.items,
              },
              'error-identification': {
                label: 'Identificación de Errores',
                order: 4,
                isActive: true,
                component: 'ErrorIdentification',
                // items: x.items,
              },
              'sentence-completion': {
                label: 'Completar Oraciones',
                order: 5,
                isActive: true,
                component: 'SentenceCompletion',
                // items: x.items,
              },
              'true-or-false': {
                label: 'Verdadero o Falso',
                order: 6,
                isActive: true,
                component: 'TrueOrFalse',
                // items: x.items,
              },
            },
            order: 130,
            isActive: true,
          },
          'frequency-adverbs': {
            label: 'Adverbios de Frecuencia',
            explanation: "Frequency adverbs in English indicate how often actions occur. Unlike Spanish, these adverbs have a specific position in the sentence - usually before the main verb but after auxiliary verbs. They are essential for discussing habits and routines.",
            details: [
              "Common frequency adverbs: always, usually, often, sometimes, rarely, never",
              "Percentage equivalents (always = 100%, never = 0%)",
              "Position: before main verb but after be/auxiliaries",
              "Used with simple present for habits and routines",
              "Can be modified with 'very' or 'quite'",
              "Special position rules with negative statements"
            ],
            examples: [
              {
                english: "I always drink coffee in the morning",
                spanish: "Siempre tomo café en la mañana",
                pronunciation: "ai olweis drink cofi in da morning",
                note: "100% frequency - before main verb"
              },
              {
                english: "She is usually late",
                spanish: "Ella usualmente llega tarde",
                pronunciation: "shi is yusuali leit",
                note: "After 'be' verb"
              },
              {
                english: "They sometimes visit their grandmother",
                spanish: "A veces visitan a su abuela",
                pronunciation: "dei samtaims visit der grandmader",
                note: "50% frequency - flexible position possible"
              },
              {
                english: "We never eat fast food",
                spanish: "Nunca comemos comida rápida",
                pronunciation: "wi never it fast fud",
                note: "0% frequency - negative meaning but affirmative form"
              },
              {
                english: "Do you often go to the gym?",
                spanish: "¿Vas seguido al gimnasio?",
                pronunciation: "du yu ofn gou tu da yim?",
                note: "Question form with frequency adverb"
              }
            ],
            exercises: {
              'multiple-choice': {
                label: 'Selección Múltiple',
                order: 1,
                isActive: true,
                component: 'MultipleChoice',
                // items: x.items,
              },
              'fill-in-the-blanks': {
                label: 'Rellena los Espacios',
                order: 2,
                isActive: true,
                component: 'FillInTheBlanks',
                // items: x.items,
              },
              'matching': {
                label: 'Emparejamiento',
                order: 3,
                isActive: true,
                component: 'Matching',
                // items: x.items,
              },
              'error-identification': {
                label: 'Identificación de Errores',
                order: 4,
                isActive: true,
                component: 'ErrorIdentification',
                // items: x.items,
              },
              'sentence-completion': {
                label: 'Completar Oraciones',
                order: 5,
                isActive: true,
                component: 'SentenceCompletion',
                // items: x.items,
              },
              'true-or-false': {
                label: 'Verdadero o Falso',
                order: 6,
                isActive: true,
                component: 'TrueOrFalse',
                // items: x.items,
              },
            },
            order: 140,
            isActive: true,
          },
        },
      },
      intermediate: {
        label: 'Intermedio',
        explanation: 'En esta otra sección un poco más avanzados que los básicos.',
        order: 2,
        isActive: false,
      },
      advanced: {
        label: 'Avanzado',
        explanation: 'En esta sección encontrarás ejercicios para practicar los conceptos avanzados.',
        order: 3,
        isActive: false,
      },
    }
  }),
  
  actions: {
    setSelectedType(type) {
      this.selectedType = type
      this.showAnswers = false
    },
    toggleAnswers() {
      this.showAnswers = !this.showAnswers
    },
    getExercisesByLevel(level) {
      return this.exercises[level] || {}
    }
  }
})
