// =======================================
// EduPath Layout Loader
// =======================================

async function loadComponent(id, file) {

    const element = document.getElementById(id);

    if (!element) return;

    try {

        const response = await fetch(file);

        element.innerHTML = await response.text();

    } catch (error) {

        console.error(`Cannot load ${file}`, error);

    }

}

document.addEventListener("DOMContentLoaded", async () => {

    await loadComponent("sidebar-container", "components/sidebar.html");

    await loadComponent("topbar-container", "components/topbar.html");

});