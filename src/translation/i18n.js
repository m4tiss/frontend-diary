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
      },
      run: {},
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
          sets: "Serie",
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
      },
      run: {},
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
          sets: "Sets",
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
