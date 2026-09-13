
<template>
  <main class="relative min-h-screen overflow-hidden bg-slate-100 px-4 py-8 sm:px-6">
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.12),transparent_35%),radial-gradient(circle_at_bottom,_rgba(99,102,241,0.10),transparent_40%)]" />

    <section class="relative mx-auto flex w-full max-w-md items-center justify-center">
      <div class="w-full">
        <div class="mb-6 text-center">
          <div
            class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-[22px] bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white shadow-xl shadow-blue-900/20"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-8 w-8"
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

          <h1 class="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
            Capital <span class="text-blue-700">One</span> <span class="text-red-700">Bank</span>
          </h1>

          <p class="mt-2 text-sm text-slate-500">
            Accede a tu cuenta de forma segura
          </p>
        </div>

        <div class="rounded-[28px] bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">
          <form @submit.prevent="iniciarSesion" class="space-y-5">
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
                class="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                required
              />
            </div>

            <div>
              <div class="mb-2 flex items-center justify-between gap-3">
                <label
                  for="password"
                  class="block text-sm font-medium text-slate-700"
                >
                  Contraseña
                </label>

                <button
                  type="button"
                  class="text-sm font-medium text-blue-600 transition hover:text-blue-700"
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
                  class="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 pr-12 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                  required
                />

                <button
                  type="button"
                  class="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
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

            <div class="flex items-center gap-2 rounded-2xl bg-slate-50 px-3 py-2">
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

            <button
              type="submit"
              class="w-full rounded-2xl bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 px-4 py-3 font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:translate-y-[-1px] hover:shadow-xl active:scale-[0.99]"
            >
              Iniciar sesión
            </button>
          </form>

          <div class="mt-6 border-t border-slate-100 pt-6 text-center">
            <p class="text-sm text-slate-500">
              ¿Aún no tienes una cuenta?
              <button
                type="button"
                class="font-semibold text-blue-600 transition hover:text-blue-700"
                @click="$router.push('/registro')"
              >
                Regístrate
              </button>
            </p>
          </div>
        </div>

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

