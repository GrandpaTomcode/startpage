document.addEventListener('DOMContentLoaded', () => {
    
    const greetingText = document.getElementById('greeting');
    var date = new Date();
    var time = date.getHours();

    var getCurrentGreeting = () => {
        const currentHour = new Date().getHours();

        if (currentHour >= 5 && currentHour < 12) {
            return 'Good Morning, Tom!';
        } else if (currentHour >= 12 && currentHour < 18) {
            return 'Good Afternoon, Tom!';
        } else {
            return 'Good Evening, Tom!';
        }
    }

    var updateGreeting = () => {
        const greeting = getCurrentGreeting();
        greetingText.textContent = greeting;
    }

    updateGreeting();
    setInterval(updateGreeting, 60000);

});

