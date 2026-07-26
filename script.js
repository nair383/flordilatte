// Filtro por categorías con control de estado activo
function filterCategory(category, pillElement) {
    document.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
    pillElement.classList.add('active');

    const cards = document.querySelectorAll('.food-card');
    cards.forEach(card => {
        const cardCat = card.getAttribute('data-category');
        if (category === 'all' || cardCat === category) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
}

// Búsqueda instantánea reactiva
function liveFilter() {
    const query = document.getElementById('liveSearch').value.toLowerCase().trim();
    const cards = document.querySelectorAll('.food-card');

    cards.forEach(card => {
        const name = card.getAttribute('data-name');
        const desc = card.querySelector('.food-details').textContent.toLowerCase();

        if (name.includes(query) || desc.includes(query) || query === '') {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
}

// Lógica de cálculo dinámico para el pedido por WhatsApp
let itemCount = 1;
function updatePeople(change) {
    itemCount += change;
    if (itemCount < 1) itemCount = 1;
    if (itemCount > 20) itemCount = 20;

    document.getElementById('peopleNum').textContent = itemCount;
    
    let totalEst = itemCount * 11100;
    document.getElementById('estimatedSum').textContent = `$${totalEst.toLocaleString('es-CL')}`;

    const textWa = encodeURIComponent(`Hola, quisiera encargar ${itemCount} pizza(s)/producto(s) en Fior Di Latte Pizzeria (Total aprox: $${totalEst.toLocaleString('es-CL')}). ¡Muchas gracias!`);
    document.getElementById('waOrderLink').href = `https://wa.me/56982172980?text=${textWa}`;
}

// Inicialización automática al cargar la interfaz
document.addEventListener('DOMContentLoaded', () => {
    updatePeople(0);
});