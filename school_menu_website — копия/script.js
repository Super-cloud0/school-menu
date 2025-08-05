document.addEventListener('DOMContentLoaded', () => {
    // Код для бургер-меню
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
        });
    }

    // --- ОБНОВЛЕННЫЙ КОД ДЛЯ АВТОМАТИЧЕСКОЙ ГЕНЕРАЦИИ ДАТ И ВЫДЕЛЕНИЯ ТЕКУЩЕГО ДНЯ ---

    const daysOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const today = new Date(); // Получаем текущую дату
    const currentDayOfWeek = today.getDay(); // 0 (Воскресенье) - 6 (Суббота)

    // Определяем дату понедельника текущей недели
    // Если сегодня воскресенье (0), мы хотим начать с понедельника *предыдущей* недели.
    // Если сегодня понедельник (1), мы начинаем с сегодняшнего дня.
    // Для других дней недели (вт-сб), отсчитываем назад до понедельника этой недели.
    const mondayOfCurrentWeek = new Date(today);
    let daysToSubtractForMonday;

    if (currentDayOfWeek === 0) { // Если сегодня воскресенье
        daysToSubtractForMonday = 6; // Отнимаем 6 дней, чтобы получить понедельник *прошлой* недели
    } else { // Если любой другой день (с понедельника по субботу)
        daysToSubtractForMonday = currentDayOfWeek - 1; // Отнимаем (текущий день - 1), чтобы получить понедельник этой недели
    }
    mondayOfCurrentWeek.setDate(today.getDate() - daysToSubtractForMonday);


    // Обновляем даты для каждого дня в таблице
    // Начинаем с понедельника, затем вторник, среда... воскресенье
    daysOfWeek.forEach((dayId, index) => {
        const rowElement = document.getElementById(dayId);
        if (rowElement) {
            const dateElement = rowElement.querySelector('.menu-date');
            if (dateElement) {
                const dayDate = new Date(mondayOfCurrentWeek);
                
                // Чтобы дни недели шли в порядке: Понедельник, Вторник, ..., Воскресенье.
                // Если `index` это 0 (для 'sunday'), то это будет дата понедельника + 6 дней.
                // Если `index` это 1 (для 'monday'), то это будет дата понедельника + 0 дней (сам понедельник).
                // ... и так далее.
                let daysToAdd = index - 1; // Для понедельника (index 1) будет 0, для воскресенья (index 0) будет -1
                if (index === 0) { // Если это воскресенье, то нам нужно взять дату следующего воскресенья после понедельника
                    daysToAdd = 6;
                } else {
                    daysToAdd = index - 1; // Для понедельника 0, для вторника 1, и т.д.
                }

                const actualDateForDay = new Date(mondayOfCurrentWeek);
                actualDateForDay.setDate(mondayOfCurrentWeek.getDate() + daysToAdd);

                // Форматируем дату в DD.MM.YYYY
                const formattedDate = actualDateForDay.toLocaleDateString('ru-RU', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                });
                dateElement.textContent = `(${formattedDate})`;
            }
        }
    });


    // Выделение текущего дня
    const todayId = daysOfWeek[currentDayOfWeek];
    const todayRow = document.getElementById(todayId);

    if (todayRow) {
        // Удаляем класс 'today' со всех строк на случай, если он был добавлен ранее
        document.querySelectorAll('table tbody tr').forEach(row => {
            row.classList.remove('today');
        });
        // Добавляем класс 'today' к строке текущего дня
        todayRow.classList.add('today');
    }
});