<script setup lang="ts">
import { ref } from "vue";

const nombres = [
  "Carlos",
  "María",
  "Juan",
  "Ana",
  "Luis",
  "Sofía",
  "Miguel",
  "Valentina",
  "Diego",
  "Camila",
];

const nombre = nombres[Math.floor(Math.random() * nombres.length)];

const mostrarSaldo = ref(true);
const menuAbierto = ref(false);

const movimientos = [
  {
    nombre: "Supermercado HEB",
    fecha: "Hoy, 10:30 AM",
    monto: "-$450.00",
    tipo: "gasto",
  },
  {
    nombre: "Transferencia recibida",
    fecha: "Ayer, 5:20 PM",
    monto: "+$2,500.00",
    tipo: "ingreso",
  },
  {
    nombre: "Netflix",
    fecha: "12 Sep, 8:00 AM",
    monto: "-$219.00",
    tipo: "gasto",
  },
  {
    nombre: "Pago de nómina",
    fecha: "10 Sep, 9:00 AM",
    monto: "+$8,000.00",
    tipo: "ingreso",
  },
];
</script>

<template>
  <div class="min-h-screen bg-slate-100 pb-20 text-slate-800 lg:pb-0">
    <!-- Barra superior -->
    <header
      class="relative top-0 z-40 flex items-center justify-between px-4 py-4"
    >
      <h1 class="text-xl font-bold text-blue-700 sm:text-2xl">
        Sentinel
      </h1>

      <div
        class="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-bold text-white"
      >
        {{ nombre.charAt(0) }}
      </div>
    </header>

    <!-- Fondo del menú móvil -->
    <div
      v-if="menuAbierto"
      @click="menuAbierto = false"
      class="fixed inset-0 z-40 bg-black/40 lg:hidden"
    ></div>

    <!-- Contenido -->
    <main class="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
      <!-- Bienvenida -->
      <section class="mb-6 sm:mb-8">
        <p class="text-sm text-slate-500">
          {{
            new Date().toLocaleDateString("es-MX", {
              weekday: "long",
              day: "numeric",
              month: "long",
            })
          }}
        </p>

        <h2 class="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">
          ¡Hola, {{ nombre }}! 👋
        </h2>

        <p class="mt-2 text-sm text-slate-500 sm:text-base">
          Revisa el estado de tus finanzas.
        </p>
      </section>

      <!-- Tarjetas de resumen -->
      <section
        class="grid gap-4 sm:gap-6 md:grid-cols-2 xl:grid-cols-3"
      >
        <!-- Saldo -->
        <div
          class="rounded-2xl bg-blue-600 p-5 text-white shadow-lg sm:p-6"
        >
          <div class="flex items-center justify-between gap-2">
            <p class="text-sm text-blue-100">
              Saldo disponible
            </p>

            <button
              @click="mostrarSaldo = !mostrarSaldo"
              class="rounded-lg bg-blue-500 px-2 py-1 text-xs hover:bg-blue-400 sm:px-3 sm:text-sm"
            >
              {{ mostrarSaldo ? "Ocultar" : "Mostrar" }}
            </button>
          </div>

          <h3
            class="mt-4 break-all text-3xl font-bold sm:text-4xl"
          >
            {{ mostrarSaldo ? "$0.00" : "••••••••" }}
          </h3>

          <p class="mt-2 text-sm text-blue-100">
            Cuenta de débito •••• 4582
          </p>

          <div class="mt-6 flex justify-between text-sm">
            <span>Cuenta principal</span>
            <span>MXN</span>
          </div>
        </div>

        <!-- Acciones rápidas -->
        <div
          class="rounded-2xl bg-white p-5 shadow-sm sm:p-6"
        >
          <h3
            class="mb-6 text-lg font-bold text-slate-900 sm:text-xl"
          >
            Acciones rápidas
          </h3>

          <div class="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <!-- Transferir -->
            <button
              class="rounded-xl bg-blue-50 p-4 text-blue-700 hover:bg-blue-100"
            >
              <span class="block text-2xl">💸</span>

              <span
                class="mt-2 block text-center text-sm font-semibold"
              >
                Transferir
              </span>
            </button>

            <!-- Pagar -->
            <button
              class="rounded-xl bg-purple-50 p-4 text-purple-700 hover:bg-purple-100"
            >
              <span class="block text-2xl">💳</span>

              <span
                class="mt-2 block text-center text-sm font-semibold"
              >
                Pagar
              </span>
            </button>

            <!-- Depositar -->
            <button
              class="rounded-xl bg-emerald-50 p-4 text-emerald-700 hover:bg-emerald-100"
            >
              <span class="block text-2xl">📥</span>

              <span
                class="mt-2 block text-center text-sm font-semibold"
              >
                Depositar
              </span>
            </button>

            <!-- Estadísticas -->
            <button
              class="rounded-xl bg-orange-50 p-4 text-orange-700 hover:bg-orange-100"
            >
              <span class="block text-2xl">📊</span>

              <span
                class="mt-2 block text-center text-sm font-semibold"
              >
                Estadísticas
              </span>
            </button>
          </div>
        </div>
      </section>

      <!-- Movimientos -->
      <section
        class="mt-6 grid gap-4 sm:mt-8 sm:gap-6 xl:grid-cols-3"
      >
        <div
          class="min-w-0 rounded-2xl bg-white p-5 shadow-sm sm:p-6 xl:col-span-2"
        >
          <div
            class="mb-6 flex items-center justify-between gap-3"
          >
            <h3
              class="text-lg font-bold text-slate-900 sm:text-xl"
            >
              Movimientos recientes
            </h3>

            <button
              class="shrink-0 text-sm font-semibold text-blue-600"
              @click="$router.push('/movimientos')"
            >
              Ver todos
            </button>
          </div>

          <div class="space-y-5">
            <div
              v-for="(movimiento, index) in movimientos"
              :key="index"
              class="flex min-w-0 items-center justify-between gap-3 border-b border-slate-100 pb-4 last:border-0"
            >
              <div
                class="flex min-w-0 items-center gap-3"
              >
                <!-- Icono del movimiento -->
                <div
                  class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-lg sm:h-11 sm:w-11"
                  :class="
                    movimiento.tipo === 'ingreso'
                      ? 'bg-emerald-100'
                      : 'bg-rose-100'
                  "
                >
                  {{
                    movimiento.tipo === "ingreso"
                      ? "↓"
                      : "↑"
                  }}
                </div>

                <!-- Información -->
                <div class="min-w-0">
                  <p
                    class="truncate text-sm font-semibold text-slate-800 sm:text-base"
                  >
                    {{ movimiento.nombre }}
                  </p>

                  <p class="text-xs text-slate-400 sm:text-sm">
                    {{ movimiento.fecha }}
                  </p>
                </div>
              </div>

              <!-- Monto -->
              <p
                class="shrink-0 text-sm font-bold sm:text-base"
                :class="
                  movimiento.tipo === 'ingreso'
                    ? 'text-emerald-600'
                    : 'text-rose-600'
                "
              >
                {{ movimiento.monto }}
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Footer -->
      <footer
        class="mt-8 pb-4 text-center text-sm text-slate-400 sm:mt-10"
      >
        © 2026 NovaBank · Proyecto demostrativo
      </footer>
    </main>

    <!-- Navegación inferior móvil -->

  </div>
</template>