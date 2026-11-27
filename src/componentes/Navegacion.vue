<template>
  <header class="encabezado">
    <nav class="container navegacion" aria-label="Navegación principal">
      <RouterLink class="marca" to="/">POKÉDEX</RouterLink>
      <div class="enlaces">
        <RouterLink to="/">Inicio</RouterLink>
        <RouterLink to="/favoritos">Favoritos</RouterLink>
        <RouterLink class="btn-nav" to="/recomendador">Recomendador IA</RouterLink>
      </div>
    </nav>
  </header>
</template>
