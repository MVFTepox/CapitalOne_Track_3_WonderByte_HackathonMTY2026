<script setup>
import { onMounted, onUnmounted } from 'vue'
import { useAlertaSeguridad } from '@/composables/useAlertaSeguridad'

const {
  alertaVisible,
  respuesta,
  transaccion,
  iniciarPolling,
  detenerPolling,
  responder,
  cerrarAlerta
} = useAlertaSeguridad()

onMounted(() => {
  iniciarPolling(15000) // cada 15 segundos, ajusta según necesites
})

onUnmounted(() => {
  detenerPolling()
})
</script>

<template>
  <!-- Fondo de pantalla completa -->
  <div
    v-if="alertaVisible && transaccion"
    class="fixed inset-0 z-[99999] flex items-center justify-center overflow-y-auto bg-slate-950/80 p-4"
  >
    <!-- Contenedor de la alerta -->
    <div
      class="my-auto w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl"
    >
      <!-- Encabezado -->
      <div class="bg-blue-700 px-6 py-8 text-center text-white">
        <div
          class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white text-3xl"
        >
          🔒
        </div>

        <h1 class="text-2xl font-bold">
          Alerta de seguridad
        </h1>

        <p class="mt-2 text-sm text-blue-100">
          Detectamos una transacción sospechosa en tu cuenta.
        </p>
      </div>

      <!-- Contenido -->
      <div class="p-6">
        <!-- Pregunta inicial -->
        <div
          v-if="respuesta === null"
          class="space-y-5"
        >
          <div class="rounded-xl border border-amber-200 bg-amber-50 p-4">
            <p class="font-semibold text-amber-800">
              ¿Reconoces esta operación?
            </p>

            <p class="mt-1 text-sm text-amber-700">
              Confirma si realizaste esta compra.
            </p>
          </div>

          <!-- Detalles de la transacción -->
          <div class="rounded-2xl border border-slate-200 p-4">
            <div class="mb-4 flex items-center gap-3">
              <div
                class="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-2xl"
              >
                💳
              </div>

              <div>
                <p class="font-bold text-slate-900">
                  {{ transaccion.comercio }}
                </p>

                <p class="text-sm text-slate-500">
                  Pago con tarjeta
                </p>
              </div>
            </div>

            <div class="mb-5 text-center">
              <p class="text-sm text-slate-500">
                Importe de la transacción
              </p>

              <p class="mt-1 text-3xl font-bold text-slate-900">
                {{ transaccion.monto }}
              </p>
            </div>

            <div class="space-y-3 text-sm">
              <div class="flex justify-between gap-4">
                <span class="text-slate-500">
                  Fecha
                </span>

                <span class="text-right font-medium text-slate-800">
                  {{ transaccion.fecha }}
                </span>
              </div>

              <div class="flex justify-between gap-4">
                <span class="text-slate-500">
                  Tarjeta
                </span>

                <span class="font-medium text-slate-800">
                  {{ transaccion.tarjeta }}
                </span>
              </div>

              <div class="flex justify-between gap-4">
                <span class="text-slate-500">
                  Ubicación
                </span>

                <span class="text-right font-medium text-slate-800">
                  {{ transaccion.ubicacion }}
                </span>
              </div>

              <div class="flex justify-between gap-4">
                <span class="text-slate-500">
                  Dispositivo
                </span>

                <span class="text-right font-medium text-slate-800">
                  {{ transaccion.dispositivo }}
                </span>
              </div>
            </div>
          </div>

          <!-- Pregunta -->
          <h2 class="text-center text-lg font-bold text-slate-900">
            ¿Fuiste tú quien realizó esta transacción?
          </h2>

          <!-- Botones -->
          <div class="space-y-3">
            <button
              @click="responder(true)"
              class="w-full rounded-xl bg-emerald-600 px-4 py-3 font-semibold text-white transition hover:bg-emerald-700"
            >
              ✓ Sí, fui yo
            </button>

            <button
              @click="responder(false)"
              class="w-full rounded-xl border-2 border-rose-500 px-4 py-3 font-semibold text-rose-600 transition hover:bg-rose-50"
            >
              ✕ No fui yo
            </button>
          </div>

          <p class="text-center text-xs text-slate-400">
            Nunca compartas tu contraseña o código de seguridad.
          </p>
        </div>

        <!-- Respuesta afirmativa -->
        <div
          v-else-if="respuesta === true"
          class="py-6 text-center"
        >
          <div
            class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-3xl"
          >
            ✓
          </div>

          <h2 class="mt-4 text-2xl font-bold text-emerald-700">
            ¡Perfecto!
          </h2>

          <p class="mt-3 text-slate-600">
            Confirmaste que reconoces esta transacción.
            Tu cuenta continúa protegida.
          </p>

          <button
            @click="cerrarAlerta"
            class="mt-6 w-full rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Cerrar alerta
          </button>
        </div>

        <!-- Respuesta negativa -->
        <div
          v-else
          class="py-6 text-center"
        >
          <div
            class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-rose-100 text-3xl"
          >
            !
          </div>

          <h2 class="mt-4 text-2xl font-bold text-rose-700">
            Transacción Reportada
          </h2>

          <p class="mt-3 text-slate-600">
            Revisa tu cuenta y contacta al banco para recibir ayuda y si necesitas asistencia adicional.
          </p>

          <div
            class="mt-5 rounded-xl bg-rose-50 p-4 text-left text-sm text-rose-800"
          >
            <strong>Recomendación:</strong>
            Si fuera una operación real, el banco debería iniciar
            un proceso de investigación y aplicar medidas de protección
            según corresponda.
          </div>

          <button
            @click="cerrarAlerta"
            class="mt-6 w-full rounded-xl bg-slate-800 px-4 py-3 font-semibold text-white hover:bg-slate-900"
          >
            Cerrar alerta
          </button>
        </div>
      </div>
    </div>
  </div>
</template>