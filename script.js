document.addEventListener('DOMContentLoaded', () => {
  const addToCartButtons = document.querySelectorAll('.product button');
  addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
      alert('Added to cart!');
    });
  });
});
