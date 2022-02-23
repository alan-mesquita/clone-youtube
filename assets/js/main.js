const API_URL = "https://clone-youtube-api-d5dmr.ondigitalocean.app/"

async function fetchData() {
    const response = await fetch(API_URL);
    const responseJson = response.json();
    return responseJson;
}

function populateCategories(categories) {
    const categoriesListUl = document.querySelector(".categories__list");
    const categoriesHtmlArray = categories.map((category, index) => {
        return `
        <li class="categories__item">
            <button class="categories__button categories__button--${index === 0 ? "active" : "disabled"}">
                ${category.name}
            </button>
        </li>
        `;
    });
    const categoriesHtml = categoriesHtmlArray.join(" ");
    categoriesListUl.insertAdjacentHTML("beforeend", categoriesHtml);
}

function populateSubscriptions(subscriptions) {
    const menuGroupListUl = document.querySelector(".menu-group__list.subscriptions")
    const subscriptionsHtmlArray = subscriptions.map((subscription, index) => {
        return `
        <li class="menu-group__item">
            <a href="${subscription.link}" class="menu-group__link">
                <img class="menu-group__icon menu-group__icon--image" src=${subscription.thumb} alt="subscription-01">
                <span class="menu-group__text">
                    ${subscription.name}
                </span>
                <span class="menu-group__alert"></span>        
            </a>
        </li>
        `;
    });
    const subscriptionHtml = subscriptionsHtmlArray.join(" ");
    menuGroupListUl.insertAdjacentHTML("beforeend", subscriptionHtml);
}

function populateMainBanner(mainBanner) {
    const bannerSection = document.querySelector("section.banner");
    bannerSection.insertAdjacentHTML("beforeend", `
        <img class="banner__image" src="${mainBanner.url}" alt="Tu contenido favorito, sin publicidad">
        <div class="banner__info">
            <img style="width:190px" class="banner__image" src="${mainBanner.logo}" alt="Youtube Premium">
            <h2 class="banner__title">
                ${mainBanner.title}
            </h2>
            <a href="#" class="banner__link">
                ${mainBanner.link}
            </a>
        </div>
    `)
}

function secondsToMinutes(totalSeconds) {
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds - minutes * 60;
    return {
        minutes,
        seconds
    }
}

function videoPublishedAgo(createdAt) {
    const now = new Date()
    const createdAtDate = new Date(createdAt);

    const dateNowTime = now.getTime();
    const createdATime = createdAtDate.getTime();

    const daysAgo = Math.floor((dateNowTime - createdATime) / (24 * 3600 * 1000));

    return daysAgo > 1 ? `${daysAgo} days ago` : `${daysAgo} day ago`
}

function transformThousandsInK(thousands) {
    const thousandsString = String(thousands);
    const thousandsLength = thousandsString.length;
    if(thousandsLength < 4) {
        return thousands
    } else {
        return thousandsString.substring(0, thousandsLength - 3);
    }
}

function populateVideos(videos) {
    
    const galleryListUl = document.querySelector(".gallery__list");
    const videosHtmlArray = videos.map(video => {

        const time = secondsToMinutes(video.seconds);

        return `
            <li class="gallery__item">
                <div class="gallery-video">
                    <div class="gallery-video__thumb">
                        <img src="${video.thumb}" alt="Lorem ipsum" class="gallery-video__image">
                        <span class="gallery-video__time">
                            ${time.minutes}:${time.seconds}
                        </span>
                    </div>
                    <div class="gallery-video__info">
                        <div class="gallery-video__block--left">
                            <img src="assets/images/gallery/video-user-avatar.png" alt="John Doe" class="gallery-video__avatar">
                        </div>
                        <div class="gallery-video__block--right">
                            <span class="gallery-video__name">
                                ${video.name}
                            </span>
                            <span class="gallery-video__name-user">
                                ${video.author}
                                ${
                                    video.verified ? 
                                    `
                                        <svg class="gallery-video__icon-check" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M6 1C3.24 1 1 3.24 1 6C1 8.76 3.24 11 6 11C8.76 11 11 8.76 11 6C11 3.24 8.76 1 6 1ZM4.96 8.965L2.485 6.49L3.51 5.465L4.96 6.915L8.635 3.24L9.66 4.265L4.96 8.965Z" fill="#727272"/>
                                        </svg>                                                
                                    ` 
                                    : ""
                                }
                            </span>
                            <span class="gallery-video__text">
                                ${transformThousandsInK(video.views)}K views • ${videoPublishedAgo(video.createdAt)}
                            </span>
                        </div>
                    </div>
                </div>
            </li>
        `
    })

    const videoHtml = videosHtmlArray.join(" ")
    
    galleryListUl.insertAdjacentHTML("beforeend", videoHtml)
}

async function main() {
    const data = await fetchData();
    populateCategories(data.categories);
    populateSubscriptions(data.subscriptions);
    populateMainBanner(data.mainBanner);
    populateVideos(data.videos);
}

main();