<script setup lang="ts">
  import { ref, computed } from "vue";

  // Tipo de movimiento que manejará la vista

  // Movimientos de ejemplo
  const movimientos = ref([
    {
      nombre: "Nómina",
      fecha: "Hoy, 10:30 AM",
      monto: 12500,
      tipo: "ingreso",
      categoria: "Ingreso",
    },
    {
      nombre: "Amazon",
      fecha: "Hoy, 09:15 AM",
      monto: 849.99,
      tipo: "egreso",
      categoria: "Compras",
    },
    {
      nombre: "Netflix",
      fecha: "Ayer, 08:00 PM",
      monto: 219,
      tipo: "egreso",
      categoria: "Suscripciones",
    },
    {
      nombre: "Transferencia recibida",
      fecha: "12 Sep, 03:45 PM",
      monto: 2500,
      tipo: "ingreso",
      categoria: "Transferencia",
    },
    {
      nombre: "Uber",
      fecha: "11 Sep, 07:20 PM",
      monto: 185.5,
      tipo: "egreso",
      categoria: "Transporte",
    },
    {
      nombre: "Spotify",
      fecha: "10 Sep, 12:00 PM",
      monto: 129,
      tipo: "egreso",
      categoria: "Suscripciones",
    },
  ]);

  // Filtro seleccionado
  const filtro = ref<"todos" | "ingreso" | "egreso">("todos");

  // Movimientos filtrados
  const movimientosFiltrados = computed(() => {
    if (filtro.value === "todos") {
      return movimientos.value;
    }

    return movimientos.value.filter(
      (movimiento) => movimiento.tipo === filtro.value,
    );
  });

  // Resumen financiero
  const resumen = computed(() => {
    const ingresos = movimientos.value
      .filter((movimiento) => movimiento.tipo === "ingreso")
      .reduce((total, movimiento) => total + movimiento.monto, 0);

    const egresos = movimientos.value
      .filter((movimiento) => movimiento.tipo === "egreso")
      .reduce((total, movimiento) => total + movimiento.monto, 0);

    const balance = ingresos - egresos;

    return [
      {
        label: "Ingresos",
        value: formatearMonto(ingresos),
        tono: "emerald",
      },
      {
        label: "Gastos",
        value: formatearMonto(egresos),
        tono: "rose",
      },
      {
        label: "Balance",
        value: formatearMonto(balance),
        tono: "blue",
      },
    ];
  });

  // Formatea el monto como moneda mexicana
  const formatearMonto = (monto: number) => {
    return new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
    }).format(monto);
  };
</script>

<template>
  <section class="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 p-4 sm:p-6 lg:p-8">
    <div class="mx-auto max-w-6xl">
      <!-- Encabezado -->
      <div
        class="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <h1 class="text-2xl font-black text-slate-900 sm:text-3xl">
            Movimientos
          </h1>

          <p class="mt-1 text-sm text-slate-500">
            Consulta todos los movimientos de tu cuenta.
          </p>
        </div>

        <!-- Botón regresar -->
        <button
          class="rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-100"
          @click="$router.back()"
        >
          ← Regresar
        </button>
      </div>

      <!-- Resumen -->
      <div class="mb-6 grid gap-4 md:grid-cols-3">
        <div
          v-for="(item, index) in resumen"
          :key="index"
          class="rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm"
        >
          <div class="flex items-center justify-between gap-3">
            <p class="text-sm text-slate-500">{{ item.label }}</p>

            <span
              class="flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold"
              :class="
                item.tono === 'emerald'
                  ? 'bg-emerald-100 text-emerald-700'
                  : item.tono === 'rose'
                    ? 'bg-rose-100 text-rose-700'
                    : 'bg-blue-100 text-blue-700'
              "
            >
              {{ item.tono === 'emerald' ? '↗' : item.tono === 'rose' ? '↘' : '◌' }}
            </span>
          </div>

          <p class="mt-4 text-2xl font-black text-slate-900">
            {{ item.value }}
          </p>
        </div>
      </div>

      <!-- Contenedor principal -->
      <div class="rounded-[28px] bg-white p-5 shadow-sm ring-1 ring-slate-200 sm:p-6">
        <!-- Título y filtros -->
        <div
          class="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"
        >
          <div>
            <h2 class="text-lg font-bold text-slate-900 sm:text-xl">
              Historial de movimientos
            </h2>

            <p class="mt-1 text-sm text-slate-400">
              Últimas operaciones realizadas
            </p>
          </div>

          <!-- Filtros -->
          <div class="flex rounded-xl bg-slate-100 p-1 ring-1 ring-slate-200">
            <button
              class="rounded-lg px-3 py-2 text-sm font-semibold transition"
              :class="
                filtro === 'todos'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-900'
              "
              @click="filtro = 'todos'"
            >
              Todos
            </button>

            <button
              class="rounded-lg px-3 py-2 text-sm font-semibold transition"
              :class="
                filtro === 'ingreso'
                  ? 'bg-white text-emerald-600 shadow-sm'
                  : 'text-slate-500 hover:text-slate-900'
              "
              @click="filtro = 'ingreso'"
            >
              Ingresos
            </button>

            <button
              class="rounded-lg px-3 py-2 text-sm font-semibold transition"
              :class="
                filtro === 'egreso'
                  ? 'bg-white text-rose-600 shadow-sm'
                  : 'text-slate-500 hover:text-slate-900'
              "
              @click="filtro = 'egreso'"
            >
              Gastos
            </button>
          </div>
        </div>

        <!-- Lista -->
        <div class="space-y-2">
          <div
            v-for="(movimiento, index) in movimientosFiltrados"
            :key="index"
            class="flex min-w-0 items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:bg-slate-100"
          >
            <!-- Información -->
            <div class="flex min-w-0 items-center gap-3">
              <!-- Icono -->
              <div
                class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-lg font-bold"
                :class="
                  movimiento.tipo === 'ingreso'
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'bg-rose-100 text-rose-700'
                "
              >
                {{ movimiento.tipo === "ingreso" ? "↓" : "↑" }}
              </div>

              <!-- Nombre y fecha -->
              <div class="min-w-0">
                <p
                  class="truncate text-sm font-semibold text-slate-800 sm:text-base"
                >
                  {{ movimiento.nombre }}
                </p>

                <p class="mt-0.5 text-xs text-slate-400 sm:text-sm">
                  {{ movimiento.fecha }}
                </p>

                <p class="mt-1 text-xs text-slate-400">
                  {{ movimiento.categoria }}
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
              {{ movimiento.tipo === "ingreso" ? "+" : "-" }}
              {{ formatearMonto(movimiento.monto) }}
            </p>
          </div>

          <!-- Sin movimientos -->
          <div
            v-if="movimientosFiltrados.length === 0"
            class="py-12 text-center"
          >
            <p class="text-sm font-medium text-slate-500">
              No hay movimientos para este filtro.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
