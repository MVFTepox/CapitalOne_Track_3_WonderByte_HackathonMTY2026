
<template>
  <main class="min-h-screen bg-slate-50 flex items-center justify-center px-4">

    <!-- Contenedor principal del login -->
    <section class="w-full max-w-md">

      <!-- Logo / nombre del banco -->
      <div class="text-center mb-8">
        <div
          class="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-7 w-7"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3 10h18M5 10v8m4-8v8m6-8v8m4-8v8M3 18h18M12 3l9 5H3l9-5z"
            />
          </svg>
        </div>

        <h1 class="text-2xl font-bold text-slate-900">
          Capital Sentinel
        </h1>

        <p class="mt-2 text-sm text-slate-500">
          Accede a tu cuenta de forma segura
        </p>
      </div>

      <!-- Tarjeta del formulario -->
      <div class="rounded-2xl bg-white p-6 shadow-xl shadow-slate-200/60 sm:p-8">

        <form @submit.prevent="iniciarSesion" class="space-y-5">

          <!-- Usuario / correo -->
          <div>
            <label
              for="usuario"
              class="mb-2 block text-sm font-medium text-slate-700"
            >
              Usuario o correo electrónico
            </label>

            <input
              id="usuario"
              v-model="usuario"
              type="text"
              placeholder="Ingresa tu usuario"
              autocomplete="username"
              class="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
              required
            />
          </div>

          <!-- Contraseña -->
          <div>
            <div class="mb-2 flex items-center justify-between">
              <label
                for="password"
                class="block text-sm font-medium text-slate-700"
              >
                Contraseña
              </label>

              <button
                type="button"
                class="text-sm font-medium text-blue-600 hover:text-blue-700"
                @click="recuperarPassword"
              >
                ¿La olvidaste?
              </button>
            </div>

            <div class="relative">
              <input
                id="password"
                v-model="password"
                :type="mostrarPassword ? 'text' : 'password'"
                placeholder="Ingresa tu contraseña"
                autocomplete="current-password"
                class="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 pr-12 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                required
              />

              <!-- Mostrar / ocultar contraseña -->
              <button
                type="button"
                class="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-slate-400 hover:text-slate-600"
                @click="mostrarPassword = !mostrarPassword"
                :aria-label="mostrarPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'"
              >
                <svg
                  v-if="!mostrarPassword"
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>

                <svg
                  v-else
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3 3l18 18M10.584 10.587a2 2 0 002.829 2.829M9.88 5.09A9.77 9.77 0 0112 5c4.477 0 8.268 2.943 9.542 7a9.76 9.76 0 01-4.043 5.105M6.228 6.228C4.473 7.44 3.18 9.197 2.458 12c1.274 4.057 5.065 7 9.542 7 1.31 0 2.56-.257 3.706-.723"
                  />
                </svg>
              </button>
            </div>
          </div>

          <!-- Recordarme -->
          <div class="flex items-center gap-2">
            <input
              id="recordar"
              v-model="recordar"
              type="checkbox"
              class="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
            />

            <label
              for="recordar"
              class="text-sm text-slate-600"
            >
              Recordar este dispositivo
            </label>
          </div>

          <!-- Botón iniciar sesión -->
          <button
            type="submit"
            class="w-full rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 active:scale-[0.99]"
          >
            Iniciar sesión
          </button>

        </form>

        <!-- Registro -->
        <div class="mt-6 border-t border-slate-100 pt-6 text-center">
          <p class="text-sm text-slate-500">
            ¿Aún no tienes una cuenta?
            <button
              type="button"
              class="font-semibold text-blue-600 hover:text-blue-700"
              @click="$router.push('/registro')"
            >
              Regístrate
            </button>
          </p>
        </div>
      </div>

      <!-- Indicador de seguridad -->
      <div class="mt-6 flex items-center justify-center gap-2 text-xs text-slate-400">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 15v2m-6 4h12a2 2 0 002-2v-7a2 2 0 00-2-2H6a2 2 0 00-2 2v7a2 2 0 002 2zm10-11V7a4 4 0 00-8 0v3h8z"
          />
        </svg>

        <span>Conexión segura y protegida</span>
      </div>

    </section>
  </main>
</template>

<script setup lang="ts">

import { useRouter } from "vue-router"
import { ref } from "vue";

// Datos del formulario
const usuario = ref("");
const password = ref("");

const router = useRouter();

// Controla si la contraseña se muestra como texto
const mostrarPassword = ref(false);

// Controla la opción "Recordar este dispositivo"
const recordar = ref(false);

// Aquí posteriormente puedes conectar tu API de autenticación
const iniciarSesion = () => {
  console.log("Usuario:", usuario.value);
  console.log("Contraseña:", password.value);
  console.log("Recordar:", recordar.value);
  router.push("/inicio"); // Redirige al inicio después de iniciar sesión

  // Ejemplo:
  // await authService.login(usuario.value, password.value);
};

// Acción para recuperar la contraseña
const recuperarPassword = () => {
  console.log("Recuperar contraseña");
};
</script>

