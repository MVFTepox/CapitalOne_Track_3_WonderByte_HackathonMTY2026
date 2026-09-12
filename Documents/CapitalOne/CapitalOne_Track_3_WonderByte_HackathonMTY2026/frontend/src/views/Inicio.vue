
<script setup>
import { ref } from 'vue'

const mostrarSaldo = ref(true)
const menuAbierto = ref(false)

const movimientos = [
  {
    nombre: 'Supermercado HEB',
    fecha: 'Hoy, 10:30 AM',
    monto: '-$450.00',
    tipo: 'gasto'
  },
  {
    nombre: 'Transferencia recibida',
    fecha: 'Ayer, 5:20 PM',
    monto: '+$2,500.00',
    tipo: 'ingreso'
  },
  {
    nombre: 'Netflix',
    fecha: '12 Sep, 8:00 AM',
    monto: '-$219.00',
    tipo: 'gasto'
  },
  {
    nombre: 'Pago de nómina',
    fecha: '10 Sep, 9:00 AM',
    monto: '+$8,000.00',
    tipo: 'ingreso'
  }
]
</script>

<template>
  <div class="min-h-screen bg-slate-100 pb-20 text-slate-800 lg:pb-0">

    <!-- Barra superior -->
    <header class="sticky top-0 z-40 flex items-center justify-between bg-white px-4 py-4 shadow-sm sm:px-6">

      <div class="flex items-center gap-3">
        <!-- Botón menú móvil -->
        <button
          @click="menuAbierto = !menuAbierto"
          class="rounded-lg p-2 text-xl hover:bg-slate-100 lg:hidden"
          aria-label="Abrir menú"
        >
          ☰
        </button>

        <h1 class="text-xl font-bold text-blue-700 sm:text-2xl">
          Sentinel
        </h1>
      </div>

      <div class="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-bold text-white">
        C
      </div>
    </header>

    <!-- Fondo del menú móvil -->
    <div
      v-if="menuAbierto"
      @click="menuAbierto = false"
      class="fixed inset-0 z-40 bg-black/40 lg:hidden"
    ></div>

    <!-- Menú lateral móvil -->
    <aside
      class="fixed left-0 top-0 z-50 h-full w-72 max-w-[85vw] bg-slate-950 p-6 text-white transition-transform lg:hidden"
      :class="menuAbierto ? 'translate-x-0' : '-translate-x-full'"
    >
      <div class="mb-10 flex items-center justify-between">
        <h2 class="text-2xl font-bold text-blue-400">
          Sentinel
        </h2>

        <button
          @click="menuAbierto = false"
          class="rounded-lg px-3 py-1 text-xl hover:bg-slate-800"
          aria-label="Cerrar menú"
        >
          ✕
        </button>
      </div>

      <nav class="space-y-3">
        <a href="/inicio" class="block rounded-xl bg-blue-600 px-4 py-3">
          🏠 Inicio
        </a>

        <a href="#" class="block rounded-xl px-4 py-3 text-slate-300 hover:bg-slate-800">
          💳 Mis tarjetas
        </a>

        <a href="#" class="block rounded-xl px-4 py-3 text-slate-300 hover:bg-slate-800">
          💸 Transferencias
        </a>

        <a href="#" class="block rounded-xl px-4 py-3 text-slate-300 hover:bg-slate-800">
          📊 Finanzas
        </a>

        <a href="#" class="block rounded-xl px-4 py-3 text-slate-300 hover:bg-slate-800">
          ⚙️ Configuración
        </a>
      </nav>
    </aside>

    <!-- Contenedor general -->
    <div class="flex">

      <!-- Menú lateral escritorio -->
      <aside class="hidden min-h-[calc(100vh-73px)] w-64 shrink-0 bg-slate-950 p-6 text-white lg:block">

        <h2 class="mb-10 text-2xl font-bold text-blue-400">
          Sentinel
        </h2>

        <nav class="space-y-3">
          <a href="/inicio" class="block rounded-xl bg-blue-600 px-4 py-3">
            🏠 Inicio
          </a>

          <a href="#" class="block rounded-xl px-4 py-3 text-slate-300 hover:bg-slate-800">
            💳 Mis tarjetas
          </a>

          <a href="#" class="block rounded-xl px-4 py-3 text-slate-300 hover:bg-slate-800">
            💸 Transferencias
          </a>

          <a href="#" class="block rounded-xl px-4 py-3 text-slate-300 hover:bg-slate-800">
            📊 Finanzas
          </a>

          <a href="#" class="block rounded-xl px-4 py-3 text-slate-300 hover:bg-slate-800">
            ⚙️ Configuración
          </a>
        </nav>
      </aside>

      <!-- Contenido -->
      <main class="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">

        <!-- Bienvenida -->
        <section class="mb-6 sm:mb-8">
          <p class="text-sm text-slate-500">
            Sábado, 12 de septiembre
          </p>

          <h2 class="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">
            ¡Hola, Carlos! 👋
          </h2>

          <p class="mt-2 text-sm text-slate-500 sm:text-base">
            Revisa el estado de tus finanzas.
          </p>
        </section>

        <!-- Tarjetas de resumen -->
        <section class="grid gap-4 sm:gap-6 md:grid-cols-2 xl:grid-cols-3">

          <!-- Saldo -->
          <div class="rounded-2xl bg-blue-600 p-5 text-white shadow-lg sm:p-6">
            <div class="flex items-center justify-between gap-2">
              <p class="text-sm text-blue-100">
                Saldo disponible
              </p>

              <button
                @click="mostrarSaldo = !mostrarSaldo"
                class="rounded-lg bg-blue-500 px-2 py-1 text-xs hover:bg-blue-400 sm:px-3 sm:text-sm"
              >
                {{ mostrarSaldo ? 'Ocultar' : 'Mostrar' }}
              </button>
            </div>

            <h3 class="mt-4 break-all text-3xl font-bold sm:text-4xl">
              {{ mostrarSaldo ? '$0' : '••••••••' }}
            </h3>

            <p class="mt-2 text-sm text-blue-100">
              Cuenta de débito •••• 4582
            </p>

            <div class="mt-6 flex justify-between text-sm">
              <span>Cuenta principal</span>
              <span>MXN</span>
            </div>
          </div>

          <!-- Ingresos -->
          <div class="rounded-2xl bg-white p-5 shadow-sm sm:p-6">
            <p class="text-sm text-slate-500">
              Ingresos del mes
            </p>

            <h3 class="mt-4 text-2xl font-bold text-emerald-600 sm:text-3xl">
              +$0.00
            </h3>

            <p class="mt-3 text-sm text-slate-500">
              Aumento respecto al mes pasado
            </p>

            <div class="mt-5 h-2 rounded-full bg-slate-100">
              <div class="h-2 w-3/4 rounded-full bg-emerald-500"></div>
            </div>
          </div>

          <!-- Gastos -->
          <div class="rounded-2xl bg-white p-5 shadow-sm sm:p-6">
            <p class="text-sm text-slate-500">
              Gastos del mes
            </p>

            <h3 class="mt-4 text-2xl font-bold text-rose-600 sm:text-3xl">
              -$0.00
            </h3>

            <p class="mt-3 text-sm text-slate-500">
              Gastos registrados este mes
            </p>

            <div class="mt-5 h-2 rounded-full bg-slate-100">
              <div class="h-2 w-2/5 rounded-full bg-rose-500"></div>
            </div>
          </div>

        </section>

        <!-- Movimientos y acciones -->
        <section class="mt-6 grid gap-4 sm:mt-8 sm:gap-6 xl:grid-cols-3">

          <!-- Movimientos -->
          <div class="min-w-0 rounded-2xl bg-white p-5 shadow-sm sm:p-6 xl:col-span-2">

            <div class="mb-6 flex items-center justify-between gap-3">
              <h3 class="text-lg font-bold text-slate-900 sm:text-xl">
                Movimientos recientes
              </h3>

              <button class="shrink-0 text-sm font-semibold text-blue-600">
                Ver todos
              </button>
            </div>

            <div class="space-y-5">
              <div
                v-for="(movimiento, index) in movimientos"
                :key="index"
                class="flex min-w-0 items-center justify-between gap-3 border-b border-slate-100 pb-4 last:border-0"
              >
                <div class="flex min-w-0 items-center gap-3">
                  <div
                    class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-lg sm:h-11 sm:w-11"
                    :class="movimiento.tipo === 'ingreso'
                      ? 'bg-emerald-100'
                      : 'bg-rose-100'"
                  >
                    {{ movimiento.tipo === 'ingreso' ? '↓' : '↑' }}
                  </div>

                  <div class="min-w-0">
                    <p class="truncate text-sm font-semibold text-slate-800 sm:text-base">
                      {{ movimiento.nombre }}
                    </p>

                    <p class="text-xs text-slate-400 sm:text-sm">
                      {{ movimiento.fecha }}
                    </p>
                  </div>
                </div>

                <p
                  class="shrink-0 text-sm font-bold sm:text-base"
                  :class="movimiento.tipo === 'ingreso'
                    ? 'text-emerald-600'
                    : 'text-rose-600'"
                >
                  {{ movimiento.monto }}
                </p>
              </div>
            </div>

          </div>

          <!-- Acciones rápidas -->
          <div class="rounded-2xl bg-white p-5 shadow-sm sm:p-6">

            <h3 class="mb-6 text-lg font-bold text-slate-900 sm:text-xl">
              Acciones rápidas
            </h3>

            <div class="grid grid-cols-2 gap-3">

              <button class="rounded-xl bg-blue-50 p-4 text-blue-700 hover:bg-blue-100">
                <span class="block text-2xl">💸</span>
                <span class="mt-2 block text-sm font-semibold">
                  Transferir
                </span>
              </button>

              <button class="rounded-xl bg-purple-50 p-4 text-purple-700 hover:bg-purple-100">
                <span class="block text-2xl">💳</span>
                <span class="mt-2 block text-sm font-semibold">
                  Pagar
                </span>
              </button>

              <button class="rounded-xl bg-emerald-50 p-4 text-emerald-700 hover:bg-emerald-100">
                <span class="block text-2xl">📥</span>
                <span class="mt-2 block text-sm font-semibold">
                  Depositar
                </span>
              </button>

              <button class="rounded-xl bg-orange-50 p-4 text-orange-700 hover:bg-orange-100">
                <span class="block text-2xl">📊</span>
                <span class="mt-2 block text-sm font-semibold">
                  Estadísticas
                </span>
              </button>

            </div>
          </div>

        </section>

        <footer class="mt-8 pb-4 text-center text-sm text-slate-400 sm:mt-10">
          © 2026 NovaBank · Proyecto demostrativo
        </footer>

      </main>
    </div>

    <!-- Navegación inferior móvil -->
    <nav class="fixed bottom-0 left-0 right-0 z-30 flex justify-around border-t border-slate-200 bg-white px-2 py-2 shadow-lg lg:hidden">

      <a href="/inicio" class="flex flex-col items-center gap-1 px-3 py-1 text-blue-600">
        <span class="text-xl">🏠</span>
        <span class="text-xs font-semibold">Inicio</span>
      </a>

      <a href="#" class="flex flex-col items-center gap-1 px-3 py-1 text-slate-500">
        <span class="text-xl">💳</span>
        <span class="text-xs">Tarjetas</span>
      </a>

      <a href="#" class="flex flex-col items-center gap-1 px-3 py-1 text-slate-500">
        <span class="text-xl">💸</span>
        <span class="text-xs">Transferir</span>
      </a>

      <a href="#" class="flex flex-col items-center gap-1 px-3 py-1 text-slate-500">
        <span class="text-xl">⚙️</span>
        <span class="text-xs">Ajustes</span>
      </a>

    </nav>

  </div>
</template>