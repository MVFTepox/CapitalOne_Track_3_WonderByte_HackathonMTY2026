import { ref } from 'vue'

// Estado compartido — así App.vue no necesita pasar props
const alertaVisible = ref(false)
const respuesta = ref(null)
const transaccion = ref(null)
const transaccionId = ref(null)

let intervalId = null

async function verificarSenal() {
  try {
    const res = await fetch('/api/seguridad/transaccion-pendiente') // ajusta la URL
    if (!res.ok) return

    const data = await res.json()

    // Se espera algo como:
    // { pendiente: true, id: 123, comercio, monto, fecha, tarjeta, ubicacion, dispositivo }
    if (data.pendiente && !alertaVisible.value) {
      transaccionId.value = data.id
      transaccion.value = {
        comercio: data.comercio,
        monto: data.monto,
        fecha: data.fecha,
        tarjeta: data.tarjeta,
        ubicacion: data.ubicacion,
        dispositivo: data.dispositivo
      }
      respuesta.value = null
      alertaVisible.value = true
    }
  } catch (err) {
    console.error('Error al verificar señal de seguridad:', err)
  }
}

function iniciarPolling(intervaloMs = 15000) {
  if (intervalId) return
  verificarSenal()
  intervalId = setInterval(verificarSenal, intervaloMs)
}

function detenerPolling() {
  clearInterval(intervalId)
  intervalId = null
}

async function responder(valor) {
  respuesta.value = valor

  // Envía la respuesta del usuario de vuelta al backend
  try {
    await fetch(`/api/seguridad/transaccion/${transaccionId.value}/responder`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reconocida: valor })
    })
  } catch (err) {
    console.error('Error al enviar la respuesta:', err)
  }
}

function cerrarAlerta() {
  alertaVisible.value = false
}

export function useAlertaSeguridad() {
  return {
    alertaVisible,
    respuesta,
    transaccion,
    iniciarPolling,
    detenerPolling,
    responder,
    cerrarAlerta
  }
}