<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

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

const cerrarSesion = () => {
  menuAbierto.value = false;
  localStorage.clear();
  sessionStorage.clear();
  router.push('/');
};

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
      class="sticky top-0 z-40 border-b border-slate-200 bg-slate-50/90 backdrop-blur-sm"
    >
      <div class="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <h1 class="text-xl font-black text-blue-700 sm:text-2xl">
          Capital <span class="text-red-700">One</span> <span class="text-sm">Bank</span>
        </h1>

        <div class="relative z-50">
          <button
            type="button"
            @click="menuAbierto = !menuAbierto"
            class="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-indigo-700 font-bold text-white shadow-md transition hover:scale-105"
            aria-label="Abrir menú de usuario"
          >
            {{ nombre.charAt(0) }}
          </button>

          <div
            v-if="menuAbierto"
            class="absolute right-0 top-12 z-[60] w-44 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl"
          >
            <button
              type="button"
              @click="cerrarSesion"
              class="flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              <span>Salir</span>
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Contenido -->
    <main class="mx-auto max-w-6xl min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
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
          class="rounded-[28px] bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 p-5 text-white shadow-xl shadow-blue-900/15 sm:p-6"
        >
          <div class="flex items-center justify-between gap-2">
            <p class="text-sm text-blue-100">
              Saldo disponible
            </p>

            <button
              @click="mostrarSaldo = !mostrarSaldo"
              class="rounded-full bg-white/10 px-2.5 py-1 text-xs font-semibold text-white ring-1 ring-white/20 transition hover:bg-white/20 sm:px-3 sm:text-sm"
            >
              {{ mostrarSaldo ? "Ocultar" : "Mostrar" }}
            </button>
          </div>

          <h3
            class="mt-4 break-all text-3xl font-black tracking-tight sm:text-4xl"
          >
            {{ mostrarSaldo ? "$0.00" : "••••••••" }}
          </h3>

          <p class="mt-2 text-sm text-blue-100">
            Cuenta de débito •••• 4582
          </p>

          <div class="mt-6 flex justify-between rounded-2xl bg-white/10 p-3 text-sm backdrop-blur-sm">
            <span>Cuenta principal</span>
            <span>MXN</span>
          </div>
        </div>

        <!-- Acciones rápidas -->
        <div
          class="rounded-[28px] bg-white p-5 shadow-sm ring-1 ring-slate-200 sm:p-6"
        >
          <h3
            class="mb-6 text-lg font-bold text-slate-900 sm:text-xl"
          >
            Acciones rápidas
          </h3>

          <div class="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <!-- Transferir -->
            <button
              class="rounded-2xl bg-blue-50 p-4 text-blue-700 transition hover:-translate-y-0.5 hover:bg-blue-100"
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
              class="rounded-2xl bg-purple-50 p-4 text-purple-700 transition hover:-translate-y-0.5 hover:bg-purple-100"
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
              class="rounded-2xl bg-emerald-50 p-4 text-emerald-700 transition hover:-translate-y-0.5 hover:bg-emerald-100"
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
              class="rounded-2xl bg-orange-50 p-4 text-orange-700 transition hover:-translate-y-0.5 hover:bg-orange-100"
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
          class="min-w-0 rounded-[28px] bg-white p-5 shadow-sm ring-1 ring-slate-200 sm:p-6 xl:col-span-2"
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
              class="shrink-0 rounded-full bg-blue-50 px-3 py-1.5 text-sm font-semibold text-blue-700 transition hover:bg-blue-100"
              @click="$router.push('/movimientos')"
            >
              Ver todos
            </button>
          </div>

          <div class="space-y-4">
            <div
              v-for="(movimiento, index) in movimientos"
              :key="index"
              class="flex min-w-0 items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3"
            >
              <div
                class="flex min-w-0 items-center gap-3"
              >
                <!-- Icono del movimiento -->
                <div
                  class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-lg font-bold sm:h-11 sm:w-11"
                  :class="
                    movimiento.tipo === 'ingreso'
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-rose-100 text-rose-700'
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
                class="shrink-0 text-sm font-black sm:text-base"
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

      <section
        class="mt-6 grid gap-4 sm:mt-8 sm:gap-6 xl:grid-cols-3  items-center"
      >
        <div
          class="min-w-0 rounded-[28px] bg-white p-5 shadow-sm ring-1 ring-slate-200 sm:p-6 xl:col-span-2"
        >
          <div
            class=" flex items-center justify-center gap-3"
          >
            <h3
              class="text-lg font-bold text-slate-900 sm:text-xl"
            >
              Reportes
            </h3>

            <button
              class="shrink-0 rounded-full bg-blue-50 px-3 py-1.5 text-sm font-semibold text-blue-700 transition hover:bg-blue-100"
              @click="$router.push('/reportes')"
            >
              Ver todos
            </button>
          </div>

          <div class="space-y-4">
            <!-- Contenido de los reportes -->
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

 
  </div>
</template>