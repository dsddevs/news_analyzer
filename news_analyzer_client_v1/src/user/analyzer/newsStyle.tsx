export const newsStyle = {
    // Стили для поисковой строки
    searchBase: `mt-24 flex justify-center items-center relative  w-full transform hover:scale-[1.01] transition-all duration-300`,
    searchDiv: `absolute inset-y-0 start-0 flex items-center ps-4 pointer-events-none`,
    searchIcon: `text-white w-5 h-5`,
    searchInput: `block w-full p-4 ps-12 text-base text-gray-800 
    border-2 border-indigo-100 rounded-xl
    bg-white/90 backdrop-blur-sm
    focus:ring-4 focus:ring-indigo-200 focus:border-indigo-400
    transition-all duration-300 outline-none
    dark:bg-indigo-800 dark:border-gray-700 dark:text-gray-100`,
    searchBtn: `absolute end-3 bottom-3 
    bg-gradient-to-r from-indigo-600 to-indigo-800
    hover:from-indigo-500 hover:to-indigo-700
    text-white font-semibold rounded-lg px-6 py-2
    transform hover:scale-105 transition-all duration-300
    shadow-lg hover:shadow-xl`,

    // Стили для страницы
    pageBase: `min-h-screen bg-gradient-to-b from-gray-900 via-indigo-900 to-gray-900
    flex justify-center items-center p-6`,
    pageDiv: `container mx-auto max-w-7xl space-y-16 py-8`,
    page: `bg-indigo-900 backdrop-blur-lg rounded-2xl p-8 
    shadow-2xl space-y-12 border border-white/20`,

    // Стили для секций
    topicDiv: `grid grid-cols-1 md:grid-cols-3 gap-8 text-white`,
    countDiv: `grid grid-cols-1 md:grid-cols-3 gap-8`,
    duplicatedWordsDiv: `bg-white/5 backdrop-blur-md rounded-2xl p-8 
    border border-white/10 shadow-lg space-y-6
    transform hover:scale-[1.01] transition-all duration-300`,

    // Стили для карточек слов
    wordCard: `bg-white/10 backdrop-blur-sm rounded-lg p-4
    border border-white/20 shadow-lg
    transform hover:scale-105 transition-all duration-300
    hover:bg-white/20`,

    // Дополнительные стили
    sectionTitle: `text-2xl font-bold text-white/90 mb-6`,
    errorMessage: `text-red-400 bg-red-900/20 rounded-lg p-4 
    border border-red-500/20 text-center`,
    loadingSpinner: `animate-spin text-indigo-500 w-6 h-6`,

    // Стили кнопки
    loaderDiv: `flex items-center`,
    loader: `w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2`
}