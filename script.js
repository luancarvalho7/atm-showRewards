const prizes = [
    { "prizename": "desafio", "imageurl": "https://i.postimg.cc/rmF5WZLC/mountain.png" },
    { "prizename": "framework", "imageurl": "https://i.postimg.cc/zBtKkwzm/engine.png" },
    { "prizename": "growth", "imageurl": "https://i.postimg.cc/cJWR149z/growth.png" },
    { "prizename": "steps", "imageurl": "https://i.postimg.cc/JhQbsVSz/steps.png" },
    { "prizename": "leis", "imageurl": "https://i.postimg.cc/KvKrJW30/desafio.png" }
];

// Get the user id from the URL
const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('id');

// Fetch rewards from the API
const fetchRewards = async () => {
    try {
        console.log(`Fetching rewards for user ID: ${userId}`); // Debugging line
        const response = await fetch(`https://n8nwebhook.iatom.site/webhook/fa920083-ed96-425c-85a7-f102cb1d2e32/meusPremios/${userId}`);
        const data = await response.json();
        console.log("API Response: ", data); // Debugging line
        return data.data.data;
    } catch (error) {
        console.error('Error fetching rewards:', error);
    }
}

// Function to display rewards on the first page
const displayRewards = async () => {
    const rewards = await fetchRewards();
    if (!rewards) {
        console.error('No rewards found!');
        return;
    }
    
    const rewardsList = document.getElementById('rewards-list');
    rewards.forEach(reward => {
        const prizeIcon = prizes.find(prize => prize.prizename === reward.reward).imageurl;
        const rewardItem = document.createElement('div');
        rewardItem.className = 'reward-item';
        rewardItem.innerHTML = `
            <img src="${prizeIcon}" alt="Reward Icon">
            <span>${reward.title}</span>
        `;
        rewardItem.onclick = () => {
            console.log("Reward clicked: ", reward.title); // Debugging line
            showRewardDetail(reward.html);
        };
        rewardsList.appendChild(rewardItem);
    });
}

// Function to show reward details and hide the rewards list
const showRewardDetail = (htmlContent) => {
    console.log("Displaying reward details"); // Debugging line
    document.getElementById('rewards-page').classList.add('hidden');
    document.getElementById('rewards-page').classList.remove('active');
    document.getElementById('reward-detail-page').classList.remove('hidden');
    document.getElementById('reward-content').innerHTML = htmlContent;
}

// Go back to the rewards list
document.getElementById('back-btn').onclick = () => {
    console.log("Back to reward list"); // Debugging line
    document.getElementById('rewards-page').classList.remove('hidden');
    document.getElementById('reward-detail-page').classList.add('hidden');
}

// Initialize the rewards list when the page loads
displayRewards();
