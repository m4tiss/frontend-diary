import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
  pl: {
    translation: {
      shared: {
        navbar: {
          lightMode: "Tryb dzienny",
          nightMode: "Tryb nocny",
          logIn: "Zaloguj się",
          logout: "Wyloguj",
        },
        friends: {
          friends: "Znajomi",
          addFriend: "Dodaj znajomego",
          joinedPlatform: "Dołączył do platformy",
          usersToInvite: "Użytkownicy do zaproszenia",
          pendingUsers: "Oczekujący użytkownicy",
          noFriends: "Brak znajomych do wyświetlenia",
          noPending: "Brak oczekujących użytkowników do wyświetlenia",
          sendInvitation: "Wyślij zaproszenie",
          newFriend: "Szukaj użytkowników",
          invitationText: "chce być twoim znajomym. Akceptujesz?",
          accept: "Akceptuj",
          reject: "Odrzuć",
        },
        profile: {
          removeFriend: "Usuń znajomego",
          daysOnPlatform: "Dni na platformie",
          birth: "Data urodzenia",
        },
        actions: {
          delete: "Usuń",
          edit: "Edytuj",
          close: "Zamknij",
          add:"Dodaj"
        },
        login: {
          loginTitle: "Logowanie",
          loginButton: "Zaloguj",
          email: "Email",
          password: "Hasło",
          noAccount: "Nie mam jeszcze konta",

          users: "Użytkowników na platformie",
          backgroundText: "TRENUJ I BIEGAJ",
        },
        register: {
          registerTitle: "Rejestracja",
          registerButton: "Zarejestruj",
          email: "Email",
          password: "Hasło",
          account: "Mam już konto",
          birth: "Data urodzenia",
          profilePhoto: " Zdjęcie profilowe",
          nickname: "Nick",
          description: "Opis",
          noFile: "Brak pliku",
        },
        chart: {
          run: "Bieganie",
          gym: "Trening siłowy",
          trainings: "Treningi",
          months: "Miesiące",
          workouts: "Treningi w ostatnich miesiącach",
        },
      },
      run: {
        general: {
          averagePulse: "Średnie tętno",
          distance: "Dystans",
          duration: "Czas trwania",
          rating: "Ocena",
          note: "Notatka",
          type: "Typ",
          trainings: "Treningi",
          category: "Kategorie",
        },
        dashboard: {
          title: "BIEGAJ CODZIENNIE",
          description:
            "Bieganie to nie tylko doskonały sposób na poprawę kondycji, ale również na zrelaksowanie umysłu. Każdy krok, który robisz, wzmacnia Twoje ciało, zwiększa wydolność serca i poprawia nastrój. Niezależnie od tego, czy biegasz dla zdrowia, formy, czy po prostu dla przyjemności, regularne bieganie przyczynia się do poprawy ogólnego samopoczucia. Nie potrzebujesz specjalistycznego sprzętu – wystarczy para wygodnych butów i trochę motywacji. Zrób pierwszy krok i dołącz do grona tych, którzy odkryli radość płynącą z biegania!",
          newTraining: "Nowy trening",
          historyTraining: "Historia treningów",
          stats: "Statystyki",
          friends: "Znajomi",
        },
        profile: {
          showRecords: "Zobacz rekordy",
          addCategory: "Dodaj kategorię",
          showAchievements: "Zobacz osiągnięcia",
          addNewGoal: "Dodaj nowy cel",
          showGoals: "Zobacz cele",
          removeRoutine: "Usuń rutynę",
          allTrainings: "Wszystkie treningi",
          daysWithUs: "Dni z nami",
          email: "Email",
          birth: "Data urodzenia",
          social: "Społeczność"
        },
        historyTraining: {
          filtration: "Filtracja",
          category: "Kategoria",
          noTrainings: "Brak dostępnych treningów",
          addTraining: "Dodaj trening",
          all: "Wszytskie",
          loadMore: "Załaduj więcej",
        },
        newTraining: {
          doTraining: "Zrób trening",
        },
        goals: {
          title: "Osiągnij swoje cele biegowe",
          description:
            "Odkryj swój pełny potencjał jako biegacz dzięki naszemu przewodnikowi po osiąganiu celów biegowych. Niezależnie od tego, czy dążysz do ukończenia pierwszego 5K, pokonania maratonu, czy poprawy swojego rekordu życiowego, ten przewodnik dostarcza narzędzi i strategii, których potrzebujesz. Dowiedz się, jak stworzyć skuteczny plan treningowy, utrzymać motywację i z pewnością pokonywać wyzwania. Pełen porad ekspertów, inspirujących historii i praktycznych wskazówek, ten przewodnik pomoże ci przekroczyć linię mety i świętować swoje biegowe osiągnięcia. Zrób pierwszy krok w kierunku swojego sukcesu biegowego już dziś!",
          createdDate: "Data utworzenia: ",
          finishDate: "Data zakończenia: ",
          noGoals: "Brak dostępnych celów do wyświetlenia",
          addGoal: "Dodaj nowe cele",
          completed: "Zakończony",
          notCompleted: "Niezakończony",
          inProgress: "W trakcie",
          dayLeft: "DZIEŃ POZOSTAŁ",
          daysLeft: "DNI POZOSTAŁO",
        },
        records: {
          personalRecords: "Rekordy personalne",
          longestDistance: "Najdłuższy dystans",
          highestAveragePulse: "Najwyższe średnie tętno",
          longestTraining: "Najdłuższy trening",
        },
        stats: {
          personalStats: "Statystyki osobiste",
          totalDistance: "Łączny dystans",
          averageRating: "Średnia ocena",
          averagePulse: "Średnie tętno",
          totalTime: "Łączny czas",
          week: "Tydzień",
          month: "Miesiąć",
          year: "Rok",
          all: "Wszystko",
        },
        chart: {
          noData: "Brak dostępnych danych",
          averagePulseTitle: "Średnie tętna z niedawnych treningów",
          distanceTitle: "Dystans z ostatnich treningów",
          durationTitle: "Czas trwania ostatnich treningów",
          ratingTitle: "Histogram ocen treningów",
          runTypesTitle: "Rodzaje biegów podczas ostatnich treningów",
        },
      },
      gym: {
        general: {
          page: "Strona",
          next: "Następna",
          previous: "Poprzednia",
          reps: "Powtórzenia",
          weight: "Ciężar",
          volume: "Objętość",
          duration: "Czas trwania",
          rating: "Ocena",
          note: "Notatka",
          sets: "Serie",
          workouts: "Treningi",
          muscles: "Grupy mięśni",
          date: "Data",
          select:"Wybierz ćwiczenie"
        },
        profile: {
          showRecords: "Zobacz rekordy",
          addRoutine: "Dodaj rutynę",
          showAchievements: "Zobacz osiągnięcia",
          addNewGoal: "Dodaj nowy cel",
          showGoals: "Zobacz cele",
          removeRoutine: "Usuń rutynę",
          allTrainings: "Wszystkie treningi",
          daysWithUs: "Dni z nami",
          email: "Email",
          birth: "Data urodzenia",
          social: "Społeczność"
        },
        dashboard: {
          title: "TRENUJ CODZIENNIE",
          description:
            "Codzienne treningi to nie tylko sposób na poprawę sylwetki, ale przede wszystkim na utrzymanie zdrowego stylu życia. Trenując regularnie, wzmacniasz swoje ciało, zwiększasz wytrzymałość i poprawiasz samopoczucie. Niezależnie od tego, czy jesteś początkujący, czy zaawansowany, każdy dzień treningu przybliża Cię do osiągnięcia wymarzonych wyników. Zbuduj nawyk, który zmieni Twoje życie i ciesz się korzyściami, jakie niesie aktywność!",
          newTraining: "Nowy trening",
          historyTraining: "Historia treningów",
          stats: "Statystyki",
          friends: "Znajomi",
        },
        historyTraining: {
          filtration: "Filtracja",
          category: "Kategoria",
          noTrainings: "Brak dostępnych treningów",
          addTraining: "Dodaj trening",
          all: "Wszytskie",
          loadMore: "Załaduj więcej",
        },
        newTraining: {
          plannedWorkout: "Planowany trening",
          quickWorkout: "Szybki trening",
          doWorkout: "Zrób trening",
          avaiableExercises: "Dostępne Ćwiczenia",
          selectedExercises: "Wybrane Ćwiczenia",
          noExercises: "Brak wybranych ćwiczeń",
          searchExercise: "Wyszukaj ćwiczenie",
          nextStep: "Następny krok",
          summary: "Podsumowanie",
          addSet: "Dodaj serię",
          removeSet: "Usuń serię",
          saveWorkout: "Zapisz trening",
          notePlaceholder: "Najlepszy trening w życiu...",
        },
        chart: {
          noData: "Brak danych do wyświetlenia",
          durationTitle: "Czas trwania ostatnich treningów",
          muscleUsed: "Zaangażowane grupy mięśniowe",
          rating: "Histogram ocen treningów",
          setsTitle: "Ilość serii w ostatnich treningach",
          volumeTitle: "Objętość w ostatnich treningach",
          mostReps: "Najwięcej powtórzeń w serii",
          heaviestWeight: "Najcięższy ciężar w serii",
        },
        stats: {
          personalStats: "Statystyki osobiste",
          totalVolume: "Łączna objętość",
          workoutSessions: "Sesje treningowe",
          totalSets: "Łączna liczba serii",
          totalTime: "Łączny czas",
          week: "Tydzień",
          month: "Miesiąć",
          year: "Rok",
          all: "Wszystko",
        },
        routine: {
          newRoutine: "Stwórz nową rutynę",
          name: "Nazwa rutyny",
          save: "Zapisz rutynę",
          avaiableExercises: "Dostępne Ćwiczenia",
          selectedExercises: "Wybrane Ćwiczenia",
          noExercises: "Brak wybranych ćwiczeń",
          searchExercise: "Wyszukaj ćwiczenie",
        },
      },
    },
  },
  gb: {
    translation: {
      shared: {
        navbar: {
          lightMode: "Light Mode",
          nightMode: "Night Mode",
          logIn: "Log In",
          logout: "Logout",
        },
        friends: {
          friends: "Friends",
          addFriend: "Add Friend",
          joinedPlatform: "Joined platform",
          usersToInvite: "Users To Invite",
          pendingUsers: "Pending Users",
          noFriends: "No friends available to display",
          noPending: "No pending users available to display",
          sendInvitation: "Send invitation",
          newFriend: "Search users",
          invitationText: "want to be your friend. Do you accept?",
          accept: "Accept",
          reject: "Reject",
        },
        profile: {
          removeFriend: "Remove Friend",
          daysOnPlatform: "Days on platform",
          birth: "Birth date",
        },
        actions: {
          delete: "Delete",
          edit: "Edit",
          close: "Close",
          add:"Add"

        },
        login: {
          loginTitle: "Login",
          loginButton: "Login",
          email: "Email",
          password: "Password",
          noAccount: "I have no account",
          users: "Users on our <br/> platform",
          backgroundText: "TRAIN AND RUN",
        },
        register: {
          registerTitle: "Register",
          registerButton: "Register",
          email: "Email",
          password: "Password",
          account: "I have an account",
          birth: "Birth date",
          profilePhoto: " Profile photo",
          nickname: "Nickname",
          description: "Description",
          noFile: "No file",
        },
        chart: {
          run: "Run",
          gym: "Gym",
          trainings: "Trainings",
          months: "Months",
          workouts: "Trainings in recent months",
        },
      },
      run: {
        general: {
          averagePulse: "Average pulse",
          distance: "Distance",
          duration: "Duration",
          rating: "Rating",
          note: "Note",
          type: "Type",
          trainings: "Trainings",
          category: "Categories",
        },
        dashboard: {
          title: "RUN EVERYDAY",
          description:
            "Running is not only a great way to improve your fitness, but also to relax your mind. Every step you take strengthens your body, boosts your heart’s performance, and lifts your mood. Whether you run for health, fitness, or simply for enjoyment, regular running contributes to overall well-being. You don’t need specialized equipment – just a comfortable pair of shoes and some motivation. Take the first step and join those who have discovered the joy of running!",
          newTraining: "New training",
          historyTraining: "History training",
          stats: "Stats",
          friends: "Friends",
        },
        profile: {
          showRecords: "Show records",
          addCategory: "Add category",
          showAchievements: "Show achievements",
          addNewGoal: "Add new goal",
          showGoals: "Show goals",
          removeRoutine: "Remove routine",
          allTrainings: "All workouts",
          daysWithUs: "Days with us",
          email: "Email",
          birth: "Date of birth",
          social: "Social"
        },
        historyTraining: {
          filtration: "Filtration",
          category: "Category",
          title: "Regular strength training",
          description:
            "Regular strength training is essential for improving physical fitness and health. It strengthens muscles, enhances bone density, and supports metabolism. Consistent exercise boosts overall endurance, helps maintain a healthy weight, and reduces the risk of various diseases. A well-balanced workout plan should include a variety of exercises to engage all muscle groups and ensure balanced development.",
          noTrainings: "No available trainings",
          addTraining: "Add training",
          all: "All",
          loadMore: "Load more",
        },
        newTraining: {
          doTraining: "Do training",
        },
        goals: {
          title: "Achieve Your Running Goals",
          description:
            "Unlock your full potential as a runner with our ultimate guide to achieving your running goals. Whether you're aiming to complete your first 5K, conquer a marathon, or improve your personal best, this guide provides you with the tools and strategies you need. Learn how to create an effective training plan, stay motivated, and overcome challenges with confidence. Packed with expert advice, inspiring stories, and practical tips, this guide will help you cross the finish line and celebrate your running achievements. Take the first step towards your running success today!",
          createdDate: "Created Date: ",
          finishDate: "Finish Date: ",
          noGoals: "No goals available to display",
          addGoal: "Add new goals",
          completed: "Completed",
          notCompleted: "Not Completed",
          inProgress: "In Progress",
          dayLeft: "DAY LEFT",
          daysLeft: "DAYS LEFT",
        },
        records: {
          personalRecords: "Personal Records",
          longestDistance: "Longest Distance",
          highestAveragePulse: "Highest Average Pulse",
          longestTraining: "Longest Training",
        },
        stats: {
          personalStats: "Personal Stats",
          totalDistance: "Total Distance",
          averageRating: "Average Rating",
          averagePulse: "Average Pulse",
          totalTime: "Total Time",
          week: "Week",
          month: "Month",
          year: "Year",
          all: "All",
        },
        chart: {
          noData: "No data available",
          averagePulseTitle: "Average heart rates from recent workouts",
          distanceTitle: "Distance from recent workouts",
          durationTitle: "Duration of Recent Workouts",
          ratingTitle: "Training Ratings Histogram",
          runTypesTitle: "Types of runs during recent workouts",
        },
      },
      gym: {
        general: {
          page: "Page",
          next: "Next",
          previous: "Previous",
          reps: "Reps",
          weight: "Weight",
          volume: "Volume",
          duration: "Duration",
          rating: "Rating",
          note: "Note",
          sets: "Sets",
          workouts: "Workouts",
          muscles: "Muscle used",
          date: "Date",
          select:"Select exercise"
        },
        profile: {
          showRecords: "Show records",
          addRoutine: "Add routine",
          showAchievements: "Show achievements",
          addNewGoal: "Add new goal",
          showGoals: "Show goals",
          removeRoutine: "Remove routine",
          allTrainings: "All workouts",
          daysWithUs: "Days with us",
          email: "Email",
          birth: "Date of birth",
          social: "Social"
        },
        dashboard: {
          title: "TRAINING EVERYDAY",
          description:
            "Daily workouts are not just a way to improve your physique, but also to maintain a healthy lifestyle. By training regularly, you strengthen your body, boost endurance, and enhance your overall well-being. Whether you're a beginner or advanced, each day of training brings you closer to achieving your dream results. Build a habit that transforms your life and enjoy the benefits of daily activity!",
          newTraining: "New training",
          historyTraining: "History training",
          stats: "Stats",
          friends: "Friends",
        },
        historyTraining: {
          filtration: "Filtration",
          category: "Category",
          title: "Regular strength training",
          description:
            "Regular strength training is essential for improving physical fitness and health. It strengthens muscles, enhances bone density, and supports metabolism. Consistent exercise boosts overall endurance, helps maintain a healthy weight, and reduces the risk of various diseases. A well-balanced workout plan should include a variety of exercises to engage all muscle groups and ensure balanced development.",
          noTrainings: "No available trainings",
          addTraining: "Add training",
          all: "All",
          loadMore: "Load more",
        },
        newTraining: {
          plannedWorkout: "Planned Workout",
          quickWorkout: "Quick Workout",
          doWorkout: "Do Workout",
          avaiableExercises: "Avaiable Exercises",
          selectedExercises: "Selected Exercises",
          noExercises: "No exercises selected",
          searchExercise: "Search exercise",
          nextStep: "Next step",
          summary: "Summary",
          addSet: "Add set",
          removeSet: "Remove set",
          saveWorkout: "Save workout",
          notePlaceholder: "Best run ever...",
        },
        chart: {
          noData: "No Data to Display",
          durationTitle: "Duration of Recent Workouts",
          muscleUsed: "Muscle Groups Used",
          rating: "Training Ratings Histogram",
          setsTitle: "Number of Sets in Recent Workouts",
          volumeTitle: "Volume in Recent Workouts",
          mostReps: "Most Reps in a Set",
          heaviestWeight: "Heaviest Weight in a Set",
        },
        stats: {
          personalStats: "Personal Stats",
          totalVolume: "Total Volume",
          workoutSessions: "Workout Sessions",
          totalSets: "Total Sets",
          totalTime: "Total Time",
          week: "Week",
          month: "Month",
          year: "Year",
          all: "All",
        },
        routine: {
          newRoutine: "Create new routine",
          name: "Routine name",
          save: "Save routine",
          avaiableExercises: "Avaiable Exercises",
          selectedExercises: "Selected Exercises",
          noExercises: "No exercises selected",
          searchExercise: "Search exercise",
        },
      },
    },
  },
};

const localStorageKey = "selectedLanguage";

const getDefaultLanguage = () => {
  const selectedLanguage = localStorage.getItem(localStorageKey);
  if (selectedLanguage) {
    return selectedLanguage;
  } else {
    return "pl";
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    lng: getDefaultLanguage(),
    interpolation: {
      escapeValue: false,
    },
    resources,
  });

export const setLanguage = (language) => {
  i18n.changeLanguage(language);
  localStorage.setItem(localStorageKey, language);
};

export default i18n;
